import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    cover: z.string(),
    readingTime: z.number(),
  }),
});

export const collections = {
  blog,
};
