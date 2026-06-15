"use client"

import { registerUser } from "../actions/users"
import { useActionState, useEffect } from "react"
import { useNotification } from "../components/NotificationContext"
import { useRouter } from "next/navigation"
import Button from "../components/Button"
import Input from "../components/Input"

export default function RegisterPage() {
    const [state, formAction] = useActionState(registerUser, { errors: {}, values: { username: "", name: "", password: "", passwordConfirm: "" }, success: false })
    const { showNotification } = useNotification()
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            showNotification("New user registered successfully, please log in.")
            router.push("/login")
        }
    }, [state, showNotification, router])
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form action={formAction}>
                <label className="flex h-[50px] items-center">
                    <div className="float-left w-1/4">Username</div>
                    <Input
                        type="text"
                        name="username"
                        required
                        defaultValue={state.values?.username}
                        className="float-right w-3/4"
                    />
                </label>
                <label className="flex h-[50px] items-center">
                    <div className="float-left w-1/4">Name</div>
                    <Input
                        type="text"
                        name="name"
                        required
                        defaultValue={state.values?.name}
                        className="float-right w-3/4"
                    />
                </label>
                <label className="flex h-[50px] items-center">
                    <div className="float-left w-1/4">Password</div>
                    <Input
                        type="password"
                        name="password"
                        required
                        defaultValue={state.values?.password}
                        className="float-right w-3/4"
                    />
                </label>
                <label className="flex h-[50px] items-center">
                    <div className="float-left w-1/4">Confirm Password</div>
                    <Input
                        type="password"
                        name="passwordConfirm"
                        required
                        defaultValue={state.values?.passwordConfirm}
                        className="float-right w-3/4"
                    />
                </label>

                <Button testId="register-button" type="submit" className="mt-4">Register</Button>
                {state.errors && Object.keys(state.errors).length > 0 &&
                    <div>
                        {Object.values(state.errors).map((e: any, idx) =>
                            <p key={idx} data-testid={`${Object.keys(state.errors)[idx]}-error`} style={{ color: "red" }}>{e.toString()}</p>
                        )}
                    </div>}
            </form>
        </div>
    )
}