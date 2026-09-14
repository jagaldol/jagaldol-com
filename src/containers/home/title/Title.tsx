import Image from "next/image"
import { FiArrowDown } from "react-icons/fi"

export default function Title() {
  return (
    <section
      id="about"
      className="home-intro relative isolate grid grid-cols-[minmax(0,1fr)_300px] [grid-template-areas:'heading_portrait'_'description_portrait'_'jumps_portrait'] content-center items-start gap-x-20 gap-y-[22px] pt-15 pb-10 max-[1200px]:grid-cols-[minmax(0,1fr)_270px] max-[1200px]:gap-x-12 max-[901px]:grid-cols-[minmax(0,1fr)_220px] max-[901px]:gap-x-9 max-[701px]:flex max-[701px]:flex-col max-[701px]:gap-6 max-[701px]:pt-9 max-[701px]:pb-6 min-[1200px]:grid-cols-[minmax(0,1fr)_360px]"
      aria-labelledby="intro-title"
    >
      <div
        className="intro-cloud absolute -z-1 [inset:-84px_calc((100%_-_100vw)_/_2)_-20px] opacity-60 [mask-image:linear-gradient(to_bottom,_black_35%,_transparent_100%)] pointer-events-none max-[1200px]:left-[-40px] max-[1200px]:right-[-40px] max-[701px]:top-[-68px] max-[701px]:left-[-22px] max-[701px]:right-[-22px] max-[701px]:bottom-0"
        aria-hidden="true"
      >
        <Image src="/cloud.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="intro-copy [grid-area:heading]">
        <h1
          id="intro-title"
          className="text-[clamp(36px,4vw,52px)] leading-[1.38] font-medium tracking-[-0.035em] max-[901px]:text-[38px] max-[701px]:text-[clamp(23px,6.4vw,38px)] max-[701px]:leading-[1.4] min-[1200px]:text-[clamp(52px,3.6vw,58px)]"
        >
          개발을 즐기는
          <br />
          AI 엔지니어{" "}
          <span className="inline-block text-[#202d36]">
            <strong className="font-bold">안혜준</strong>입니다.
          </span>
        </h1>
      </div>
      <div className="intro-portrait [grid-area:portrait] max-[701px]:grid max-[701px]:w-full max-[701px]:grid-cols-[clamp(104px,30vw,160px)_minmax(0,1fr)] max-[701px]:items-center max-[701px]:gap-4">
        <Image
          src="/profile.png"
          className="h-75 w-75 rounded-2xl object-cover object-[36%_center] max-[1200px]:h-80 max-[1200px]:w-[270px] max-[901px]:h-[290px] max-[901px]:w-55 max-[701px]:h-auto max-[701px]:w-full max-[701px]:shrink-0 max-[701px]:aspect-[1224/1200] max-[701px]:rounded-xl min-[1200px]:h-auto min-[1200px]:w-90 min-[1200px]:aspect-[1224/1200]"
          alt="노트북으로 작업하는 안혜준"
          width={1224}
          height={1200}
          priority
          sizes="(max-width: 533px) 30vw, (max-width: 700px) 160px, (max-width: 1199px) 300px, 360px"
        />
        <div id="contact" className="intro-identity min-w-0">
          <p className="mt-[18px] text-[14px] max-[701px]:m-0">
            안혜준{" "}
            <span className="ml-2.5 text-[#637581] max-[701px]:ml-1.5 max-[701px]:mt-1 max-[701px]:text-[12px]">
              Hyejun An
            </span>
          </p>
          <p className="intro-birthday mt-1.5 text-[12px] text-[#596b78] tabular-nums">2000.01.29.</p>
          <div
            className="intro-contact-links mt-2 text-[15px] max-[701px]:text-[14px] [&_a]:inline-flex [&_a]:min-h-8 [&_a]:items-center [&_a]:underline [&_a]:decoration-[#a5b3bd] [&_a:hover]:decoration-current"
            aria-label="연락처와 외부 프로필"
          >
            <a href="mailto:jagaldol.dev@gmail.com" className="[overflow-wrap:anywhere]">
              jagaldol.dev@gmail.com
            </a>
            <div className="flex flex-wrap gap-x-[18px] gap-y-1 max-[701px]:gap-x-3.5">
              <a href="https://github.com/jagaldol/">GitHub</a>
              <a href="https://www.linkedin.com/in/hye-jun/">LinkedIn</a>
              <a href="https://blog.jagaldol.com/">자갈돌의 devLog</a>
            </div>
          </div>
        </div>
      </div>
      <nav
        className="profile-jumps flex flex-wrap items-center gap-x-[18px] gap-y-1 text-[14px] [grid-area:jumps] [&_a]:inline-flex [&_a]:min-h-8 [&_a]:items-center [&_a]:underline [&_a]:decoration-[#a5b3bd] [&_a:hover]:decoration-current"
        aria-label="홈 섹션 바로가기"
      >
        <a
          href="#projects"
          className="intro-project-link min-h-11! gap-2 rounded-[10px] bg-[#2d4456] px-3.5 py-2.5 font-semibold text-white no-underline! hover:bg-[#466278]"
        >
          프로젝트 보기 <FiArrowDown aria-hidden="true" />
        </a>
        <a href="#background">교육·수상·자격</a>
      </nav>
      <div className="intro-description [grid-area:description] max-w-155 mt-0 text-[17px] leading-[1.85] text-[#364650] break-keep [&_p_+_p]:mt-[9px] max-[701px]:mt-0 max-[701px]:text-[16px] max-[701px]:leading-[1.8]">
        <p>인공지능, 프론트엔드, 백엔드 등 어떤 분야든 만들고 싶은 것을 직접 구현하는 것을 즐깁니다.</p>
        <p>LLM 에이전트를 활용한 문제 해결과 반복 업무 자동화, AI로 일하는 방식을 개선하는 AX에 관심이 많습니다.</p>
        <p>빠르게 변화하는 기술을 꾸준히 배우고, 직접 만들고 활용하며 경험을 쌓고 있습니다.</p>
      </div>
    </section>
  )
}
