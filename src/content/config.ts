import { z, defineCollection } from "astro:content";

const articlesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        date: z.string(),
        category: z.string(),
        categoryColour: z.string(),
        feature: z.boolean(), // <-- new field
        imageURL: z.string(),
        link: z.string(),
    }),
});

export const collection = {
    articles: articlesCollection,
}