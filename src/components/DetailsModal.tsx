import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

function DetailModal({ children, showModal, setShowModal }: Props) {
  console.log("modal visibility", showModal);
  return (
    <>
      {showModal && (
        <div
          onClick={() => {
            setShowModal(false);
            console.log(showModal);
          }}
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="shadow-lg rounded-md flex flex-col justify-center  bg-white"
          >
            <span
              onClick={() => setShowModal(false)}
              className="flex justify-end mx-3 my-[1px] "
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

export default DetailModal;
