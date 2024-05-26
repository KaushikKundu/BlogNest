import { Hono } from "hono";
import { verify } from "hono/jwt";
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables : {
    userId: any
  }
}>().basePath('/api/v1');

app.route('/blog',blogRouter);
app.route('/user',userRouter);

app.use('/blog*', async (c,next) => {
  const header = c.req.header('Authorization');
  if (!header) {
    return c.json({ error: 'unauthorized' }, 401);
  }

  const token = header.split(' ')[1];
  const decoded = await verify(token, c.env.JWT_SECRET);

  if (!decoded.success) {
    return c.json({ error: 'unauthorized' }, 401);
  }
  c.set('userId', decoded.id);
  await next();
});

export default app;
