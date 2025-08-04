import { Users } from "lucide-react";
import React from "react";

function SideBarSkeleton() {
  const skeletonContacts = Array(8).fill(null);
  return (
    <aside className="flex flex-col w-20 h-full transition-all duration-200 border-r rounded-l-lg lg:w-72 bg-card-bg border-soft-teal/30">
      <div className="w-full p-5 border-b border-soft-teal/30">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-soft-teal" />
          <span className="hidden font-semibold text-text-primary lg:block">
            Contacts
          </span>
        </div>
      </div>
      <div className="flex-1 w-full py-3 overflow-y-auto">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="flex items-center w-full gap-3 p-3">
            <div className="relative mx-auto lg:mx-0">
              <div className="bg-gray-700 rounded-full animate-pulse size-12"></div>
            </div>
            <div className="flex-1 hidden min-w-0 text-left lg:block">
              <div className="w-32 h-4 mb-2 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-16 h-3 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SideBarSkeleton;
