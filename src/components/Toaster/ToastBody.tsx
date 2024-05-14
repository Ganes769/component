interface ToastBodyType {
  title: string;
  description?: string;
}
export default function ToastBody({ title, description }: ToastBodyType) {
  return (
    <>
      <h1 className="text-black  text-[18px]font-bold">{title}</h1>
      <p className="text-[14px]">{description}</p>
    </>
  );
}
