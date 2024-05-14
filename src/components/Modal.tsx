import { forwardRef, useImperativeHandle, useState } from "react";
import Button from "./Buttons";

interface Props {
  title: string;
}

const Modal = forwardRef<any, Props>(({ title }, ref) => {
  const [showModal, setShowModal] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      cancel: () => {
        setShowModal(false);
      },
      show: () => {
        setShowModal(true);
      },
    }),
    []
  );

  return (
    <>
      {showModal && (
        <div className=" fixed w-1/2 h-[222px] left-0 right-0 top-0 z-10 overflow-auto justify-center bg-white shadow-lg bg-opacity-30 backdrop-blur-sm items-center rounded-md">
          <div className="flex justify-end px-6 mt-6">
            <h1
              onClick={() => setShowModal(false)}
              className="text-black font-semibold cursor-pointer text-[18px]"
            >
              x
            </h1>
          </div>
          <div className="w-full flex flex-col items-center px-6 my-3">
            <h1 className="text-black font-bold text-[18px]">{title}</h1>
            <p className="text-black text-center px-md ">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s,
            </p>
            <div className="flex mt-3 w-full justify-center">
              <Button
                color="green"
                title="Proceed to Next"
                hasIcon={true}
                iconPos="end"
                variant="standard"
              />
              <Button
                color="red"
                onClick={() => setShowModal(false)}
                title="Cancel"
                hasIcon={false}
                iconPos="end"
                variant="standard"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Modal;
