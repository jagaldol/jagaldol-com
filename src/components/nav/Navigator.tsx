import NavLink from "@/components/nav/NavLink"

export default function Navigator() {
  return (
    <nav className="h-full flex items-end max-md:hidden">
      <NavLink link="/" name="HOME" />
      <NavLink link="/projects" name="PROJECT" />
      <NavLink link="/files/resume.pdf" name="RESUME" />
      <a
        href="https://github.com/jagaldol"
        className="mx-3 text-lg transition-all hover:text-main-theme hover:-translate-y-[2px] duration-1000"
      >
        GITHUB
      </a>
      <a
        href="https://blog.jagaldol.com/"
        className="mx-3 text-lg transition-all hover:text-main-theme hover:-translate-y-[2px] duration-1000"
      >
        BLOG
      </a>
    </nav>
  )
}
