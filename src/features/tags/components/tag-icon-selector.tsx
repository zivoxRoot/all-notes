import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TagIcon } from "generated/prisma/enums"
import { TAG_ICONS, TAG_ICONS_STYLES } from "../lib/tags-icons"

type IconSelectorProps = {
  value: TagIcon
  onChange: (icon: TagIcon) => void
}

const TagIconSelector = ({ value, onChange }: IconSelectorProps) => {
  const CurrentIcon = TAG_ICONS_STYLES[value]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <CurrentIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {TAG_ICONS.map((icon: TagIcon) => {
          const Icon = TAG_ICONS_STYLES[icon]

          return (
            <DropdownMenuItem onClick={() => onChange(icon)} key={icon}>
              <Icon />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TagIconSelector
