export default function EventsSkeleton() {
    return (
      <div className="py-4 w-full mx-auto">
          {Array(8)
            .fill(0)
            .map((item, index) => (
              <EventsSkeletonCards key={index} />
            ))}
      </div>
    );
  }
  
  function EventsSkeletonCards() {
      return (
        <div className="animate-pulse flex items-center gap-[10px] py-[20px] border-b">
          <div className='flex flex-[7] items-center cursor-pointer gap-[10px]'>
            <div className="w-[35px] h-[35px] rounded-[6px] bg-[#EDF3FC]"></div>
            <div>
                <div className="h-[1.2rem] bg-[#EDF3FC] rounded-3xl w-[160px]"></div>
            </div>
          </div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[3]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[3]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[5]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[2]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[1]"></div>
        </div>
      );
    }