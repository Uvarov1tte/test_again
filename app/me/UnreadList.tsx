import Link from "next/link"
import { markAsRead } from "../actions/readingList";
import Button from "../components/Button";

interface readListProps {
    readList: { id: number; blogId: number; userId: number; blogTitle: string; read: boolean; }[]
}

const UnreadList = ({ readList }: readListProps) => {
    return (
        <div>
            <h3 className="text-xl font-bold my-6">Unread ({readList.length}) </h3>
            {
                readList.length === 0 ?
                    <div data-testid="no-unread-blogs">Reading list empty.</div> :
                    <ul className="mb-6" data-testid="unread-section">
                        {readList.map(item => (
                            <li key={item.id} className="border rounded p-3">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="w-4/5">
                                                <Link
                                                    href={`/blogs/${item.blogId}`}
                                                    className="hover:text-blue-500 hover:underline">
                                                    {item.blogTitle}
                                                </Link>
                                            </td>
                                            <td>
                                                <form action={markAsRead}>
                                                    <input type="hidden" name="userId" value={item.userId} />
                                                    <input type="hidden" name="blogId" value={item.blogId} />
                                                    <Button type="submit" testId="mark-read">Mark as read</Button>
                                                </form>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        ))}
                    </ul>
            }
        </div>
    )
}

export default UnreadList