import { Request, Response } from 'express';

export const performAdminAction = (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Admin action performed' });
};
