import type { dalton_course_list_comments as Comments } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redis } from "@/pages/api/incr";
import { Ratelimit } from "@upstash/ratelimit";
import { Reply } from "@/components/courses/Comments/CommentReply";
import { Card } from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/courses/Comments/SubmitButton";

type CommentWithReplies = {
    id: number;
    course_id: string;
    alias: string | null;
    comment: string;
    timestamp: Date;
    reply_to: number | null;
    ip: string | null;
    ua: string | null;
    replies: CommentWithReplies[];
};

const commentBox = async ({ courseId }: { courseId: string }) => {
  const allComments = await prisma.dalton_course_list_comments.findMany({
    where: {
      course_id: courseId,
    },
  });
  const commentsWithReplies = new Map();

  allComments.forEach((comment) => {
    if (comment.reply_to === null) {
      commentsWithReplies.set(comment.id, { ...comment, replies: [] });
    } else {
      if (commentsWithReplies.has(comment.reply_to)) {
        commentsWithReplies.get(comment.reply_to).replies.push(comment);
      }
    }
  });

  const comments = Array.from(commentsWithReplies.values());

  return (
    <>
      <CommentItem comments={comments} courseId={courseId} />
    </>
  );
};

const CommentItem = ({
  comments,
  courseId,
}: {
  comments: CommentWithReplies[];
  courseId: string;
}) => {
  return (
    <>
      <Card className="lg:ml-4 mb-12 flex flex-col gap-2 lg:m-4 p-4 min-h-[300px] w-full lg:w-1/3">
        {comments.map((comment: CommentWithReplies) => (
          <Card
            key={comment.id}
            className="flex flex-col gap-1 p-2 my-2"
          >
            <div className="flex flex-row gap-1">
              <span className="text-xs ">{comment.alias}</span>
              <p className="text-xs text-neutral-700">
                {comment.timestamp.toLocaleString("zh")}
              </p>
            </div>
            <p className="text-lg ">{comment.comment}</p>

              {comment.replies && comment.replies.length > 0 && (
                  <div className="replies mt-2">
                      {comment.replies.map((reply) => (
                          <Card key={reply.id} className="reply bg-gray-100 p-2 rounded-md mt-1">
                              <div className="flex flex-row gap-1">
                                  <p className="text-xs text-neutral-700">
                                      {reply.timestamp.toLocaleString("zh")}
                                  </p>
                              </div>
                              <p className="text-md">{reply.comment}</p>
                          </Card>
                      ))}
                  </div>
              )}


              <Reply comment={comment} />
          </Card>
        ))}
        <CommentForm courseId={courseId} />
      </Card>
    </>
  );
};

const CommentForm = ({ courseId }: { courseId: string }) => {
  const submitComment = async (formData: FormData) => {
    "use server";
    const alias = formData.get("alias");
    const comment = formData.get("comment");
    const ip = headers().get("x-forwarded-for");
    const ua = headers().get("user-agent");
    if (!comment) return;
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
    });
    const { success } = await ratelimit.limit(`comment:${ip ?? ""}`);
    if (!success) {
      return;
    }
    await prisma.dalton_course_list_comments.create({
      data: {
        course_id: courseId,
        alias: alias ? alias.toString() : null,
        comment: comment.toString(),
        ip: ip,
        ua: ua,
      },
    });
    revalidatePath("/c/[courseId]", "page");
  };
  return (
    <>
      <form action={submitComment} className="flex flex-col gap-4 ">
        <Input
          className="rounded-md p-1 w-1/2"
          name="alias"
          type="text"
          placeholder="昵称（可选）"
        />
        <Textarea
          className="rounded-md p-1 w-full h-24 mb-1"
          name="comment"
          placeholder="发一条友善的评论..."
        />
        <SubmitButton>发送</SubmitButton>
      </form>
    </>
  );
};

export default commentBox;
