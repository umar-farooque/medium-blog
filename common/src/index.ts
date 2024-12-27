import z from "zod";

export const blogPostType = z.object({
  title: z.string(),
  content: z.string(),
});
export const updateBlogType = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export const signupType = z.object({
  email: z.string(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export const signinType = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export type SignupType = z.infer<typeof signupType>;
export type SigninType = z.infer<typeof signinType>;
export type BlogPostType = z.infer<typeof blogPostType>;
export type UpdatePostType = z.infer<typeof updateBlogType>;
