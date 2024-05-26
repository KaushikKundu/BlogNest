import { Context } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from "hono/adapter";
import { Jwt } from "hono/utils/jwt";

export async function signup(c:Context) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    try{
        const user = await prisma.user.create({
            data:{
                name:body.name,
                email:body.email,
                password:body.password,
            }
        });
        const jwt = await Jwt.sign({id: user.id}, c.env.JWT_SECRET)
        return c.json({
            message:"user created"
        })
    }catch(error)  {
        return c.json({
            message:"internal server error"
        })
    }

}