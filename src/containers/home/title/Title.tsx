import Image from "next/image"

import MoreButton from "@/containers/home/title/MoreButton"

export default function Title() {
  return (
    <>
      <div className="absolute left-0 top-0 w-full h-[1000px] -z-30 bg-cover bg-center opacity-60 select-none pointer-events-none">
        <Image src="/cloud.jpg" alt="배경 구름 이미지" priority className="w-full h-full object-cover" fill />
      </div>
      <div className="absolute left-0 top-0 w-full h-[1000px] bg-gradient-to-b from-transparent to-bg -z-20" />

      <div className="h-[700px] flex flex-col text-center">
        <div className="flex flex-col flex-1 items-center justify-center ">
          <h1 className="text-5xl flex gap-4 max-md:gap-2 max-md:flex-col max-md:text-3xl">
            <span>안녕하세요 </span>
            <span>
              <b>안혜준</b>입니다.
            </span>
          </h1>
          <div className="my-10 flex flex-col gap-2">
            <p>
              <b>AI가 실제 작업을 수행하는 시스템을 만듭니다.</b>
            </p>
            <p>LLM 에이전트의 작업 흐름을 설계하고, 사용자가 설치하고 운영할 수 있는 제품으로 구현합니다.</p>
            <p className="max-md:block flex flex-col">
              <span>기업용 생성형 AI 시스템 개발부터 개인비서 하네스와 오픈소스 플러그인 배포까지 경험했습니다.</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <MoreButton />
        </div>
      </div>
    </>
  )
}
