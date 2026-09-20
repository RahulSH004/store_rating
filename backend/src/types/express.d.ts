import { JwtPayload } from "./payload";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export {}; // ensures this file is treated as a module, required for global augmentation to work correctly