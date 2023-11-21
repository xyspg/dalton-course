"use client";
import type { dalton_course_list_comments as Comment } from "@prisma/client";
import { useState } from "react";
import { replyComment } from "@/lib/actions";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
//@ts-expect-error
import { useFormStatus } from "react-dom";

export const Reply = ({ comment }: { comment: Comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const replyCommentWithId = replyComment.bind(null, comment.id, comment.course_id);
  const { pending } = useFormStatus();

  return (
    <>
      <Button
          variant="ghost"
        onClick={() => {
          setIsModalOpen((prev) => !prev);
        }}
        className="text-xs text-gray-500 hover:text-gray-700"
      >
          {isModalOpen ? `收起` : `回复`}
      </Button>
      {isModalOpen && (
        <form action={replyCommentWithId}>
          <Textarea
            className="rounded-md p-1 w-full h-24 mb-2"
            name="comment"
            placeholder={`回复 ${comment.alias ? comment.alias : "匿名用户"}`}
          />
            <Button disabled={pending} variant="outline" className="text-sm">
              发送
            </Button>
        </form>
      )}
    </>
  );
};
