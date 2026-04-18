import { TagIcon } from "generated/prisma/enums"
import {
  Book,
  Clock,
  Code,
  Flag,
  Heart,
  LucideIcon,
  Star,
  Tag as TagIconLucide,
} from "lucide-react"

export const TAG_ICONS = Object.values(TagIcon)

export const TAG_ICONS_STYLES: Record<TagIcon, LucideIcon> = {
  STAR: Star,
  HEART: Heart,
  BOOK: Book,
  CODE: Code,
  CLOCK: Clock,
  FLAG: Flag,
  TAG: TagIconLucide,
}
