"use client";

import { TestProps } from "@/types/test";

interface InfoProps {
  item: TestProps;
}

export const Info: React.FC<InfoProps> = ({ item }) => {
  return (
    <div className="relative">
      <div key={item?.title} className="text-wrap">
        <p className="absolute right-0 text-xs text-gray-500">
          {item?.createdAt}
        </p>
        {/* タイトル */}
        <h3 className="font-bold">{item?.title}</h3>
        {/* 使用技術 */}
        <ul>
          <li className="text-sm pl-1 text-gray-500 truncate">
            {item?.category}
          </li>
        </ul>
      </div>
    </div>
  );
};
