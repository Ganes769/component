import {
  MutableRefObject,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import Button from "./Button";
import Icon from "./Icon";

interface Props {
  onAccept: () => void;
  onCancel: () => void;
}

const Modal = forwardRef<
  { show: (title: string, message: string) => void; cancel: () => void },
  Props
>(({ onAccept, onCancel }, ref) => {
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      show: (title: string, message: string) => {
        setShowModal(true);
        setTitle(title);
        setMessage(message);
      },
      cancel: () => {
        setShowModal(false);
      },
    }),
    []
  );

  return (
    <>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-[226px] w-10/12 shadow-lg rounded-md flex flex-col items-center justify-center bg-white"
          >
            <div className="w-full flex flex-col items-center justify-center px-6 my-3">
              <h1 className="text-black font-bold text-[18px]">{title}</h1>
              <p className="text-black text-center px-md">{message}</p>
              <div className="flex mt-3 w-full justify-center">
                <Button
                  onClick={onAccept}
                  title="Proceed to Next"
                  hasIcon={true}
                  icon={<Icon name="forWardRight" size={12} />}
                  iconPos="end"
                  variant="standard"
                />
                <Button
                  onClick={() => onCancel()}
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

export default Modal;
