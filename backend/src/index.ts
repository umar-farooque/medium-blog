import { Hono } from "hono";
import { cors } from "hono/cors";
import blogRouter from "./routes/blogRoutes";
import userRouter from "./routes/userRoutes";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();
app.use("/api/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
