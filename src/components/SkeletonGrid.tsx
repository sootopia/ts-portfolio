interface SkeletonGridProps {
  count?: number;
}

const SkeletonCard = () => {
  return (
    <div className="border border-[#dee2e6] rounded-[32px] bg-white overflow-hidden animate-pulse">
      <figure className="aspect-[4/3] bg-gray-300"></figure>
      <div className="p-8">
        <div className="w-full h-[14px] mb-5 rounded bg-gray-300"></div>
        <div className="w-5/6 h-8 mb-8 rounded bg-gray-300"></div>
        <div className="w-3/5 h-6 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

const SkeletonGrid = ({ count = 6 }: SkeletonGridProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 md:gap-y-12 lg:gap-x-8 lg:gap-y-16 mt-10 md:mt-12 lg:mt-16">
      {[...Array(count)].map((_, idx: number) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
};

export default SkeletonGrid;
