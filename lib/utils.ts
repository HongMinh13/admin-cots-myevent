import { config } from "@/src/config";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import {
	LOCAL_STORAGE_REFRESH_TOKEN_KEY,
	LOCAL_STORAGE_TOKEN_KEY,
	LOCAL_STORAGE_USER_ID,
} from './constant';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export const getFilmRoute = (id: string) => {
  return `film/${id}`
}

export async function uploadFile(file: File, onUploadSuccess?: (url: string) => void) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${config.restfulUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      onUploadSuccess?.(data.secure_url ?? data.url);
    } else {
      console.error("Error uploading file");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
export const getClientFilmDetailUrlById = (id: string) => {
  return `${config.clientDomain}/film/${id}`
}

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

interface ErrorResponse {
  statusCode: number;
  message: string[];
  messageCode: string;
}

export function formatErrorMsg(error: string): string {
  if (error.toString()?.includes("property")) {
    return "Please log in first!";
  }
  // Return a default message or throw an error if the error doesn't match the expected pattern
  return "An unexpected error occurred.";
}

export const getToken = () => {
	if (localStorage) {
		return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
	}
};

export const setToken = (accessToken: string) => {
	if (localStorage) {
		localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken);
	}
};

export const clearToken = () => {
	if (localStorage) {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
	}
};

export const getRefreshToken = () => {
	if (localStorage) {
		return localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
	}
};

export const setRefreshToken = (refreshToken: string) => {
	if (localStorage) {
		localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
	}
};
export const setUserId = (userId: string) => {
	if (localStorage) {
		localStorage.setItem(LOCAL_STORAGE_USER_ID, userId);
	}
};
export const getUserId = () => {
	if (localStorage) {
		return localStorage.getItem(LOCAL_STORAGE_USER_ID);
	}
};

export const clearRefreshToken = () => {
	if (localStorage) {
		localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
	}
};

export const clearLocalStorage = () => {
	localStorage.clear();
};

export enum Platform {
	Web = 'WEB',
}