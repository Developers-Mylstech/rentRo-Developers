import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://demo.rentro.ae/api/v1/', //
});

axiosInstance.defaults.headers.common['skip_zrok_interstitial'] = 'true';

export default axiosInstance;

