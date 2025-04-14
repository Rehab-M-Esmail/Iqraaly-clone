'use client';

const ForgotPasswordPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Forgot Your Password?</h2>
        
        {/* Forgot Password Form */}
        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Reset Password Button */}
          <button type="submit" className="w-full py-3 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition-all mt-4">
            Send Reset Instructions
          </button>
        </form>

        {/* Back to login link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Remembered your password?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
