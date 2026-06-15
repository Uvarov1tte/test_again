import { notFound, redirect } from "next/navigation"
import { getCurrentUser } from "@/app//services/session"
import Button from "../components/Button"
import { generateNewToken } from "../actions/users"
import UnreadList from "./UnreadList"
import ReadList from "./ReadList"

const MePage = async () => {
    const user = await getCurrentUser()
    if (!user) {
        redirect("/login")
    }
    const readFilter = user.reading_list.filter(reading => reading.read == true)
    const readBlogs = readFilter.map(item => ({ id: item.id, blogId: item.blogId, blogTitle: item.blog.title, read: item.read }))
    const unreadFilter = user.reading_list.filter(reading => reading.read == false)
    const unreadBlogs = unreadFilter.map(item => ({ id: item.id, blogId: item.blogId, userId: item.userId, blogTitle: item.blog.title, read: item.read }))

    console.log(unreadBlogs)

    return (
        <div className="max-w-2xl mx-auto p-6" data-testid="user-profile">
            <div>
                <h2 className="text-2xl font-bold mb-6">My profile</h2>
                <p className="my-2" data-testid="user-name">
                    <span className="font-bold">Name</span>: {user.name}
                </p>
                <p className="my-2 mb-6" data-testid="user-username">
                    <span className="font-bold">Username</span>: {user.username}
                </p>
            </div>
            <hr />
            <div data-testid="reading-list-section">
                <h2 className="text-2xl font-bold my-6">Reading list</h2>
                {unreadBlogs.length === 0 && readBlogs.length === 0 ?
                    <div data-testid="empty-reading-list">Empty reading list.</div>
                    : <>
                        <UnreadList readList={unreadBlogs} />
                        <ReadList readList={readBlogs} />
                    </>
                }
            </div>
            <hr />
            <div data-testid="api-token-section">
                <h2 className="text-2xl font-bold my-6">API Token</h2>
                <div className="border p-4 mx-auto">
                    {user.token ? (
                        <div data-testid="token-display">
                            <p>Current token:</p>
                            <div className="border p-2 my-2 border-gray-500" data-testid="api-token">{user.token}</div>
                        </div>
                    ) :
                        <p data-testid="no-token-message">No token has been generated yet.</p>
                    }
                </div>
            </div>

            <form action={generateNewToken}>
                <input type="hidden" name="id" value={user.id} />
                <Button type="submit" className="mt-6" testId="generate-token-button">Generate new token</Button>
            </form>
        </div>
    )
}


export default MePage