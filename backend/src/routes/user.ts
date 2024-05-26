import { Hono } from "hono";
import { signup } from "../controllers/signup";
import { signin } from "../controllers/signin";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;

    }
}>();
userRouter.post("/user/signup", signup);
userRouter.post("/user/signin", signin);