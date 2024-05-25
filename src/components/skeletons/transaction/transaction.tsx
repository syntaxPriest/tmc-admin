export default function TransactionSkeleton() {
  return (
    <div className="py-4 w-full mx-auto">
        {Array(2)
          .fill(0)
          .map((item, index) => (
            <TransactionSkeletonCards key={index} />
          ))}
    </div>
  );
}

function TransactionSkeletonCards() {
    return (
      <div className="animate-pulse flex gap-[15px] mt-[20px]">
        <div className="rounded bg-[#EDF3FC] h-[40px] w-[40px] rounded-3xl"></div>
        <div className="w-[90%]">
            <div className="flex justify-between mb-[10px]">
                <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[50%]"></div>
                <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[30%]"></div>
            </div>
            <div className="flex justify-between mb-[10px]">
                <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[20%]"></div>
                <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[20%]"></div>
            </div>
        </div>
      </div>
    );
  }