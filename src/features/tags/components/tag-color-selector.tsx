import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TagColor } from "generated/prisma/enums"
import { Box, Paintbrush } from "lucide-react"
import { TAG_BG_COLOR_STYLES, TAG_COLORS } from "../lib/tags-colors"

type ColorSelectorProps = {
  value: TagColor
  onChange: (icon: TagColor) => void
}

const TagColorSelector = ({ value, onChange }: ColorSelectorProps) => {
  const currentColor = TAG_BG_COLOR_STYLES[value]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} className={`${currentColor}`}>
          <Paintbrush />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {TAG_COLORS.map((col: TagColor) => {
          const color = TAG_BG_COLOR_STYLES[col]

          return (
            <DropdownMenuItem
              onClick={() => onChange(col)}
              key={col}
              className={`${color}`}
            >
              <Box />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TagColorSelector
