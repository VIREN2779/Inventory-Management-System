import Link from "next/link";
import React from "react";

type BreadCrumbItem = {
  title: string;
  url: string;
  active?: boolean; // optional flag for active state
};

interface BreadCrumbProps {
  lists?: BreadCrumbItem[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ lists = [] }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex space-x-2 text-sm text-gray-600">
        {lists.map((list, key) => (
          <li key={key} className="flex items-center">
            <Link
              href={list.url}
              className={`${
                list.active ? "text-blue-600 font-medium" : "hover:text-gray-800"
              }`}
            >
              {list.title}
            </Link>
            {key < lists.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;