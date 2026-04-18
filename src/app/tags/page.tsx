import NewTag from "@/features/tags/components/new-tag"
import TagsList from "@/features/tags/components/tags-list"

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Tags</h1>
        <NewTag />
      </div>
      <TagsList />
    </>
  )
}

export default Page
