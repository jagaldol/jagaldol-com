import Image from "next/image"
import Link from "next/link"

import ProjectLink from "@/components/ProjectLink"

export default function ProjectContainer({ title, projects }: { title: string; projects: any }) {
  return (
    <>
      <h2 className="text-xl my-4 text-center" id={title.replace(" ", "_")}>
        {title}
      </h2>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 py-5 mb-20 max-md:grid-cols-1 mx-20 max-2xl:mx-10 max-md:mx-0 gap-x-3 gap-y-10">
        {projects.map((project: any) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="relative w-full bg-gradient-to-bl to-gray-300 from-gray-100 drop-shadow-lg flex items-center justify-center group"
          >
            <Image
              alt={`${project.title} 대표 이미지`}
              priority
              width={500}
              height={300}
              className="group-hover:scale-90 transition-all duration-500"
              src={project.image}
            />
            <ProjectLink title={project.title} stacks={project.stack} />
          </Link>
        ))}
      </div>
    </>
  )
}
