import Image from "next/image"

export default function Badge({ name }: { name: string }) {
  const src = `https://img.shields.io/badge/-${name}-FFFFFF?style=for-the-badge&logo=${name}&logoColor=black`
  return (
    <Image
      src={src}
      alt={name}
      unoptimized
      className="w-auto  h-7 object-contain drop-shadow"
      width="0"
      height="0"
      sizes="100vw"
    />
  )
}
