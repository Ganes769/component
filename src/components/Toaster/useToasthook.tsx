import { toast } from "react-toastify";
import { toastConfig } from "./toastConfig";

interface ToastBodys {
  title: string;
  description: string;
}

function ToastBody({ title, description }: ToastBodys) {
  return (
    <>
      <h1 className="text-black text-[18px] font-bold">{title}</h1>
      <p className="text-[14px]">{description}</p>
    </>
  );
}

const useToasthook = () => {
  const errorMsg = (title: string, description: string) => {
    toast.error(
      <ToastBody
        title={title || "Error"}
        description={description || "description"}
      />
    );
  };

  const successMsg = (title: string, description: string) => {
    toast.success(
      <ToastBody
        title={title || "Success"}
        description={description || "description"}
      />
    );
  };

  return { errorMsg, successMsg };
};

export default useToasthook;
