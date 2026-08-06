/**
 * Centralized error handling utilities
 */

import { toast } from "sonner";

/**
 * Handles API errors consistently across the application
 * @param error - The error object from API calls
 * @param userMessage - Optional custom message to display to users
 */
export const handleApiError = (error: unknown, userMessage?: string): void => {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
  
  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('API Error:', errorMessage, error);
  }
  
  // Show user-friendly message
  toast.error(userMessage || 'Something went wrong. Please try again.');
};

/**
 * Safely parses JSON with error handling
 * @param jsonString - The JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback value
 */
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
};

/**
 * Type guard to check if an error is an Error instance
 * @param error - The value to check
 * @returns True if error is an Error instance
 */
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};
