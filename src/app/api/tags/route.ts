import { tagListSchema } from "@/features/tags/schemas/tags.schema"
import { TagService } from "@/features/tags/services/tag.service"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  try {
    const tags = await TagService.getAllTags()

    const parsed = tagListSchema.parse(tags)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("GET api/tags/route.ts error:", error)
    return NextResponse.json(error)
  }
}
