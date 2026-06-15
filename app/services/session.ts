import { auth } from "@/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users, readingList, blogs } from "@/db/schema"

export const getCurrentUser = async () => {
    const session = await auth()
    if (!session?.user?.email) {
        return null
    }

    return db.query.users.findFirst({
        columns: {
            id: true,
            username: true,
            name: true,
            token: true
        },
        with: {
            reading_list: {
                with: {
                    blog: {
                        columns: {
                            title: true
                        },
                    },
                },
            },
        },
        where: eq(users.username, session.user.email),
    })
}