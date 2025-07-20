import Image from "next/image"

export default function Badge({ name }: { name: string }) {
  const src = `https://img.shields.io/badge/-${name}-FFFFFF?style=for-the-badge&logo=${name}&logoColor=black`
  return (
    <Image
      src={src}
      alt={name}
      className="w-auto object-contain drop-shadow"
      unoptimized
      height={28} // h-7 is 1.75rem = 28px
      width={0} // allow auto width based on height
    />
  )
}
