import { defineCollection, z } from 'astro:content';

const schema = z.object({
  title: z.string(),
  pubDate: z.date().optional().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  image: z
    .object({
      url: z.string(),
      alt: z.string()
    })
    .optional(),
  tags: z.array(z.string()).optional()
});
const postsCollection = defineCollection({
  type: 'content',
  schema
});
const blogCollection = defineCollection({
  type: 'content',
  schema
});

export const collections = {
  posts: postsCollection,
  blog: blogCollection
};
