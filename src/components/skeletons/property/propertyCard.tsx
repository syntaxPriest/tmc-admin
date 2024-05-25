export default function PropertyCardSkeleton() {
    return (
      <div className="animate-pulse flex flex-col gap-2 col-span-1">
        <div className="rounded bg-[#EDF3FC] h-[15rem] rounded-3xl aspect-[284/280]"></div>
        <div className="h-5 bg-[#EDF3FC] rounded"></div>
        <div className="h-3 w-[8rem] bg-[#EDF3FC] rounded"></div>
        <div className="h-3 w-[5rem] bg-[#EDF3FC] rounded"></div>
        <div className="flex">
            <div className="h-3 bg-[#EDF3FC] rounded flex-[1]"></div>
        </div>
      </div>
    );
  }