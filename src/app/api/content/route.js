import { NextResponse } from "next/server";
import { getServerData } from "@/lib/data";

export async function GET() {
    try {
        const data = await getServerData();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to load dynamic data" },
            { status: 500 }
        );
    }
}
