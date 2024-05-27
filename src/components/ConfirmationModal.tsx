import { forwardRef, useImperativeHandle, useState } from "react";
import Button from "./Button";

interface Props {
  onCancel: () => void;
  className: string;
  onAccept?: () => void;
}

const ConfirmationModal = forwardRef<
  {
    show: (title: string, message: string, refId: number) => void;
    cancel: () => void;
  },
  Props
>(({ onCancel, className, onAccept }, ref) => {
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [refId, setRefId] = useState<number>();
  const [showModal, setShowModal] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      show: (title: string, message: string, refId: number) => {
        setShowModal(true);
        setTitle(title);
        setMessage(message);
        setRefId(refId);
      },
      cancel: () => {
        setShowModal(false);
      },
    }),
    []
  );
  console.log(refId);
  return (
    <>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className={`fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 transition-opacity backdrop-blur-sm ${
            showModal && "animate-blur"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${className} shadow-lg rounded-md flex flex-col items-center justify-center bg-white transform transition-transform ${
              showModal && "animate-scaleIn"
            }`}
          >
            <div className="w-full flex flex-col items-center justify-center px-6 my-3">
              <h1 className="text-black font-bold text-[18px]">
                {title} {refId}
              </h1>
              <p className="text-black text-center px-md">
                {message} refid:{refId}
              </p>
              <div className="flex mt-3 w-full justify-center">
                <Button
                  onClick={onAccept}
                  title="Proceed to Next"
                  hasIcon={false}
                  iconPos="end"
                  variant="standard"
                />
                <Button
                  onClick={onCancel}
                  title="Cancel"
                  hasIcon={false}
                  iconPos="end"
                  variant="outline"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default ConfirmationModal;
