import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinType, signupType } from "@umarkhan1999/medium-blog-types";
import { Hono } from "hono";
import { sign } from "hono/jwt";
const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

userRouter.post(`/signup`, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const validBody = signupType.safeParse(body);
  if (!validBody.success) {
    c.status(411);
    return c.json({ message: validBody.error });
  }
  const isUserPresent = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (isUserPresent) {
    c.status(400);
    return c.json({ msg: "User Already Exist" });
  }
  const user = await prisma.user.create({
    data: {
      password: body.password,
      email: body.email,
    },
  });
  const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY, "HS256");
  return c.json({ token });
});

userRouter.post(`/signin`, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const validBody = signinType.safeParse(body);
  if (!validBody.success) {
    c.status(411);
    return c.json({ message: validBody.error });
  }
  const user = await prisma.user.findUnique({
    where: { email: body.email, password: body.password },
  });
  if (!user) {
    c.status(403);
    return c.json({ msg: "Invalid Credentials" });
  }
  const token = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
  return c.json({ token });
});

export default userRouter;
