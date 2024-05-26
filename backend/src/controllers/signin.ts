import { Context } from "hono";
import {PrismaClient} from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export async function signin(c:Context) {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const body = await c.req.json();
    const user = await prisma.user.findFirst({
        where:{
            email:body.email
        }
    })
    if(!user){
        return c.json({
            message:"user not found"
        })
    }
    const jwt = await sign({id:body.id},c.env.JWT_SECRET)
   return c.json({jwt});
}