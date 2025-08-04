import React from "react";

function MessageSkeleton() {
  const skeletonMessages = Array(6).fill(null);
  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 my-2 ${
            idx % 2 === 0 ? "justify-end" : "justify-start"
          }`}
        >
          {idx % 2 !== 0 && ( // Other person's avatar
            <div className="flex-shrink-0">
              <div className="bg-gray-700 rounded-full size-10 animate-pulse"></div>
            </div>
          )}

          <div className="flex flex-col">
            <div className="mb-1 text-xs text-text-muted">
              <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="p-3 text-sm break-words shadow-md rounded-2xl">
              <div className="skeleton h-16 w-[200px] bg-gray-700 animate-pulse rounded-lg"></div>
            </div>
          </div>

          {idx % 2 === 0 && ( // Your avatar
            <div className="flex-shrink-0">
              <div className="bg-gray-700 rounded-full size-10 animate-pulse"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MessageSkeleton;
