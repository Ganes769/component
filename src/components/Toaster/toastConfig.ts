import { ToastOptions } from "react-toastify";

export const toastConfig: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  style: {
    width: "510px",
  },
  progressClassName: "bottom-0",
};
