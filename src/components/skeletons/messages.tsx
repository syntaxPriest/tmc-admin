export default function MessagesSkeleton() {
    return (
      <div className="py-4 w-full mx-auto">
          {Array(8)
            .fill(0)
            .map((item, index) => (
              <MessagesSkeletonCards key={index} />
            ))}
      </div>
    );
  }
  
  function MessagesSkeletonCards() {
      return (
        <div className="animate-pulse flex items-center justify-between gap-[10px] py-[20px] border-b">
          <div className="w-[80%] flex flex-col gap-[10px]">
            <div className="flex gap-[10px] w-full">
                <div className="w-[40%] h-[1.4rem] bg-[#EDF3FC] rounded-3xl"></div>
                <div className="w-[10%] h-[1.4rem] bg-[#EDF3FC] rounded-3xl"></div>
                <div className="w-[7%] h-[1.4rem] bg-[#EDF3FC] rounded-3xl"></div>
            </div>
            <div className="w-[90%] h-[1.3rem] bg-[#EDF3FC] rounded-3xl"></div>
            <div className="flex items-center gap-[4px] w-full">
                <div className="w-[15%] h-[1.1rem] bg-[#EDF3FC] rounded-3xl"></div>
                <div className="w-[10px] h-[10px] bg-[#EDF3FC] rounded-3xl"></div>
                <div className="w-[15%] h-[1.1rem] bg-[#EDF3FC] rounded-3xl"></div>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[40px] h-[40px] bg-[#EDF3FC] rounded-full"></div>
            <div className="w-[40px] h-[40px] bg-[#EDF3FC] rounded-full"></div>
          </div>
          
        </div>
      );
  }