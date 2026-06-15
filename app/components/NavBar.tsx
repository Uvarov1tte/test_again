"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
    const { data: session } = useSession()

    return (
        <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
            <NavLink href="/" >home</NavLink>
            {" | "}
            <NavLink href="/blogs" >blogs</NavLink>
            {session && (
                <>
                    {" | "}
                    <NavLink href="/blogs/new" >Create new blog</NavLink>
                </>
            )}

            <div className="ml-auto flex items-center gap-4">
                <NavLink href="/users">All users</NavLink>
                {" | "}
                {session ? (
                    <>
                        <em>{session.user?.name} logged in</em>{" "}
                        {" | "}
                        <NavLink href="/me" >me</NavLink>

                        {" | "}
                        <button onClick={() => signOut()}>logout</button>
                    </>
                ) : (
                    <>
                        <NavLink href="/login" >login</NavLink>
                        {" | "}
                        <NavLink href="/register" >register</NavLink>
                    </>
                )}
            </div>
        </nav >
    )
}