import { mockUsers, mockOtpData, generateOTP, simulateDelay } from './mockData';

// Commented out backend connection logic - will be implemented later
/*
const mainApiCaller = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<any> => {
  try {
    const url = endpoint.startsWith('/api') 
      ? endpoint 
      : `/api${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('auth');
    if (token) {
      headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    const options: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `Request failed with status ${response.status}`,
      }));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('API Error:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};
*/

// Mock API caller for development/testing purposes
const mainApiCaller = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
): Promise<any> => {
  // Simulate API delay
  await simulateDelay();

  try {
    // Login endpoint
    if (endpoint === '/api/login' && method === 'POST') {
      const { email, password } = data;
      const user = mockUsers.find(u => u.email === email && u.password == password);
      
      if (user) {
        // Generate OTP if two-factor is required
        if (user.twoFactorRequired) {
          const otp = generateOTP();
          mockOtpData[user.id] = otp;
          console.log(`Generated OTP for user ${user.id}: ${otp}`);
          
          return {
            userId: user.id,
            twoFactorRequired: true,
            message: 'OTP sent to your email'
          };
        } else {
          return {
            res: user,
            message: 'Login successful'
          };
        }
      } else {
        throw new Error('Invalid email or password');
      }
    }

    // Verify OTP endpoint
    if (endpoint === '/api/verify-otp' && method === 'POST') {
      const { userId, otp } = data;
      
      if (mockOtpData[userId] === otp) {
        delete mockOtpData[userId];
        const user = mockUsers.find(u => u.id === userId);
        
        return {
          res: user,
          message: 'OTP verified successfully'
        };
      } else {
        throw new Error('Invalid OTP');
      }
    }

    // Resend OTP endpoint
    if (endpoint === '/api/resend-otp' && method === 'POST') {
      const { userId } = data;
      const otp = generateOTP();
      mockOtpData[userId] = otp;
      console.log(`Resent OTP for user ${userId}: ${otp}`);
      
      return {
        message: 'OTP resent successfully'
      };
    }

    // Forgot password endpoint
    if (endpoint === '/api/forgot-password' && method === 'POST') {
      const { email } = data;
      const user = mockUsers.find(u => u.email === email);
      
      if (user) {
        const otp = generateOTP();
        mockOtpData[user.id] = otp;
        console.log(`Generated password reset OTP for user ${user.id}: ${otp}`);
        
        return {
          userId: user.id,
          message: 'OTP sent to your email for password reset'
        };
      } else {
        throw new Error('Email not found');
      }
    }

    // Verify forgot password OTP endpoint
    if (endpoint === '/api/verify-forgot-password-otp' && method === 'POST') {
      const { userId, otp } = data;
      
      if (mockOtpData[userId] === otp) {
        return {
          message: 'OTP verified successfully'
        };
      } else {
        throw new Error('Invalid OTP');
      }
    }

    // Resend forgot password OTP endpoint
    if (endpoint === '/api/resend-forgot-password-otp' && method === 'POST') {
      const { userId } = data;
      const otp = generateOTP();
      mockOtpData[userId] = otp;
      console.log(`Resent password reset OTP for user ${userId}: ${otp}`);
      
      return {
        message: 'OTP resent successfully'
      };
    }

    // Update password endpoint
    if (endpoint === '/api/update-password' && method === 'POST') {
      const { userId, newPassword } = data;
      const user = mockUsers.find(u => u.id === userId);
      
      if (user) {
        user.password = newPassword;
        delete mockOtpData[userId];
        
        return {
          message: 'Password updated successfully'
        };
      } else {
        throw new Error('User not found');
      }
    }

    // If endpoint not found
    throw new Error(`Endpoint not implemented: ${endpoint}`);

  } catch (error: any) {
    console.error('Mock API Error:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

export default mainApiCaller;