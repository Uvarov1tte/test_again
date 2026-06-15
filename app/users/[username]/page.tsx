import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "@/app/services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params
    const user = await getUserWithBlogs(username)

    if (!user) {
        notFound()
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
            <p className="italic text-gray-500">username: {user.username}</p>
            <h3 className="text-xl font-bold my-4">Blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id} className="border rounded p-3 hover:bg-gray-50 hover:text-gray-900">
                        <p><Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}</p>
                        <Link href={blog.url}>Link to blog</Link>
                        <p>Likes: {blog.likes}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserPage