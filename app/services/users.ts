import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getUsers = async () => {
    return db.query.users.findMany()
}

export const getUserWithBlogs = async (username: string) => {
    return db.query.users.findFirst({
        columns: {
            id: true,
            username: true,
            name: true
        },
        where: eq(users.username, username),
        with: { blogs: true, reading_list: true },
    })
}

export const getUserById = async (id: number) => {
    return db.query.users.findFirst({
        where: eq(users.id, id),
    })
}

export const getUserByToken = async (token: string) => {
    return db.query.users.findFirst({
        columns: {
            id: true,
            username: true,
            name: true,
            token: true
        },
        where: eq(users.token, token),
        with: { blogs: true },
    })
}