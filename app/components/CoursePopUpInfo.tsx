import React from "react";
import type { Course } from "@/types/courses.types";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { CheckIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";

export const CoursePopUpInfo: React.FC<{ currentItem: Course }> = ({
  currentItem,
}) => {
  // const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  // const [copyIndex, setCopyIndex] = React.useState<number>(0);

  const InformationBlock = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-0.5">
      <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
        {title}
      </p>
      <div className="text-zinc-600">{children}</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2 px-4 md:px-0 w-full">
      <section>
        <div className="flex flex-row gap-4 ">
          <InformationBlock title="Instructor">
            {currentItem?.instructor}
          </InformationBlock>

          <InformationBlock title="Category">
            {currentItem?.courseType}
          </InformationBlock>

          <InformationBlock title="Grades">
            <span className="flex flex-row gap-1">
              {currentItem?.grade?.map((grade) => (
                <span key={grade}>{grade}</span>
              ))}
              {!currentItem?.grade && "N/A"}
            </span>
          </InformationBlock>

          <InformationBlock title="Semester">
            {currentItem?.semester?.map((semester) => (
              <span key={semester}>{semester}</span>
            ))}
            {!currentItem?.semester && "N/A"}
          </InformationBlock>
        </div>
      </section>
      <section>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
            Course Prerequisites
          </p>
          {/*<div*/}
          {/*  className="cursor-pointer"*/}
          {/*  onClick={() => {*/}
          {/*    copyToClipboard(currentItem.preRequisite);*/}
          {/*    setCopyIndex(1);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {isCopied && copyIndex === 1 ? (*/}
          {/*    <CheckIcon />*/}
          {/*  ) : (*/}
          {/*    <ClipboardCopyIcon className="cursor-pointer" />*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
        <p className="text-zinc-600 mb-2 font-serif whitespace-pre-line">
          {currentItem?.preRequisite ? currentItem.preRequisite : "N/A"}
        </p>
      </section>
      <section>
        <div className="hidden md:flex flex-row gap-2 items-center">
          <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
            Course Description
          </p>
        </div>
        <p className="text-zinc-600 mb-8 font-serif whitespace-pre-line ">
          {currentItem?.description?.length > 200
            ? `${currentItem?.description?.substring(0, 200)}...`
            : currentItem?.description}
        </p>
      </section>
    </div>
  );
};
