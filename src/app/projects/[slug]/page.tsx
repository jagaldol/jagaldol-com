import fs from "fs"
import path from "path"

import type { Metadata } from "next"
import Image from "next/image"
import { FiArrowUpRight } from "react-icons/fi"

import Badge from "@/components/Badge"
import ImageListContainer from "@/containers/project/ImageListContainer"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const filePath = slugToPathMap[slug]
  const { metadata } = await import(`../../../content/${filePath}.mdx`)

  return {
    title: `${metadata.title} | Hyejun An`,
    description: metadata.description,
    openGraph: {
      title: `${metadata.title} | Hyejun An`,
      description: metadata.description,
      url: `https://jagaldol.com/projects/${slug}`,
      images: [
        {
          url: `https://jagaldol.com${metadata.image}`,
          width: 1200,
          height: 630,
          alt: `${metadata.title} 대표 이미지`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadata.title} | Hyejun An`,
      description: metadata.description,
      images: [`https://jagaldol.com${metadata.image}`],
    },
  }
}

const KST_DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "numeric",
  day: "numeric",
})

const formatDateInKST = (date: Date) => {
  const parts = KST_DATE_FORMATTER.formatToParts(date)
  const year = parts.find((part) => part.type === "year")?.value ?? ""
  const month = parts.find((part) => part.type === "month")?.value ?? ""
  const day = parts.find((part) => part.type === "day")?.value ?? ""

  return `${year}.${month}.${day}.`
}

const slugToPathMap = (() => {
  const contentDir = path.join(process.cwd(), "src/content")
  const map: Record<string, string> = {}

  function walkDir(currentPath: string, relative: string[] = []) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        walkDir(path.join(currentPath, entry.name), [...relative, entry.name])
      } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
        const nameWithoutExt = entry.name.replace(/\.mdx$/, "")
        const routeSlug = nameWithoutExt // URL 경로로 사용할 slug
        const filePath = [...relative, nameWithoutExt].join("/") // 실제 파일 경로
        map[routeSlug] = filePath
      }
    }
  }

  walkDir(contentDir)
  return map
})()

// 동적 경로 페이지
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const filePath = slugToPathMap[slug]

  const { default: Post, metadata } = await import(`../../../content/${filePath}.mdx`)

  // 날짜 포맷팅
  const start = new Date(metadata.start_date)
  const end = metadata.end_date ? new Date(metadata.end_date) : null
  const startDateString = formatDateInKST(start)
  const endDateString = end ? formatDateInKST(end) : "진행중"
  const dateString = `${startDateString} ~ ${endDateString}`

  const imageSrcList = metadata.image_list_path
    ? fs
        .readdirSync(path.join(process.cwd(), "public", metadata.image_list_path))
        .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
        .map((name) => `${[metadata.image_list_path, name].join("/").replace(/\/+/g, "/")}`)
    : []

  return (
    <div className="project-detail-page [padding:48px_40px_100px] max-[701px]:[padding:32px_22px_64px]">
      <div className="project-detail-inner max-w-270 my-auto mx-auto min-w-0">
        <div className="project-detail-overview max-w-270 my-0 mx-auto">
          <div className="project-detail-heading mb-4 [&_h1]:text-[40px] [&_h1]:leading-[1.4] [&_h1]:mb-[14px] [&_>_p]:text-[18px] [&_>_p]:leading-[1.7] [&_.project-detail-date]:text-[#61717d] [&_.project-detail-date]:text-[14px] max-[701px]:[&_h1]:text-[30px] max-[701px]:[&_>_p]:text-[16px]">
            <h1>{metadata.title}</h1>
            <p>{metadata.description}</p>
            <div className="project-detail-meta flex [flex-wrap:wrap] items-center [gap:4px_24px] mt-3">
              <p className="project-detail-date">{dateString}</p>
              {metadata.deploy_link && (
                <a
                  className="text-link inline-flex items-center gap-2 min-h-11 font-semibold [&:hover]:underline project-external-link text-[14px]"
                  href={metadata.deploy_link}
                >
                  프로젝트 바로가기 <FiArrowUpRight aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          {metadata.banner && (
            <div className="group relative mb-2">
              <Image
                src={metadata.banner}
                alt={`${metadata.title} 대표 이미지`}
                width={1500}
                height={300}
                priority
                unoptimized
                className="w-full aspect-[5/1] object-contain"
              />
            </div>
          )}
          <div className="flex gap-1 justify-end items-center flex-wrap min-h-7 [&>img]:h-7">
            {metadata.stack?.map((value: string) => (
              <Badge name={value} key={value} />
            ))}
          </div>
        </div>
        {imageSrcList.length > 0 && <ImageListContainer imageSrcList={imageSrcList} />}

        <article className="markdown-body project-article max-w-220 [margin:56px_auto_0] text-[17px] leading-[1.85] [overflow-wrap:anywhere] [&_pre]:overflow-x-auto [&_pre]:max-w-full max-[701px]:mt-9 max-[701px]:text-[16px] max-[701px]:leading-[1.85]">
          <Post />
        </article>
      </div>
    </div>
  )
}

// 정적 경로 생성
export function generateStaticParams() {
  return Object.keys(slugToPathMap).map((slug) => ({ slug }))
}

export const dynamicParams = false
