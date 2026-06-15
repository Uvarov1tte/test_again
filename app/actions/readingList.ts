"use server"

import { and, eq } from "drizzle-orm"
import { addToReadingList } from "../services/readingList"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { readingList } from "@/db/schema"

export const submitReadingList = async (formData: FormData) => {
    const userId = Number(formData.get("userId"))
    const blogId = Number(formData.get("blogId"))

    await addToReadingList(userId, blogId)
    revalidatePath(`/blogs/${blogId}`)
}

export const markAsRead = async (formData: FormData) => {
    const userId = Number(formData.get("userId"))
    const blogId = Number(formData.get("blogId"))
    const reading = await db.query.readingList.findFirst({
        where: (and(
            eq(readingList.userId, userId),
            eq(readingList.blogId, blogId)
        ))
    })
    if (reading) {
        await db
            .update(readingList)
            .set({ read: true })
            .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)))

        revalidatePath("/me")
    }
}