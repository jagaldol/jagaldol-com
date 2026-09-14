export default function ProfileContent({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="profile-group [&_h2]:text-[21px] [&_h2]:mb-6">
      <h2>{title}</h2>
      <div className="profile-items flex flex-col gap-[18px] text-[15px] leading-[1.7] [&_.text-black\/60]:text-[#61717d] [&_.text-black\/60]:text-[13px] [&_.text-black\/60]:pl-0">
        {children}
      </div>
    </div>
  )
}
