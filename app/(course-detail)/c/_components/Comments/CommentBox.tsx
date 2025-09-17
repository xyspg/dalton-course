import { prisma } from "@/lib/prisma";
import { CommentItem } from "@/app/(course-detail)/c/_components/Comments/CommentItem";

const CommentBox = async ({ courseId }: { courseId: string }) => {
  return null;
  const allComments = await prisma.dalton_course_list_comments.findMany({
    where: {
      course_id: courseId,
      removed: false
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

export default CommentBox;
