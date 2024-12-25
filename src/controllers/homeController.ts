import { Request, Response } from 'express';

export const getHomePage = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Welcome to the Home Page!' });
  } catch (error) {
    console.error('Error on Home Page:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
