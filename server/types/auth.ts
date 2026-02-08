// Request body types
export interface SigninRequest {
  mobileNumber: string;
}

export interface VerifyOTPRequest {
  mobileNumber: string;
  otp: string;
}

export interface SignupRequest {
  mobileNumber: string;
  firstName: string;
  lastName: string;
  vehicleNo: string;
  upiId?: string;
}

// User type matching database schema
export interface User {
  id: string;
  mobilenumber: string;
  firstname: string;
  lastname: string;
  vehiclenumber: string;
  upiid: string;
  created_at: string;
}

// Response types
export interface SigninResponse {
  success: boolean;
  message: string;
}

export interface VerifyOTPResponseUnregistered {
  success: boolean;
  isRegistered: false;
}

export interface VerifyOTPResponseRegistered {
  success: boolean;
  isRegistered: true;
  token: string;
  user: User;
}

export type VerifyOTPResponse =
  | VerifyOTPResponseUnregistered
  | VerifyOTPResponseRegistered;

export interface SignupResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ErrorResponse {
  success: false;
  error: string;
}
