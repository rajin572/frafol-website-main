// Same shape as WorkShopsCards: photo with price, title, description, when/where box, progress bar,
// author + button.
import React from "react";

const bar = "animate-pulse rounded bg-gray-200";

const WorkshopCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-color/10">
      <div className="aspect-[4/3] w-full animate-pulse bg-gray-200" />
      <div className="p-5">
        <div className={`h-6 w-3/4 ${bar}`} />
        <div className={`mt-3 h-4 w-full ${bar}`} />
        <div className={`mt-2 h-4 w-2/3 ${bar}`} />
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-gray-100 p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-4 w-4/5 ${bar}`} />
          ))}
        </div>
        <div className={`mt-4 h-4 w-40 ${bar}`} />
        <div className="mt-2 h-1.5 w-full animate-pulse rounded-full bg-gray-200" />
        <div className="mt-6 flex items-center justify-between border-t border-base-color/10 pt-4">
          <div className="flex items-center gap-2.5">
            <div className="size-9 animate-pulse rounded-full bg-gray-200" />
            <div className={`h-4 w-24 ${bar}`} />
          </div>
          <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default WorkshopCardSkeleton;
