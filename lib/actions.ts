"use server";
import {headers} from "next/headers";
import {revalidatePath} from "next/cache";
import {prisma} from "@/lib/prisma";
import {Ratelimit} from "@upstash/ratelimit";
import {redis} from "@/pages/api/incr";

export async function submitComment(courseId: string, formData: FormData){
    "use server";
    const alias = formData.get("alias");
    const comment = formData.get("comment");
    const ip = headers().get("x-forwarded-for");
    const ua = headers().get("user-agent");
    if (!comment) return;
    const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(1, "5 s"),
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
export async function replyComment(replyTo: number, courseId: string, formData: FormData) {
    const comment = formData.get("comment");
    const ip = headers().get("x-forwarded-for");
    const ua = headers().get("user-agent");
    console.log('-----reply----->', replyTo, courseId, comment)
    if (!comment) return;
    const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(1, "5 s"),
        analytics: true,
    });
    const { success } = await ratelimit.limit(`reply:${ip ?? ""}`);
    if (!success) {
        return;
    }
    await prisma.dalton_course_list_comments.create({
        data: {
            course_id: courseId,
            reply_to: replyTo,
            comment: comment.toString(),
            ip: ip,
            ua: ua,
        },
    });
    revalidatePath("/c/[courseId]", "page");
}