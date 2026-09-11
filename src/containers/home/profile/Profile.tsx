import Image from "next/image"
import { FaBlog, FaCakeCandles, FaEnvelope, FaGithub, FaLinkedin, FaUser } from "react-icons/fa6"

import Block from "@/containers/home/Block"
import ProfileContent from "@/containers/home/profile/ProfileContent"

const paragraphDescriptionClassName = "text-black/60 pl-1"

function Paragraph({
  content,
  description,
  children,
}: {
  content: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <div>
      <p>{content}</p>
      <p className={paragraphDescriptionClassName}>{description}</p>
      {children}
    </div>
  )
}

function ContactElement({ content, icon, link }: { content: string; icon: React.ReactNode; link?: string }) {
  return (
    <div className="flex">
      {link ? (
        <a href={link} className="flex gap-1 items-center group">
          {icon}
          <span className="underline-animate">{content}</span>
        </a>
      ) : (
        <p className="flex gap-1 items-center">
          {icon}
          <span>{content}</span>
        </p>
      )}
    </div>
  )
}

export default function Profile() {
  return (
    <Block title="Profile">
      <div className="grid grid-cols-2 gap-y-10 max-lg:grid-cols-1 px-10 max-md:px-0">
        <div className="pl-[20%] max-xl:pl-[10%] max-sm:pl-0">
          <div className="max-w-sm">
            <Image
              className="rounded-xl object-contain w-auto h-auto"
              alt="프로필 사진"
              src="/profile.png"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
        </div>
        <ProfileContent title="Contact">
          <ContactElement content="안혜준(Hyejun An)" icon={<FaUser />} />
          <ContactElement content="2000.01.29." icon={<FaCakeCandles />} />
          <ContactElement content="jagaldol.dev@gmail.com" icon={<FaEnvelope />} link="mailto:jagaldol.dev@gmail.com" />
          <ContactElement content="@jagaldol" icon={<FaGithub />} link="https://github.com/jagaldol/" />
          <ContactElement content="LinkedIn" icon={<FaLinkedin />} link="https://www.linkedin.com/in/hye-jun/" />
          <ContactElement content="자갈돌의 devLog" icon={<FaBlog />} link="https://blog.jagaldol.com/" />
        </ProfileContent>

        <ProfileContent title="Work Experience">
          <div>
            <h4 className="text-xl max-md:text-lg font-semibold">Upstage</h4>
            <p className="mt-1 text-sm">AI Research Engineer Intern</p>
            <p className="text-sm text-black/60">2025.05. ~ 2025.11.</p>
            <ul className="mt-3 ml-5 list-disc space-y-1 text-sm leading-relaxed">
              <li>금융 AI의 RAG·의도분류·도구 호출 평가 및 개선</li>
              <li>비동기 문서 처리 파이프라인·API 구현</li>
              <li>Agent Layer·채팅 API·SSE 스트리밍 구현</li>
            </ul>
          </div>
        </ProfileContent>

        <ProfileContent title="Education">
          <Paragraph content="코디세이 AI 올인원 2기 · 혁신교육과정" description="2026.09. ~ 진행 중" />
          <Paragraph content="네이버 부스트캠프 AI Tech 7기 · NLP 트랙" description="2024.08. ~ 2025.02." />
          <Paragraph content="Google 머신러닝 부트캠프 5기" description="2024.07. ~ 2024.10." />
          <Paragraph content="카카오 테크 캠퍼스 1기 Backend" description="2023.04. ~ 2023.11." />
          <Paragraph content="부산대학교 전기컴퓨터공학부 정보컴퓨터공학전공" description="2018.03. ~ 2025.02.">
            <p className={paragraphDescriptionClassName}>학점: 4.00 / 4.5</p>
          </Paragraph>
        </ProfileContent>

        <ProfileContent title="Awards">
          <Paragraph content="2024년 TOPCIT 성적우수자 - 부산대학교총장상" description="2024.12.26." />
          <Paragraph content="2023년 TOPCIT 성적우수자 - 한국정보산업연합회장상" description="2023.12.22." />
          <Paragraph content="제 1회 PNU Coding Challenge - 우수상" description="2023.12.20." />
          <Paragraph content="카카오 테크 캠퍼스 신규 서비스 개발 프로젝트 - 대상" description="2023.11.17." />
        </ProfileContent>

        <ProfileContent title="Certifications & Tests">
          <Paragraph content="TOEIC Speaking · IM2, 120점" description="2025.03.15. 응시 · 2027.03.15.까지 유효" />
          <Paragraph content="SQL개발자(SQLD)" description="2024.12.13. 취득 · 영구 자격" />
          <Paragraph content="TOPCIT · 수준 4, 730점" description="2024.10.12. 응시" />
          <Paragraph content="정보처리기사" description="2024.06.18. 취득" />
          <details className="mt-2">
            <summary className="cursor-pointer text-black/60">과거 시험 성적 · 유효기간 종료</summary>
            <div className="mt-3 flex flex-col gap-2">
              <Paragraph content="PCCP Python · Level 3, 700점" description="2024.06.01. 응시 · 2026.06.01. 만료" />
              <Paragraph content="TOEIC · 830점" description="2023.12.10. 응시 · 2025.12.10. 만료" />
            </div>
          </details>
        </ProfileContent>
      </div>
    </Block>
  )
}
