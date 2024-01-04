import React from "react";
import { prisma } from "@/lib/prisma";
import { clsx } from "clsx";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();

  const credential = cookieStore.get("dalton-moderation");
  const authenticate = async (formData: FormData) => {
    "use server";
    const password = formData.get("password");
    if (password === process.env.MODERATION_PASSWORD) {
      cookies().set("dalton-moderation", password, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    }
  };

  if (
    !cookieStore.has("dalton-moderation") ||
    credential?.value !== process.env.MODERATION_PASSWORD!
  ) {
    return (
      <div className="m-24">
        <form action={authenticate}>
          <input
            className="border border-black"
            placeholder="Credential Required"
            type="password"
            name="password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  const unreadOnly = searchParams?.unread === "true";
  let allComments;
  if (unreadOnly) {
    allComments = await prisma.dalton_course_list_comments.findMany({
      where: {
        removed: false,
      },
    });
  } else {
    allComments = await prisma.dalton_course_list_comments.findMany();
  }

  const removeComment = async (id: number, formData: FormData) => {
    "use server";
    await prisma.dalton_course_list_comments.update({
      where: {
        id: id,
      },
      data: {
        removed: true,
      },
    });
    revalidatePath("/moderation");
  };
  return (
    <div className="p-8">
      <h1 className="py-4 px-2 text-4xl font-medium font-serif">Moderation</h1>
      <div className="mt-8">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-zinc-500 my-1 font-medium text-sm uppercase">
              Comments
            </p>
            {!unreadOnly && (
                <Link href="/moderation?unread=true"><Button>Only Show Unread</Button></Link>
            )}
            <div className="flex flex-col gap-2">
              {allComments.map((comment) => (
                <div key={comment.id} className="flex flex-row gap-4">
                  <div className="flex flex-col gap-">
                    <p
                      className={clsx(
                        "text-zinc-600 font-serif",
                        comment.removed ? "line-through" : "",
                      )}
                    >
                      {comment.comment}
                    </p>
                  </div>
                  <form
                    action={removeComment.bind(null, comment.id)}
                    className="text-red-500 underline cursor-pointer"
                  >
                    <button type="submit">Remove</button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
