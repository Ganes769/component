type reportType = {
  title: string;
  id: string;
  detail: string;
};
interface Props {
  report: reportType[];
}
export default function ModalContent({ report }: Props) {
  return (
    <div className="h-full w-full p-4 flex flex-col items-start justify-start">
      <div className="mb-3">
        <h1 className="text-[16px] font-semibold">View Details</h1>
        <p className="text-[12px] text-[#798290]">
          Lorem Ipsum has been the industry's standard dummy.
        </p>
      </div>
      <div className="w-full grid grid-cols-2 gap-y-3">
        {report.map((item) => (
          <div key={item.id} className=" flex flex-col mr-6">
            <h1 className="text-[16px] font-semibold">{item.title}</h1>
            <p className="text-[12px] text-[#798290]"> {item.detail}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
