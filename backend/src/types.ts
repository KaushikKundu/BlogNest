// types.ts
import { HonoRequest } from 'hono';

export interface CustomRequest extends HonoRequest {
  userId?: string;
}
