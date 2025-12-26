type ProductCardSkeletonProps = {
  size?: "small" | "medium";
};

export function ProductCardSkeleton({
  size = "medium",
}: ProductCardSkeletonProps) {
  const imageSize = size === "medium" ? 150 : 75;

  return (
    <div
      className={`rounded-xl border border-gray-200 p-4 animate-pulse
        ${size === "medium" ? "w-full" : "w-full"}`}
    >
      <div className="flex justify-between gap-4">
        {/* Text section */}
        <div className="flex flex-col gap-3 flex-1">
          {/* Title */}
          <div className="h-5 w-2/3 rounded bg-gray-200" />

          {/* Price */}
          <div className="h-4 w-1/3 rounded bg-gray-200" />

          {/* Buttons */}
          <div className="flex gap-2 mt-2">
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
          </div>
        </div>

        {/* Image */}
        <div
          className="rounded-lg bg-gray-200 shrink-0"
          style={{ width: imageSize, height: imageSize }}
        />
      </div>
    </div>
  );
}
