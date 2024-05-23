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
  bodyStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  style: {
    height: "70px",
    width: "500px",
  },
};
