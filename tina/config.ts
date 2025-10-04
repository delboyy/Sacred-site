import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID || 'your-client-id',
  token: process.env.TINA_TOKEN || 'your-token',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'assets/images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            required: true,
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            required: true,
            options: [
              { value: 'wellness', label: 'Wellness' },
              { value: 'herbal-medicine', label: 'Herbal Medicine' },
              { value: 'nutrition', label: 'Nutrition' },
              { value: 'mindfulness', label: 'Mindfulness' },
              { value: 'adaptogens', label: 'Adaptogens' },
              { value: 'stress-relief', label: 'Stress Relief' },
              { value: 'beginners', label: 'Beginners' },
              { value: 'natural-health', label: 'Natural Health' },
            ],
          },
          {
            type: 'image',
            name: 'cover',
            label: 'Cover Image',
            required: true,
          },
          {
            type: 'number',
            name: 'readingTime',
            label: 'Reading Time (minutes)',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
});
