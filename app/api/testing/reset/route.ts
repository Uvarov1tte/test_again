import { resetDatabase } from "@/app/services/testing";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }
    await resetDatabase()
    return NextResponse.json({ msg: "ok" })
}