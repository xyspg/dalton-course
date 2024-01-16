import React from "react";
import { clsx } from "clsx";
import Link from "next/link";

const ElpTable = ({ list }: { list: any }) => {
  return (
    <div className="flex justify-center items-center flex-col  p-0 md:p-8">
      <h1 className="text-2xl py-8 font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
        ELP Program List
      </h1>
      <div className="w-full md:max-w-2xl">
        {list.map((post: any) => (
          <>
            <li
              key={post._id}
              className="list-none relative rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <h3 className="text-sm font-medium leading-5 dark:text-white">
                {post.programNameZH}
              </h3>

              <ul className="mt-1 flex flex-wrap gap-x-1 text-xs font-normal leading-4 text-gray-500 dark:text-gray-100 ">
                <li>{post.category}</li>
                <li>&middot;</li>
                <li>{post.locationZH}</li>
                <li>&middot;</li>
                <li>{post.duration}</li>
                <li>天</li>
                <li>&middot;</li>
                <li>
                  {post.lowerCost === post.upperCost ? (
                    <>{post.lowerCost}¥</>
                  ) : (
                    <>
                      {post.lowerCost}
                      <span>-</span>
                      {post.upperCost}¥
                    </>
                  )}
                </li>

                {post.accommodation > 0 && (
                  <>
                    <li>&middot;</li>
                    <li>{post.accommodation}</li>
                    <li>天</li>
                  </>
                )}
              </ul>
              <Link
                href={`/elp/${post.slug.current}`}
                className={clsx(
                  "absolute inset-0 rounded-md",
                  "ring-slate-400 ",
                )}
              ></Link>
            </li>
            <hr className="mx-2 border-slate-200 dark:border-slate-700" />
          </>
        ))}
      </div>
    </div>
  );
};

export default ElpTable;
