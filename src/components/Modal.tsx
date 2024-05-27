import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  className: string;
}

function Modal({ children, showModal, setShowModal, className }: Props) {
  return (
    <>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50  transition-opacity backdrop-sm ${
            showModal && "animate-fade"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={` ${className} shadow-lg rounded-md flex flex-col justify-center bg-white transform transition-transform duration-300 ${
              showModal && "animate-scaleIn"
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
