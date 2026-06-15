import Link from "next/link"
interface readListProps {
    readList: { id: number; blogId: number; blogTitle: string; read: boolean; }[]
}

const ReadList = ({ readList }: readListProps) => {
    return (
        <div>
            <h3 className="text-xl font-bold my-6">Read ({readList.length}) </h3>
            <ul className="mb-6">
                {readList.map(item => (
                    <li key={item.id} className="border rounded p-3">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="w-full">
                                        <Link
                                            href={`/blogs/${item.blogId}`}
                                            className="hover:text-blue-500 hover:underline">
                                            {item.blogTitle}
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ReadList