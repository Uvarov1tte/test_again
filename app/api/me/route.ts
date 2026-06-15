import { getUserByToken } from "@/app/services/users"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    const authToken = req.headers.get("Authorization")
    const token = authToken ? authToken.split("Bearer ").at(1) : null
    
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const user = await getUserByToken(token)
    
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
}