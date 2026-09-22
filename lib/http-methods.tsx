"use client";
import axios, { AxiosError } from "axios";

// ---- TYPES ----
type ApiResponse<T = any> = {
  data: T;
  status: number;
};

type ApiError = {
  message: string;
  status?: number;
};

// ---- ERROR HANDLER ----
const extractError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<any>;
    return {
      message:
        err.response?.data?.message ||
        err.message ||
        "Something went wrong!",
      status: err.response?.status,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Something went wrong!" };
};

// ---- GET ----
export const GET = async <T = any>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.get(`/api${url}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw extractError(error);
  }
};

// ---- POST ----
export const POST = async <T = any>(
  url: string,
  body?: any,
  beforeUrl = "/api"
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.post(beforeUrl + url, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw extractError(error);
  }
};

// ---- PUT ----
export const PUT = async <T = any>(
  url: string,
  body?: any,
  beforeUrl = "/api"
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.put(beforeUrl + url, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw extractError(error);
  }
};

// ---- DELETE ----
export const DELETE = async <T = any>(
  url: string,
  beforeUrl = "/api"
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.delete(beforeUrl + url);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw extractError(error);
  }
};

// ---- PATCH ----
export const PATCH = async <T = any>(
  url: string,
  body?: any,
  beforeUrl = "/api"
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.patch(beforeUrl + url, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw extractError(error);
  }
};

// ---- POST FORM ----
export const POST_FORM = async <T = any>(
  url: string,
  body: FormData,
  beforeUrl = "/api"
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.postForm(beforeUrl + url, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw extractError(error);
  }
};

// ---- PUT FORM ----
export const PUT_FORM = async <T = any>(
  url: string,
  body: FormData,
  beforeUrl = "/api"
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.putForm(beforeUrl + url, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw extractError(error);
  }
};