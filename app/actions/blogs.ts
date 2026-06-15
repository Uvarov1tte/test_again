"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { addBlogs, addLike } from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (
    prevState: { errors: Object, values: Object, success: boolean },
    formData: FormData
) => {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }
    let errors = {}

    const title = formData.get("title") as string
    if (!title || title.length < 5) {
        errors = { ...errors, title: "Title must be at least 5 characters long" }
    }

    const author = formData.get("author") as string
    if (!author || author.length < 5) {
        errors = { ...errors, author: "Author must be at least 5 characters long" }
    }

    const url = formData.get("url") as string
    if (!url || url.length < 5) {
        errors = { ...errors, url: "URL must be at least 5 characters long" }
    }

    if (Object.keys(errors).length > 0) {
        return { errors, values: { title, author, url }, success: false }
    }

    await addBlogs(title, author, url)

    revalidatePath("/blogs")
    return { errors: {}, values: {}, success: true }
}

export const addLikeToBlog = async (formData: FormData) => {
    const id = Number(formData.get("id"))
    await addLike(id)
    revalidatePath(`/blogs/${id}`)
    revalidatePath("/blogs")
}

export const searchWithFilter = async (formData: FormData) => {
    const filter = formData.get("filter") as string
    redirect(`/blogs?filter=${filter}`)
}