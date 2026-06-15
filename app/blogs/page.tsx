import Link from "next/link"
import { getBlogs } from "../services/blogs"
import { searchWithFilter } from "../actions/blogs"
import Button from "../components/Button"
import Input from "../components/Input"

const Blogs = async ({
    searchParams,
}: {
    searchParams: Promise<{ filter?: string }>
}) => {
    const { filter } = await searchParams
    const blogs = filter ? await getBlogs(filter) : await getBlogs()
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>
            <div className="mb-4">
                <form action={searchWithFilter}>
                    <Input
                        type="text"
                        name="filter"
                        className="me-4"
                        testId="filter-input"
                    />
                    <Button type="submit" testId="search-button">Search with filter</Button>
                </form>
            </div>
            <ul data-testid="blogs-list">
                {blogs.map(blog => (
                    <li key={blog.id} className="border rounded p-3 hover:bg-gray-50 hover:text-gray-900">
                        <p>
                            <Link
                                href={`/blogs/${blog.id}`}
                                className="hover:text-blue-500 hover:underline">
                                {blog.title}
                            </Link>
                            {" "}by {blog.author}
                        </p>
                        <Link href={blog.url}>Link to blog</Link>
                        <p>{blog.likes} likes</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Blogs