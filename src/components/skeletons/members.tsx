export default function MembersSkeleton() {
    return (
      <div className="py-4 w-full mx-auto">
          {Array(8)
            .fill(0)
            .map((item, index) => (
              <MembersSkeletonCards key={index} />
            ))}
      </div>
    );
  }
  
  function MembersSkeletonCards() {
      return (
        <div className="animate-pulse flex items-center gap-[10px] py-[20px] border-b">
          <div className='flex flex-[6] items-center cursor-pointer gap-[10px]'>
            <div className="w-[35px] h-[35px] rounded-full bg-[#EDF3FC]"></div>
            <div>
                <div className="h-[1.2rem] bg-[#EDF3FC] rounded-3xl w-[160px]"></div>
                <div className="h-[0.9rem] bg-[#EDF3FC] rounded-3xl w-[110px] mt-1"></div>
            </div>
          </div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[2]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[3]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[3]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[2]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[3]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[1]"></div>
        </div>
      );
    }