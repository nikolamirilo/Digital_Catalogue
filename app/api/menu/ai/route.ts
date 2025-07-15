import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { RestaurantFormData } from '@/types';
import { currentUser } from '@clerk/nextjs/server';
import { layouts, themes } from '@/constants/client';
import schema from '@/utils/catalogue.schema.json';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY!, // Use environment variable instead of hardcoded key
    });

    // Get example restaurant data properly
    const { data: exampleRestaurant } = await supabase
      .from('restaurants')
      .select("*")
      .eq('name', 'plato')
      .single();

    const generationPrompt = `
      You are an expert in creating service offers (restaurant menus, beauty center service offer, etc.).
      Based on the following prompt, generate a complete service offer configuration in JSON format.
      The JSON object should strictly follow the RestaurantFormData type definition from the project.
      
      Prompt: "${prompt}"
      
      Schema: ${JSON.stringify(schema)}
      
      ${exampleRestaurant ? `Example/Expected structure: ${JSON.stringify(exampleRestaurant)}` : ''}

      For all images use placeholder: https://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original
      
      IMPORTANT REQUIREMENTS:
      1. Return ONLY the JSON object, no additional text, explanations, or formatting
      2. Start your response directly with { and end with }
      3. Service offer should be created in the language and alphabet of the prompt. If in Serbian, use Serbian Cyrillic and so on (for menu items, category names, for everything!!!).
      4. The menu field should be an ARRAY of categories, NOT an object
      5. Do NOT include id, created_at, updated_at, or created_by fields
      6. Each category should have: name, layout, items array
      7. Each item should have: name, description, price, image
      8. Add at least 3 categories with at least 5 items each
      9. Depending on the prompt use either dark or light theme. 
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: generationPrompt,
        },
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 4000,
      top_p: 1,
      stream: false,
    });

    const text = chatCompletion.choices[0]?.message?.content || '';
    
    let generatedData: RestaurantFormData;
    try {
      // Clean up the response to extract JSON
      let cleanedText = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      
      // Find the JSON object in the response
      const jsonStart = cleanedText.indexOf('{');
      const jsonEnd = cleanedText.lastIndexOf('}');
      
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('No JSON object found in response');
      }
      
      cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
      
      generatedData = JSON.parse(cleanedText);
      
      // Validate that menu is an array
      if (!Array.isArray(generatedData.menu)) {
        console.error('Menu is not an array:', generatedData.menu);
        return NextResponse.json({ error: 'Invalid menu structure generated' }, { status: 500 });
      }
      
    } catch (e) {
      console.error('Failed to parse generated JSON:', text);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Generate unique restaurant slug
    const baseSlug = generatedData.name.toLowerCase().replace(/\s+/g, '-');
    let restaurantSlug = baseSlug;
    let counter = 1;
    
    // Check if slug already exists and make it unique
    while (true) {
      const { data: existingRestaurant } = await supabase
        .from('restaurants')
        .select('name')
        .eq('name', restaurantSlug)
        .single();
      
      if (!existingRestaurant) break;
      
      restaurantSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Transform menu array to object structure expected by database
    const transformedMenu = generatedData.menu.reduce((acc, category) => {
      const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
      acc[categorySlug] = {
        layout: category.layout,
        items: category.items,
      };
      return acc;
    }, {} as Record<string, { layout: string; items: any[] }>);

    const { data, error } = await supabase
      .from('restaurants')
      .insert([
        {
          name: restaurantSlug,
          created_by: user.id,
          theme: generatedData.theme,
          logo: generatedData.logo,
          layout: generatedData.layout,
          title: generatedData.title,
          currency: generatedData.currency,
          legal_name: generatedData.legal_name,
          contact: generatedData.contact,
          subtitle: generatedData.subtitle,
          menu: transformedMenu,
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting data into Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ restaurantUrl: `/restaurants/${restaurantSlug}` });
  } catch (error) {
    console.error('Error generating menu:', error);
    
    // Handle specific Groq API errors
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json({ 
          error: 'Rate limit exceeded. Please try again in a moment.' 
        }, { status: 429 });
      }
      if (error.message.includes('401')) {
        return NextResponse.json({ 
          error: 'Invalid API key configuration.' 
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({ error: 'Failed to generate menu' }, { status: 500 });
  }
}