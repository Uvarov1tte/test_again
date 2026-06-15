"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState("")
    const { showNotification } = useNotification()

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const result = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        })

        if (result?.error) {
            setError("Invalid username or password")
            showNotification("Invalid username or password", "error")
        } else {
            showNotification("Logged in successfully")
            router.push("/")
            router.refresh()
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>

                <label className="flex h-[50px] items-center">
                    <div className="float-left w-1/4">Username</div>
                    <Input
                        type="text"
                        name="username"
                        required
                        className="float-right w-3/4"
                    />
                </label>
                <label className="flex h-[50px] items-center">
                    <div className="float-left w-1/4">Password</div>
                    <Input
                        type="password"
                        name="password"
                        required
                        className="float-right w-3/4"
                    />
                </label>
                <Button type="submit" className="mt-4" testId="login-button">Login</Button>
                {error && <div data-testid="error-message">{error}</div>}
            </form>
        </div>
    )
}