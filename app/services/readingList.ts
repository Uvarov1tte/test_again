import { db } from "@/db"
import { users, blogs, readingList } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const ifReadingListExisted = async (userId: number, blogId: number) => {
    const existed = await db.query.readingList.findFirst({
        where: (and(
            eq(readingList.userId, userId),
            eq(readingList.blogId, blogId)
        ))
    })

    if (existed) {
        return true
    } else {
        return false
    }
}

export const addToReadingList = async (userId: number, blogId: number) => {
    await db.insert(readingList).values({ userId, blogId })
}