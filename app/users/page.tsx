import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
    const users = await getUsers()

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="border rounded p-3 hover:bg-gray-50 hover:text-gray-900">
                        <Link
                            href={`/users/${user.username}`}
                            className="hover:text-blue-500 hover:underline"
                        >
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users