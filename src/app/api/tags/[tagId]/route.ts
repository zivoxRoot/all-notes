import { tagSchema } from "@/features/tags/schemas/tags.schema"
import { TagService } from "@/features/tags/services/tag.service"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tagId: string }> }
) {
  try {
    const { tagId } = await params
    const tag = await TagService.getTagById(tagId)

    const parsed = tagSchema.safeParse(tag)
    if (!parsed.success) {
      console.error(
        "GET /api/tags/[tagId] tag schema complains error:",
        parsed.error
      )
      return NextResponse.json({ error: parsed.error }, { status: 500 })
    }

    return NextResponse.json(parsed.data)
  } catch (error) {
    console.error("GET /api/tags/[tagId] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
