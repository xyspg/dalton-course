"use client";
import { Card } from "@/components/ui/card";
import { Reply } from "@/components/courses/Comments/CommentReply";
import { submitComment } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/courses/Comments/SubmitButton";
//@ts-expect-error
import { useOptimistic, useRef, startTransition } from "react";

type CommentWithReplies = {
  id: number;
  course_id: string;
  alias: string | null;
  comment: string;
  timestamp: Date;
  reply_to: number | null;
  ip: string | null;
  ua: string | null;
    removed: boolean;
  replies: CommentWithReplies[];
};

export const CommentItem = ({
  comments,
  courseId,
}: {
  comments: CommentWithReplies[];
  courseId: string;
}) => {

  /**
   * Implementing Optimistic update
   * useOptimistic hook takes in the current state and a updateFn
   * See https://react.dev/reference/react/useOptimistic
   */
  const [optimisticComments, addOptimisticComments] = useOptimistic<
    CommentWithReplies[]
  >(comments, (state: CommentWithReplies[], newComment: string) => {
    console.log("newComment--->", newComment)
    if (newComment === null) return state;
    return [
      ...state,
      {
        comment: newComment,
        timestamp: new Date(),
        id: crypto.randomUUID(),
      },
    ];
  });

  const submitCommentWithId = submitComment.bind(null, courseId);

  const formRef = useRef(null);

  if (process.env.NODE_ENV === "development") {
    console.log("optimistic--->", optimisticComments);
    console.log("comments--->", comments);
  }

  return (
    <>
      <Card className="mb-12 flex flex-col gap-2  p-4  w-full lg:w-1/2">
        {optimisticComments.map((comment: CommentWithReplies) => (
          <Card key={comment.id} className="flex flex-col gap-1 p-2 my-2">
            <div className="flex flex-row gap-1">
              <span className="text-xs ">{comment?.alias}</span>
              <p className="text-xs text-neutral-700">
                {comment?.timestamp.toLocaleString("zh", {
                  timeZone: "Asia/Shanghai",
                })}
              </p>
            </div>
            <p className="text-lg ">{comment?.comment}</p>

            {comment?.replies && comment.replies.length > 0 && (
              <div className="mt-2">
                {comment.replies.map((reply) => (
                  <Card
                    key={reply.id}
                    className="bg-gray-100 p-2 rounded-md mt-1"
                  >
                    <div className="flex flex-row gap-1">
                      <p className="text-xs text-neutral-700">
                        {reply.timestamp.toLocaleString("zh", {
                          timeZone: "Asia/Shanghai",
                        })}
                      </p>
                    </div>
                    <p className="text-md">{reply.comment}</p>
                  </Card>
                ))}
              </div>
            )}

            <Reply
              comment={comment}
              onReply={(reply: string, replyTo: number) => {
                addOptimisticComments(null, );
              }}
            />
          </Card>
        ))}

        <form
          action={async (formData: FormData) => {
            const comment = formData.get("comment");
            addOptimisticComments(comment);
            //@ts-ignore
            formRef.current.reset();
            await submitCommentWithId(formData);
          }}
          className="flex flex-col gap-4"
          ref={formRef}
        >
          <Input
            className="rounded-md p-1 w-1/2"
            name="alias"
            type="text"
            placeholder="Name"
          />
          <Textarea
            className="rounded-md p-1 w-full h-24 mb-1"
            name="comment"
            placeholder="Send a friendly message..."
            onKeyDown={async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if ((e.key === "Enter" && e.metaKey) || (e.key === "Enter" && e.shiftKey)) {
                e.preventDefault();
                //@ts-ignore
                const formData = new FormData(formRef.current);
                const comment = formData.get("comment");
                startTransition(() => {
                  addOptimisticComments(comment);
                  //@ts-ignore
                  formRef.current.reset();
                });
                await submitCommentWithId(formData);
              }
            }}
          />
          <SubmitButton>Send 🚀</SubmitButton>
        </form>
      </Card>
    </>
  );
};
