import fs from "fs"
import path from "path"

import type { Metadata } from "next"
import { cache } from "react"

import ProjectContainer from "@/containers/project/ProjectConatiner"

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getProjectMetadatas()
  const latestAI = projects.ai[0]
  const imageUrl = `https://jagaldol.com${latestAI.image}` || "https://jagaldol.com/images/profile.png"

  return {
    title: "Project | Hyejun An",
    description: "지금까지 수행해온 프로젝트 모음입니다.",
    openGraph: {
      title: "Project | Hyejun An",
      description: "지금까지 수행해온 프로젝트 모음입니다.",
      url: "https://jagaldol.com/projects/",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Hyejun An Project Image",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Project | Hyejun An",
      description: "지금까지 수행해온 프로젝트 모음입니다.",
      images: [imageUrl],
    },
  }
}

const CATEGORY_LIST = ["ai", "web", "sub"]
const CONTENT_DIR = path.join(process.cwd(), "src/content")

const getProjectMetadatas = cache(async () => {
  const projects: Record<string, any[]> = {}

  for (const category of CATEGORY_LIST) {
    const dir = path.join(CONTENT_DIR, category)
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))

    const metas = await Promise.all(
      files.map(async (file) => {
        const mod = await import(`@/content/${category}/${file}`)
        return {
          ...mod.metadata,
          slug: file.replace(/\.mdx$/, ""),
          category,
        }
      }),
    )

    metas.sort((a, b) => new Date(b.end_date || 0).getTime() - new Date(a.end_date || 0).getTime())

    projects[category] = metas
  }

  return projects
})

export default async function ProjectsPage() {
  const projects = await getProjectMetadatas()

  return (
    <>
      <div className="mt-5 flex flex-col text-center">
        <h1 className="text-3xl my-8">Project List</h1>
        <ProjectContainer title="AI Project" projects={projects.ai} />
        <ProjectContainer title="Web Project" projects={projects.web} />
        <ProjectContainer title="Sub Project" projects={projects.sub} />
        {/* <ProjectContainer title="Toy Project" projects={projects.toy} /> */}
      </div>
    </>
  )
}
