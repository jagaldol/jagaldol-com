import Image from "next/image"

export default function Stacks({ stacks }: { stacks: { alt: string; badge: string }[] }) {
  return (
    <>
      <h2 className="text-center">🔧 사용 기술</h2>
      <div className="flex w-full justify-center my-10">
        <div className="flex justify-center flex-wrap gap-x-1 gap-y-3 w-[1000px] max-lg:w-[700px] max-md:w-full ">
          {stacks.map((stack, index) => (
            <Image
              src={stack.badge}
              alt={stack.alt}
              key={index}
              className="!h-7 w-auto object-contain"
              unoptimized
              width="0"
              height="0"
              sizes="100vw"
            />
          ))}
        </div>
      </div>
    </>
  )
}
