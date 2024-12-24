import { Request, Response } from 'express';

export const performAdminAction = (req: Request, res: Response): void => {
    res.status(200).json({ success: true, message: 'Admin action performed' });
};
