export default function TransactionsSkeleton() {
    return (
      <div className="py-4 w-full mx-auto">
          {Array(8)
            .fill(0)
            .map((item, index) => (
              <TransactionsSkeletonCards key={index} />
            ))}
      </div>
    );
  }
  
  function TransactionsSkeletonCards() {
      return (
        <div className="animate-pulse flex items-center gap-[10px] py-[20px] border-b">
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[4]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[3]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[6]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[3]"></div>
          <div className="h-[1.3rem] bg-[#EDF3FC] rounded-3xl flex-[3]"></div>
          <div className="h-[1.8rem] bg-[#EDF3FC] rounded-3xl flex-[3]"></div>
        </div>
      );
    }