import Button from "./Button";

interface Props {
  showModal: boolean;
  setshowModal: Function;
}

export default function SuccessModal({
  showModal,
  setshowModal,
  ...props
}: Props) {
  <section
    {...props}
    className="fixed w-1/2 h-[222px] left-0 right-0 top-0 z-10 overflow-auto justify-center bg-white shadow-lg bg-opacity-30 backdrop-blur-sm items-center rounded-md"
  >
    <div className="flex justify-end px-6 mt-6">
      <h1
        onClick={setshowModal(false)}
        className="text-black font-semibold cursor-pointer text-[18px]"
      >
        x
      </h1>
    </div>
    <div className="w-full flex flex-col items-center px-6 my-3">
      <h1 className="text-black font-bold text-[18px]">
        Changes request has been sent.
      </h1>
      <p className="text-black text-center px-10 ">
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s,
      </p>
      <div className="flex mt-3">
        <Button
          title="Go to Admin"
          hasIcon={true}
          iconPos="end"
          variant="primary"
        />
        <Button
          title="Re Upload"
          hasIcon={false}
          iconPos="end"
          variant="secondary"
        />
      </div>
    </div>
  </section>;
}
