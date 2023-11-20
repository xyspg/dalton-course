import type { dalton_course_list_comments as Comments } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redis } from "@/pages/api/incr";
import { Ratelimit } from "@upstash/ratelimit";
import { Reply } from "@/components/courses/Comments/CommentReply";

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
      <aside className="lg:ml-4 mb-12 flex flex-col gap-2 lg:m-4 rounded-md shadow-lg p-4 bg-neutral-100 min-h-[300px] w-full lg:w-1/3">
        {comments.map((comment: CommentWithReplies) => (
          <div
            key={comment.id}
            className="flex flex-col gap-1 bg-white shadow-sm p-2 rounded-md my-2"
          >
            <div className="flex flex-row gap-1">
              <p className="text-sm">{comment.alias}</p>
              <p className="text-sm text-neutral-700">
                {comment.timestamp.toLocaleString("zh")}
              </p>
            </div>
            <p className="text-lg ">{comment.comment}</p>

              {comment.replies && comment.replies.length > 0 && (
                  <div className="replies mt-2">
                      {comment.replies.map((reply) => (
                          <div key={reply.id} className="reply bg-gray-100 p-2 rounded-md mt-1">
                              <div className="flex flex-row gap-1">
                                  <p className="text-sm">{reply.alias}</p>
                                  <p className="text-sm text-neutral-700">
                                      {reply.timestamp.toLocaleString("zh")}
                                  </p>
                              </div>
                              <p className="text-md">{reply.comment}</p>
                          </div>
                      ))}
                  </div>
              )}


              <Reply comment={comment} />
          </div>
        ))}
        <CommentForm courseId={courseId} />
      </aside>
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
      limiter: Ratelimit.slidingWindow(5, "1 m"),
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
        <input
          className="rounded-md p-1 w-1/2"
          name="alias"
          type="text"
          placeholder="昵称（可选）"
        />
        <textarea
          className="rounded-md p-1 w-full h-24"
          name="comment"
          placeholder="发一条友善的评论..."
        />
        <button>发送</button>
      </form>
    </>
  );
};

export default commentBox;
