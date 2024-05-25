import PropertyCardSkeleton from "./propertyCard";

export default function PropertyImageSkeleton() {
  return (
    <div className="py-4 w-full mx-auto">
        {Array(1)
          .fill(0)
          .map((item, index) => (
            <PropertyImage key={index} />
          ))}
    </div>
  );
}

function PropertyImage() {
    return (
      <div className="animate-pulse flex gap-[30px]">
        <div className="rounded bg-[#EDF3FC] h-[30rem] w-[60%] rounded-3xl"></div>
        <div className="w-[35%]">
            <div className="h-[14.5rem] bg-[#EDF3FC] rounded-3xl mb-[30px]"></div>
            <div className="h-[14.5rem] bg-[#EDF3FC] rounded-3xl"></div>
        </div>
      </div>
    );
  }