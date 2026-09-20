import { JwtPayload } from "./payload";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}