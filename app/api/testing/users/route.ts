import { addTestUser } from "@/app/services/testing";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }
    const body = await req.json()
    await addTestUser(body)
    return NextResponse.json({ msg: "ok" })
}