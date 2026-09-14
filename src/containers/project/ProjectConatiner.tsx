import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"

export type ProjectMetadata = {
  slug: string
  title: string
  description: string
  contribution?: string
  image: string
  stack: string[]
}

export function ProjectCard({
  project,
  featured = false,
  contribution,
}: {
  project: ProjectMetadata
  featured?: boolean
  contribution?: string
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`project-card group/project min-w-0 ${
        featured
          ? "project-card-featured grid grid-cols-[0.85fr_1.3fr] items-center gap-10 max-[901px]:gap-5 max-[901px]:p-7 max-[701px]:flex max-[701px]:flex-col max-[701px]:items-stretch max-[701px]:gap-0 max-[701px]:p-0"
          : "block"
      }`}
    >
      <div
        className={`project-card-image flex aspect-[3/2] items-center justify-center overflow-hidden ${featured ? "col-start-2 row-start-1" : ""}`}
      >
        <Image
          src={project.image}
          alt={`${project.title} 대표 화면`}
          width={1200}
          height={800}
          className="h-full w-full object-contain transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/project:scale-[1.025]"
          sizes={
            featured ? "(max-width: 700px) 100vw, 650px" : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 550px"
          }
        />
      </div>
      <div
        className={`project-card-copy ${featured ? "col-start-1 row-start-1 p-0 max-[701px]:px-0.5 max-[701px]:pt-5" : "px-0.5 pt-[22px] max-[701px]:pt-[18px]"}`}
      >
        <h3
          className={`flex items-center justify-between gap-4 leading-[1.4] tracking-[-0.025em] group-hover/project:underline group-hover/project:decoration-1 group-hover/project:underline-offset-5 ${featured ? "text-[34px]" : "text-2xl"} max-[701px]:text-[23px]`}
        >
          {project.title}
          <FiArrowUpRight className="w-[22px] shrink-0 text-[#61788a]" aria-hidden="true" />
        </h3>
        <p className={`mt-3 break-keep leading-[1.7] ${featured ? "text-[17px] max-[701px]:text-base" : "text-base"}`}>
          {project.description}
        </p>
        {contribution && (
          <p
            className={`project-contribution break-keep text-sm leading-[1.7] text-[#596b78] ${featured ? "mt-5 max-[701px]:mt-3" : "mt-3"}`}
          >
            {contribution}
          </p>
        )}
        <ul
          className="project-stack mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-[12px] text-[#536976]"
          aria-label="사용 기술"
        >
          {project.stack.map((stack) => (
            <li key={stack}>{stack}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export default function ProjectContainer({ title, projects }: { title?: string; projects: ProjectMetadata[] }) {
  return (
    <section className="project-category mb-[70px] [&_>_h2]:text-[25px] [&_>_h2]:mb-7">
      {title && <h2 id={title.replace(" ", "_")}>{title}</h2>}
      <div className="project-grid grid grid-cols-[repeat(3,_minmax(0,_1fr))] [gap:40px_28px] [&_.project-card-copy_h3]:text-[20px] [&_.project-card-copy_>_p]:text-[15px] max-[901px]:grid-cols-[repeat(2,_minmax(0,_1fr))] max-[701px]:grid-cols-[1fr] max-[701px]:gap-9">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
