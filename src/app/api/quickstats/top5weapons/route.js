import { NextResponse } from "next/server";

export async function GET(request) {
    return NextResponse.json({ message: 'GET /api/quickstats/top5weapons' });
};