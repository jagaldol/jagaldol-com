import fs from "fs"
import path from "path"

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Badge from "@/components/Badge"
import ImageListContainer from "@/containers/project/ImageListContainer"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const filePath = slugToPathMap[slug]
  const { metadata } = await import(`@/content/${filePath}.mdx`)

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

  const { default: Post, metadata } = await import(`@/content/${filePath}.mdx`)

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
    <div className="mt-10 w-full flex justify-center">
      <div className="w-[1300px] max-2xl:w-[1000px] max-xl:w-[1000px] max-lg:w-[700px] max-md:w-full">
        <div className="mb-8">
          <h1>{metadata.title}</h1>
          <p>{metadata.description}</p>
          <p className="text-end">{dateString}</p>
        </div>
        {metadata.banner && (
          <div className="group relative mb-2">
            <Image
              src={metadata.banner}
              alt={`${metadata.title} 대표 이미지`}
              width={1500}
              height={300}
              priority
              className="object-contain"
            />
            {metadata.deploy_link && (
              <div className="absolute top-0 left-0 w-full h-full">
                <Link href={metadata.deploy_link}>
                  <div className="w-full h-full opacity-0 group-hover:opacity-100 bg-gradient-to-tl from-main-theme to-main-theme/60 z-10 transition-all duration-500 text-white flex drop-shadow-2xl">
                    <h3 className="absolute right-0 bottom-0 text-3xl max-md:text-2xl max-sm:text-lg max-sm:-translate-y-3 -translate-x-8 -translate-y-5">
                      바로가기
                    </h3>
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
        <div className="flex gap-1 justify-end items-center flex-wrap h-7">
          {metadata.stack?.map((value: string) => (
            <Badge name={value} key={value} />
          ))}
        </div>
        {imageSrcList.length > 0 && <ImageListContainer imageSrcList={imageSrcList} />}

        <article className="markdown-body mt-6 prose dark:prose-invert">
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
