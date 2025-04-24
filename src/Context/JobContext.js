import { create } from "zustand";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";


const useJobStore = create((set, get) => ({
    jobs: [],
    loading: false,
    error: null,
    jobById: {},
    pdfPath: '',
    fetchJobs: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get('/job-posts')
            set({ jobs: res.data, error: null });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    getJobById: async (id) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(`job-posts/${id}`)
            set({ jobById: res.data, error: null });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    addJob: async (jobData) => {
        try {
            const response = await axios.post(API_URL, jobData);
            set((state) => ({
                jobs: [...state.jobs, response.data],
                error: null,
            }));
        } catch (error) {
            set({ error: error.message });
        }
    },
    ApplicantJobPost: async (jobData) => {
        try {
            const response = await axiosInstance.post("/job-applicants", jobData);
            set((state) => ({
                jobs: [...state.jobs, response.data],
                error: null,
            }));
            return response?.status
        } catch (error) {
            set({ error: error.message });
        }
    },

    updateJob: async (id, updatedData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData);

            console.log(response, '-00-==')

        } catch (error) {
            set({ error: error.message });
        }
    },

    updatePdf: async (formData) => {
        try {
            const response = await axiosInstance.post(`/files/upload-pdf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            set({ pdfPath: response?.data?.fileUrl, error: null });
            return response?.data?.fileUrl
        } catch (error) {
            console.error(error);
            set({ error: error.message });
        }
    },



    deleteJob: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            set((state) => ({
                jobs: state.jobs.filter((job) => job.id !== id),
                error: null,
            }));
        } catch (error) {
            set({ error: error.message });
        }
    },
}));

export default useJobStore;
