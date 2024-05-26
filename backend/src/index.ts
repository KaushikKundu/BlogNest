import { Hono } from 'hono'
import { signup } from './controllers/signup'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.post('/api/v1/user/signup', signup)
app.post('/api/v1/user/signin',signin)
app.post('/api/v1/blog', (c) => {
  return c.text('hello')
})
app.put('/api/v1/blog', (c) => {
  return c.text('hello')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('hello')
})
app.get('/api/v1/blog/bulk', (c) => {
  return c.text('hello')
})


export default app
