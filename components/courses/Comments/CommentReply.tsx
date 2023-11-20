"use client";
import type { dalton_course_list_comments as Comment } from "@prisma/client";
import { useState } from "react";
import { replyComment } from "@/lib/actions";

export const Reply = ({ comment }: { comment: Comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const replyCommentWithId = replyComment.bind(null, comment.id, comment.course_id);
  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="text-xs text-gray-500 hover:text-gray-700"
      >
        回复
      </button>
      {isModalOpen && (
        <form action={replyCommentWithId}>
          <textarea
            className="rounded-md p-1 w-full h-24"
            name="comment"
            placeholder={`回复 ${comment.alias ? comment.alias : "匿名用户"}`}
          />
            <button className="text-sm text-center text-gray-500 hover:text-gray-700">
              发送
            </button>
        </form>
      )}
    </>
  );
};
