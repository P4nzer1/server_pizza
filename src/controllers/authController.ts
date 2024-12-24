import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Token from '../models/Token';
import { LoginRequestBody, RefreshTokenRequestBody, SendVerificationCodeRequestBody } from '../types/auth';


export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
): Promise<void> => {
  const { phone, verificationCode } = req.body;

  try {
    if (!phone || !verificationCode) {
      res.status(400).json({ message: 'Phone and verification code are required' });
      return;
    }

    if (verificationCode !== '1234') {
      res.status(401).json({ message: 'Invalid verification code' });
      return;
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({ phone, name: `User_${phone}` });
      await user.save();
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || '', {
      expiresIn: '7d',
    });

    const token = new Token({ userId: user._id, token: refreshToken });
    await token.save();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: 'strict',
    });

    res.json({ refreshToken, accessToken });
  } catch (error) {
    console.error('Ошибка при логине:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const sendVerificationCode = async (
  req: Request<{}, {}, SendVerificationCodeRequestBody>,
  res: Response
): Promise<void> => {
  const { phone } = req.body;

  try {
    if (!phone) {
      res.status(400).json({ message: 'Phone number is required' });
      return
    }

    const testCode = '1234';

    console.log(`Verification code sent to ${phone}: ${testCode}`);
    res.status(200).json({ message: `Verification code sent to ${phone}`, code: testCode });
    return
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ message: 'Failed to send verification code' });
    return
  }
};

export const logout = async (
  req: Request<{}, {}, RefreshTokenRequestBody>,
  res: Response
): Promise<void> => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return 
    }

    await Token.findOneAndDelete({ token: refreshToken });

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Successfully logged out' });
    return 
  } catch (error) {
    console.error('Ошибка при логауте:', error);
    res.status(500).json({ message: 'Server error' });
    return 
  }
};

export const refreshToken = async (
  req: Request<{}, {}, RefreshTokenRequestBody>,
  res: Response
): Promise<void> => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return 
    }

    const existingToken = await Token.findOne({ token: refreshToken });

    if (!existingToken) {
      res.status(403).json({ message: 'Invalid refresh token' });
      return 
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || '') as { id: string; role: string };

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(403).json({ message: 'User not found' });
      return 
    }

    const newAccessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || '', {
      expiresIn: '1h',
    });
    const newRefreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || '', {
      expiresIn: '7d',
    });

    existingToken.token = newRefreshToken;
    await existingToken.save();

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    return 

  } catch (error) {
    console.error('Ошибка при обновлении токена:', error);
    res.status(500).json({ message: 'Server error' });
    return 

  }
};


  