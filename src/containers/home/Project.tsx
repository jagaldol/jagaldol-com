import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"

import { ProjectCard } from "@/containers/project/ProjectConatiner"
import type { ProjectMetadata } from "@/containers/project/ProjectConatiner"
import { metadata as lifebase } from "@/content/ai/lifebase.mdx"
import { metadata as maeilMail } from "@/content/ai/maeil-mail.mdx"
import { metadata as undoc } from "@/content/ai/undoc.mdx"
import { metadata as dayPlanner } from "@/content/sub/day-planner-enhanced.mdx"
import { metadata as zotero } from "@/content/toy/zotero-cite-preview-resizer.mdx"
import { metadata as behindFitness } from "@/content/web/behind-fitness.mdx"

const featuredProject: ProjectMetadata = { ...lifebase, slug: "lifebase" }
const supportingProjects: ProjectMetadata[] = [
  { ...maeilMail, slug: "maeil-mail" },
  { ...undoc, slug: "undoc" },
]
const toolProjects: ProjectMetadata[] = [
  { ...dayPlanner, slug: "day-planner-enhanced" },
  { ...behindFitness, slug: "behind-fitness" },
  { ...zotero, slug: "zotero-cite-preview-resizer" },
]

export default function Project() {
  return (
    <section
      id="projects"
      className="home-section mb-28 max-[701px]:mb-17 [&#projects]:mb-14 max-[701px]:[&#projects]:mb-10"
      aria-labelledby="projects-title"
    >
      <div className="section-heading mb-8 [&_h2]:text-[30px] [&_h2]:leading-[1.4] [&_h2]:tracking-[-0.025em] [&_p]:text-[#596b78] [&_p]:mt-[10px] [&_p]:text-[16px] max-[701px]:mb-6 max-[701px]:[&_h2]:text-[26px] max-[701px]:[&_p]:text-[15px] max-[701px]:[&_p]:leading-[1.7] section-heading-with-link flex justify-between items-end gap-6 max-[701px]:flex max-[701px]:[flex-wrap:wrap] max-[701px]:items-center max-[701px]:[gap:8px_20px] max-[701px]:[&_>_.text-link]:text-[14px]">
        <h2 id="projects-title">주요 프로젝트</h2>
        <Link
          href="/projects"
          className="text-link inline-flex items-center gap-2 min-h-11 font-semibold [&:hover]:underline"
        >
          전체 프로젝트 <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <ProjectCard project={featuredProject} featured contribution={featuredProject.contribution} />
      <div className="featured-grid grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-8 mt-[38px] max-[701px]:grid-cols-[1fr] max-[701px]:gap-9 max-[701px]:mt-9">
        {supportingProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} contribution={project.contribution} />
        ))}
      </div>
      <p className="other-ai-projects mt-7 text-[14px] leading-[1.8] text-[#596b78] [&_a]:inline-block [&_a]:py-[6px] [&_a]:px-0 [&_a]:underline [&_a]:text-[#273b4b]">
        다른 AI 프로젝트: <Link href="/projects/chat-foodie">ChatFoodie</Link>
        <span aria-hidden="true"> · </span>
        <Link href="/projects/box-size">Box.size</Link>
      </p>
    </section>
  )
}

export function MoreProjects() {
  return (
    <section
      className="home-section mb-28 max-[701px]:mb-17 [&#projects]:mb-14 max-[701px]:[&#projects]:mb-10 more-projects [&_.project-grid]:grid-cols-[1fr] [&_.project-grid]:gap-0 [&_.project-card]:grid [&_.project-card]:grid-cols-[180px_minmax(0,_1fr)] [&_.project-card]:items-center [&_.project-card]:gap-7 [&_.project-card]:py-6 [&_.project-card]:px-0 [&_.project-card_+_.project-card]:[border-top:1px_solid_#e7ecef] [&_.project-card-copy]:py-0 [&_.project-card-copy]:px-0 [&_.project-card-copy_>_p]:mt-2 [&_.project-stack]:mt-[10px] max-[701px]:[&_.project-card]:grid-cols-[96px_minmax(0,_1fr)] max-[701px]:[&_.project-card]:gap-4 max-[701px]:[&_.project-card]:items-start max-[701px]:[&_.project-card]:py-[22px] max-[701px]:[&_.project-card]:px-0 max-[701px]:[&_.project-card-copy_h3]:text-[18px] max-[701px]:[&_.project-card-copy_h3]:[overflow-wrap:anywhere] max-[701px]:[&_.project-card-copy_h3_svg]:w-4 max-[701px]:[&_.project-card-copy_>_p]:text-[14px] max-[701px]:[&_.project-card-copy_>_p]:leading-[1.65] max-[701px]:[&_.project-stack]:text-[12px] max-[701px]:[&_.project-stack]:[gap:6px_12px] [&_.section-heading_h2]:text-[24px] max-[701px]:[&_.section-heading_h2]:text-[22px]"
      aria-labelledby="more-projects-title"
    >
      <div className="section-heading mb-8 [&_h2]:text-[30px] [&_h2]:leading-[1.4] [&_h2]:tracking-[-0.025em] [&_p]:text-[#596b78] [&_p]:mt-[10px] [&_p]:text-[16px] max-[701px]:mb-6 max-[701px]:[&_h2]:text-[26px] max-[701px]:[&_p]:text-[15px] max-[701px]:[&_p]:leading-[1.7] section-heading-with-link flex justify-between items-end gap-6 max-[701px]:flex max-[701px]:[flex-wrap:wrap] max-[701px]:items-center max-[701px]:[gap:8px_20px] max-[701px]:[&_>_.text-link]:text-[14px]">
        <div>
          <h2 id="more-projects-title">직접 만들어 쓰는 도구</h2>
        </div>
        <Link
          href="/projects"
          className="text-link inline-flex items-center gap-2 min-h-11 font-semibold [&:hover]:underline"
        >
          전체 프로젝트 <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <div className="project-grid grid grid-cols-[repeat(3,_minmax(0,_1fr))] [gap:40px_28px] [&_.project-card-copy_h3]:text-[20px] [&_.project-card-copy_>_p]:text-[15px] max-[901px]:grid-cols-[repeat(2,_minmax(0,_1fr))] max-[701px]:grid-cols-[1fr] max-[701px]:gap-9">
        {toolProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
