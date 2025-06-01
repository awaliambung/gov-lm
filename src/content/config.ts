import { z, defineCollection } from "astro:content";

const articlesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        id: z.number(),
        title: z.string(),
        description: z.string().nullable(),
        author: z.string(),
        date: z.string(),
        category: z.string(),
        categoryBGColor: z.string(), // background color class (American spelling)
        categoryTextColor: z.string(), // text color class (American spelling)
        feature: z.boolean(),
        imageURL: z.string(),
        link: z.string(),
    }),
});

export const collection = {
    articles: articlesCollection,
}