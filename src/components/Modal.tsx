import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  height?: string;
  width?: string;
}

function Modal({ children, showModal, setShowModal }: Props) {
  return (
    <>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-sm`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`shadow-lg rounded-md flex flex-col justify-center bg-white transform transition-transform duration-300 ${
              showModal && "animate-scaleIn"
            }`}
          >
            <span
              onClick={() => setShowModal(false)}
              className="flex justify-end mx-3 my-[1px]"
            >
              X
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
