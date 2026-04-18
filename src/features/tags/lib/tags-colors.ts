import { TagColor } from "generated/prisma/enums"

export const TAG_COLORS = Object.values(TagColor)

// TODO: Add dark mode specific colors
export const TAG_FG_COLOR_STYLES: Record<TagColor, string> = {
  RED: "text-red-500 hover:text-red-500",
  GREEN: "text-green-500 hover:text-green-500",
  BLUE: "text-blue-500 hover:text-blue-500",
  YELLOW: "text-yellow-500 hover:text-yellow-500",
  PURPLE: "text-purple-500 hover:text-purple-500",
  ORANGE: "text-orange-500 hover:text-orange-500",
  GRAY: "text-gray-500 hover:text-gray-500",
  BLACK: "text-black hover:text-black",
}

export const TAG_BG_COLOR_STYLES: Record<TagColor, string> = {
  RED: "bg-red-500 hover:bg-red-500",
  GREEN: "bg-green-500 hover:bg-green-500",
  BLUE: "bg-blue-500 hover:bg-blue-500",
  YELLOW: "bg-yellow-500 hover:bg-yellow-500",
  PURPLE: "bg-purple-500 hover:bg-purple-500",
  ORANGE: "bg-orange-500 hover:bg-orange-500",
  GRAY: "bg-gray-500 hover:bg-gray-500",
  BLACK: "bg-black hover:bg-black",
}
