// Middleware function for token verification
import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing",
    });
  }

  jwt.verify(token as string, "YOUR_SECRET", (err: any, decoded: any) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Attach decoded user information to the request object
    (req as any).user = decoded;
    next();
  });
}
export  {verifyToken};