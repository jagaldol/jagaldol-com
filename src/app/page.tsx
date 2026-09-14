import Profile, { Experience } from "@/containers/home/profile/Profile"
import Project, { MoreProjects } from "@/containers/home/Project"
import Title from "@/containers/home/title/Title"

export default function Home() {
  return (
    <div className="home-page max-w-354 py-0 px-10 my-auto mx-auto max-[701px]:pl-[22px] max-[701px]:pr-[22px] min-[1200px]:pl-12 min-[1200px]:pr-12">
      <Title />
      <Experience />
      <Project />
      <MoreProjects />
      <Profile />
    </div>
  )
}
