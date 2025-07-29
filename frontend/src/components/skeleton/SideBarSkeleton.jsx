import { Users } from "lucide-react";
import React from "react";

function SideBarSkeleton() {
  const skeletonContects = Array(8).fill(null);
  return (
    <aside className="flex flex-col w-20 h-full transition-all duration-200 border-r lg:w-72 border-base-300">
      <div className="w-full p-5 border-b border-base-300">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="hidden font-medium lg:block">Contacts</span>
        </div>
      </div>
      <div className="w-full py-3 overflow-y-auto ">
        {skeletonContects.map((_, idx) => {
          <div key={idx} className="flex items-center w-full gap-3 p-3">
            <div className="relative mx-auto lg:mx-0">
              <div className="rounded-full skeleton size-12"></div>
            </div>
            <div className="flex-1 hidden min-w-0 text-left lg:block">
              <div className="w-32 h-4 mb-2 skeleton"></div>
              <div className="w-16 h-3 skeleton"></div>
            </div>
          </div>;
        })}
      </div>
    </aside>
  );
}

export default SideBarSkeleton;
