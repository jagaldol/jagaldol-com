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

export default function Profile() {
  return (
    <section
      id="background"
      className="home-section max-[701px]:mb-17 profile-section [border-top:1px_solid_#dce4e9] pt-13 mb-16 max-[701px]:pt-9"
      aria-label="교육과 이력"
    >
      <div className="profile-grid grid grid-cols-[1.25fr_1fr] [gap:44px_70px] [&_.profile-group:first-child]:[grid-row:span_2] max-[701px]:flex max-[701px]:flex-col max-[701px]:gap-10">
        <ProfileContent title="교육">
          <Paragraph content="코디세이 AI 올인원 2기 · 혁신교육과정" description="2026.09. ~ 진행 중" />
          <Paragraph content="네이버 부스트캠프 AI Tech 7기 · NLP 트랙" description="2024.08. ~ 2025.02." />
          <Paragraph content="Google 머신러닝 부트캠프 5기" description="2024.07. ~ 2024.10." />
          <Paragraph content="카카오 테크 캠퍼스 1기 Backend" description="2023.04. ~ 2023.11." />
          <Paragraph content="부산대학교 전기컴퓨터공학부 정보컴퓨터공학전공" description="2018.03. ~ 2025.02.">
            <p className={paragraphDescriptionClassName}>학점: 4.00 / 4.5</p>
          </Paragraph>
        </ProfileContent>

        <ProfileContent title="수상">
          <Paragraph content="2024년 TOPCIT 성적우수자 - 부산대학교총장상" description="2024.12.26." />
          <Paragraph content="2023년 TOPCIT 성적우수자 - 한국정보산업연합회장상" description="2023.12.22." />
          <Paragraph content="제 1회 PNU Coding Challenge - 우수상" description="2023.12.20." />
          <Paragraph content="카카오 테크 캠퍼스 신규 서비스 개발 프로젝트 - 대상" description="2023.11.17." />
        </ProfileContent>

        <ProfileContent title="자격·시험">
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
    </section>
  )
}

export function Experience() {
  return (
    <section
      id="experience"
      className="home-section experience-section [&_>_h2]:text-[30px] [&_>_h2]:leading-[1.4] [&_>_h2]:tracking-[-0.025em] [border-top:1px_solid_#dce4e9] [border-bottom:1px_solid_#dce4e9] grid grid-cols-[200px_minmax(0,_1fr)] gap-10 [padding:28px_0_36px] mb-19 max-[1200px]:grid-cols-[140px_minmax(0,_1fr)] max-[1200px]:gap-6 max-[701px]:[&_>_h2]:text-[26px] max-[701px]:block max-[701px]:[padding:24px_0_30px] max-[701px]:mb-13"
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title">경력</h2>
      <div className="experience-content grid grid-cols-[0.8fr_1.2fr] gap-[30px] [&_h3]:text-[25px] [&_h3]:mb-2 [&_p]:text-[15px] [&_ul]:[list-style:disc] [&_ul]:pl-5 [&_ul]:text-[15px] [&_ul]:leading-[1.9] [&_li_+_li]:mt-2 max-[901px]:grid-cols-[1fr] max-[901px]:gap-6 max-[701px]:[&_h3]:text-[23px] max-[701px]:mt-5 max-[701px]:gap-4">
        <div>
          <h3>Upstage</h3>
          <p>AI Research Engineer Intern</p>
          <p className="experience-date text-[#596b78] mt-2 tabular-nums">2025.05. ~ 2025.11.</p>
        </div>
        <ul>
          <li>금융 AI의 RAG·의도분류·도구 호출 평가 및 개선</li>
          <li>비동기 문서 처리 파이프라인·API 구현</li>
          <li>Agent Layer·채팅 API·SSE 스트리밍 구현</li>
        </ul>
      </div>
    </section>
  )
}
