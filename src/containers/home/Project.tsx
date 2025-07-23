import fs from "fs"
import path from "path"

import Link from "next/link"
import { cache } from "react"

import Block from "@/containers/home/Block"
import ProjectContainer from "@/containers/project/ProjectConatiner"

export default async function Project() {
  const projects = await getProjectMetadatas()

  return (
    <Block title="Project">
      <div className="mt-5 flex flex-col text-center">
        <ProjectContainer title="Projects" projects={projects} />
      </div>
      <Link
        href="/projects/#AI_Project"
        className={`
        flex justify-center items-center rounded-full
        text-lg max-md:text-base
        h-14 max-2xl:h-12 max-md:h-10 
        mx-20 my-10 max-2xl:mx-10 max-md:mx-0
        drop-shadow text-white bg-main-theme hover:bg-main-theme-70 transition-all
        `}
      >
        View More
      </Link>
    </Block>
  )
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/ai")

const getProjectMetadatas = cache(async () => {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))

  const projects = await Promise.all(
    files.map(async (file) => {
      const mod = await import(`@/content/ai/${file}`)
      return {
        ...mod.metadata,
        slug: file.replace(/\.mdx$/, ""),
      }
    }),
  )

  projects.sort((a, b) => new Date(b.end_date || 0).getTime() - new Date(a.end_date || 0).getTime())

  return projects
})
