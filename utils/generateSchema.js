const fs = require('fs');
const path = require('path');

// Constants from your app
const { layouts, themes } = require('../constants/client.js');


const layoutData = layouts.map(l => ({
  const: l.key,
  description: l.description
}));

const themeData = themes.map(t => ({
  const: t.key,
  description: t.description
}));

// JSON Schema definition
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Quicktalog Schema",
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    created_by: { type: "string" },
    theme: {
      type: "string",
      oneOf: themeData
    },
    logo: { type: "string", format: "uri" },
    layout: {
      type: "string",
      oneOf: layoutData
    },
    title: { type: "string" },
    currency: { type: "string" },
    legal: {
      type: "object",
      properties: {
        name: { type: "string" },
        terms_and_conditions: { type: "string" },
        privacy_policy: { type: "string" }
      },
      required: ["name"]
    },
    contact: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["email", "phone", "instagram", "tiktok", "website", "facebook", "twitter"] },
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
            layout: {
              type: "string",
              oneOf: layoutData
            },
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
    configuration: {
      type: "object",
      properties: {
        emailButtonNavbar: { type: "boolean" },
        ctaNavbar: {
          type: "object",
          properties: {
            label: { type: "string" },
            url: { type: "string" }
          },
          required: ["label", "url"]
        },
        ctaFooter: {
          type: "object",
          properties: {
            label: { type: "string" },
            url: { type: "string" }
          },
          required: ["label", "url"]
        },
        newsletter: {
          type: "object",
          properties: {
            enabled: { type: "boolean" },
            url: { type: "string" }
          },
          required: ["enabled", "url"]
        }
      }
    },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" }
  },
  required: [
    "id", "name", "created_by", "theme", "logo", "layout", "title",
    "currency", "legal", "contact", "subtitle", "services",
    "created_at", "updated_at"
  ],
  additionalProperties: false
};

// Write schema to file
const outputPath = path.join(__dirname, 'catalogue.schema.json');
fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2));

console.log('✅ JSON Schema generated at:', outputPath);
