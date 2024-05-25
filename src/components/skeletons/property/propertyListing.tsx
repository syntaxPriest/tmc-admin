import classNames from "classnames";
import PropertyCardSkeleton from "./propertyCard";

export default function PropertiesSkeleton({col} : {col?: string}) {
  return (
    <div className="py-4 w-full mx-auto">
      <div className={classNames(`grid grid-cols-3 gap-[48px]`, col && 'grid-cols-2')}>
        {Array(9)
          .fill(0)
          .map((item, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}
