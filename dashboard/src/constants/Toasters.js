import { toast } from "react-toastify";
export const warning = (warning) => toast.warn(warning);
export const errors = (error) => toast.error(error);
export const successes = (success) => toast.success(success);
export const info = (info) => toast.info(info);
