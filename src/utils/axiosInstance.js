
// import axios from 'axios';
// import useAuthStore from "../Context/AuthContext"

// // Use Vite environment variable




// // Use Vite environment variable
// const baseURL = import.meta.env.VITE_API_BASE_URL;

// const axiosInstance = axios.create({
//     baseURL,
// });

// axiosInstance.defaults.headers.common['skip_zrok_interstitial'] = 'true';


// axiosInstance.interceptors.request.use(
//     (config) => {
//         const accessToken = localStorage.getItem('access');
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         // Log any request error
//         console.error("Request error: ", error);
//         return Promise.reject(error);
//     }
// );


// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 || 403 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             const refreshToken = localStorage.getItem('refreshNew');
//             if (refreshToken) {
//                 try {
//                     const accessToken = localStorage.getItem('access');
//                     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//                     const { getRefreshToken } = useAuthStore.getState();
//                     const { data } = await axios.post(`${getRefreshToken}`, { refreshToken: refreshToken })
//                     console.log(data,'ooppp')
//                     const  access  = data?.jwtToken;
//                     localStorage.setItem('access', access);
//                     originalRequest.headers.Authorization = `Bearer ${access}`;
//                     return api(originalRequest);
//                 } catch (refreshError) {
//                     console.error("Error refreshing token:", refreshError);
//                     localStorage.removeItem('access');
//                     localStorage.removeItem('refreshNew');
//                     // window.location.pathname = '/';
//                 }
//             } else {
//                 console.error("No refresh token available. Redirecting to login.");
//                 // window.location.pathname = '/login';
//             }
//         }

//         // Reject any other errors or 401 errors after retrying
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;



import axios from 'axios';
import useAuthStore from "../Context/AuthContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.defaults.headers.common['skip_zrok_interstitial'] = 'true';

// Attach access token to each request
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error: ", error);
        return Promise.reject(error);
    }
);

// Handle token refresh on 401/403 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshNew');
            if (refreshToken) {
                try {
                    const { getRefreshToken } = useAuthStore.getState(); // Assuming this returns URL string
                    const data  = await axiosInstance.post(`${getRefreshToken}`, { refreshToken });

                    const access = data?.jwtToken; // Ensure your backend sends { jwtToken: '...' }
                    if (access) {
                        localStorage.setItem('access', access);
                        originalRequest.headers.Authorization = `Bearer ${access}`;
                        return axiosInstance(originalRequest);
                    } else {
                        console.error("Access token missing in refresh response.");
                        throw new Error("Invalid refresh response");
                    }
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                    localStorage.removeItem('access');
                    localStorage.removeItem('refreshNew');
                    // Optionally redirect user to login
                    // window.location.pathname = '/login';
                }
            } else {
                console.error("No refresh token available.");
                // window.location.pathname = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

