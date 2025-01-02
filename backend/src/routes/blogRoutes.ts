import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogPostType, updateBlogType } from "@umarkhan1999/medium-blog-types";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authToken = c.req.header("Authorization")?.split(" ")[1];
  if (!authToken) {
    c.status(403);
    return c.json({ message: "You're not authorised to access this route" });
  }
  try {
    const decodedUser = await verify(authToken, c.env.JWT_SECRET_KEY);

    const user = await prisma.user.findUnique({
      where: { id: decodedUser.id },
    });
    if (!user) {
      c.status(403);
      return c.json({ message: "Invalid Token" });
    }
    c.set("userId", decodedUser.id);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ message: "Invalid Token" });
  }
});

blogRouter.get(`/`, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return c.json({ blogs });
});
blogRouter.get(`/:id`, async (c) => {
  const blogId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findFirst({
      where: { id: blogId },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ ...blog });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Blog not found" });
  }
});
blogRouter.post(`/`, async (c) => {
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const validateBody = blogPostType.safeParse(body);
  if (!validateBody.success) {
    c.status(411);
    return c.json({ message: validateBody.error.message });
  }
  try {
    const { title, content } = body;
    const newBlog = await prisma.post.create({
      data: { title, content, authorId: authorId },
    });

    return c.json({ message: "Successfully created blog", blog: newBlog });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ message: "An error occurred while creating the blog" });
  }
});
blogRouter.put(`/:id`, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogId = c.req.param("id");
  const body = await c.req.json();

  const validateBody = updateBlogType.safeParse(body);
  if (!validateBody.success) {
    c.status(411);
    return c.json({ message: validateBody.error.message });
  }
  try {
    const updatedBlog = await prisma.post.update({
      where: { id: blogId },
      data: { ...body },
    });
    return c.json({ message: "Successfully updated blog", blog: updatedBlog });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Blog not found" });
  }
});

export default blogRouter;
