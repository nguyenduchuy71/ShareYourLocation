import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import apiClient from "./instanceAPI"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleLogout = () => {
  apiClient.post('/logout')
  window.location.href = '/login'
}
