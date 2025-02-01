import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.jsonserve.com/Uw5CrX")

    if (!response.ok) {
      throw new Error("Failed to fetch quiz data")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching quiz data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

