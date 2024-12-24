export interface LoginRequestBody {
    phone: string;
    verificationCode: string;
}
  
export interface RefreshTokenRequestBody {
    refreshToken: string;
}
  
export interface SendVerificationCodeRequestBody {
    phone: string;
}
