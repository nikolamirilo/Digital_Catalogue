const fs = require('fs');
const path = require('path');

// Layouts and themes (only keys are used)
const layouts = [
  { key: "variant_1", label: "Layout 1" },
  { key: "variant_2", label: "Layout 2" },
  { key: "variant_3", label: "Layout 3" },
  { key: "variant_4", label: "Layout 4" },
];

const themes = [
  { key: "theme-elegant", label: "Elegant" },
  { key: "theme-luxury", label: "Luxury" },
  { key: "theme-modern", label: "Modern" },
  { key: "theme-organic", label: "Organic" },
  { key: "theme-creative", label: "Creative" },
];

const layoutKeys = layouts.map(l => l.key);
const themeKeys = themes.map(t => t.key);

const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Digital Catalogue Schema",
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    created_by: { type: "string" },
    theme: { type: "string", enum: themeKeys },
    logo: { type: "string", format: "uri" },
    layout: { type: "string", enum: layoutKeys },
    title: { type: "string" },
    currency: { type: "string" },
    legal_name: { type: "string" },
    contact: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["email", "phone"] },
          value: { type: "string" }
        },
        required: ["type", "value"]
      }
    },
    subtitle: { type: "string" },
    services: {
      type: "object",
      patternProperties: {
        "^.*$": {
          type: "object",
          properties: {
            layout: { type: "string", enum: layoutKeys },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  image: { type: "string", format: "uri" },
                  price: { type: "number" },
                  description: { type: "string" }
                },
                required: ["name", "image", "price", "description"]
              }
            }
          },
          required: ["layout", "items"]
        }
      },
      additionalProperties: false
    },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" }
  },
  required: [
    "id", "name", "created_by", "theme", "logo", "layout", "title",
    "currency", "legal_name", "contact", "subtitle", "menu",
    "created_at", "updated_at"
  ],
  additionalProperties: false
};

const outputPath = path.join(__dirname, 'catalogue.schema.json');
fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2));

console.log('✅ JSON Schema generated at:', outputPath);
