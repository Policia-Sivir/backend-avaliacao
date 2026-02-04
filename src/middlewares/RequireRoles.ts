import {Request, Response, NextFunction} from "express";

export function requireAdmin(req: Request,
                             res: Response,
                             next: NextFunction) 
{
    const userRole = req.headers['x-user-role'];

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    return next();
}