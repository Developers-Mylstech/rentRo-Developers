import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log({ email, password, rememberMe });
  };

  return (
    <div
      className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
      style={{
        backgroundImage: "url(https://readymadeui.com/background-image.webp)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-md w-full mx-auto">
        <form
          className="bg-opacity-70 bg-white rounded p-6 shadow-[0_2px_16px_-3px_rgba(125,126,131,0.3)]"
          onSubmit={handleSubmit}
        >
          <div className="mb-12">
            <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
          </div>

          {/* Email Input */}
          <div>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                required
                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 pl-2 pr-8 py-3 outline-none placeholder:text-gray-800"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#333"
                stroke="#333"
                className="w-[18px] h-[18px] absolute right-2"
                viewBox="0 0 682.667 682.667"
              >
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                  </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="40"
                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div className="mt-6">
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 pl-2 pr-8 py-3 outline-none placeholder:text-gray-800"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#333"
                stroke="#333"
                className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                viewBox="0 0 128 128"
              >
                <path
                  d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 border-gray-300 rounded"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                Remember me
              </label>
            </div>
            <div>
              <a href="javascript:void(0);" className="text-blue-600 text-sm font-semibold hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
            >
              Sign in
            </button>
            <p className="text-gray-800 text-sm text-center mt-6">
              Don't have an account{" "}
              <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                Register here
              </a>
            </p>
          </div>

          <hr className="my-6 border-gray-400" />

          {/* Social Login Buttons */}
          <div className="space-x-8 flex justify-center">
            <button type="button" className="border-none outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                <path
                  fill="#fbbd00"
                  d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                />
                <path
                  fill="#0f9d58"
                  d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                />
                <path
                  fill="#31aa52"
                  d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                />
                <path
                  fill="#3c79e6"
                  d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.627 135.627 0 0 1-11.88-11.226z"
                />
              </svg>
            </button>
            <button type="button" className="border-none outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                <path
                  fill="#4267b2"
                  d="M100 100h313.206a16.23 16.23 0 0 1 16.338 16.287c.054 22.516-.057 179.582-.034 201.651a129.098 129.098 0 0 1-19.477 6.525c-7.41-15.275-18.89-25.765-36.529-31.261-22.774-6.822-47.801-5.868-69.453 3.566-16.073 5.462-28.036 13.88-36.679 27.307-14.178 23.742-22.269 52.697-26.624 82.537a226.43 226.43 0 0 1-6.215 30.252c-6.935 16.09 7.522 35.7 24.843 31.657 8.876-2.667 14.503-10.655 18.279-18.325-3.24 7.276 16.58-39.036 10.484-49.573-8.49 4.904-13.29 9.469-17.283 15.322-2.51-10.795 0.255-22.198-6.692-31.725-5.684-7.084-14.771-5.444-22.035-6.625z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
