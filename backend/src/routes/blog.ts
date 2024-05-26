import { Hono } from "hono";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;

    }
}>();
blogRouter.post('/', async (c) => {
    
})
blogRouter.get('/', async (c) => {
    
})
blogRouter.put('/bulk', async (c) => {
    
})
blogRouter.get('/:id', async (c) => {
    
})