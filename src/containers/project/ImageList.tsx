import Image from "next/image"

export default function ImageList({
  imageSrcList,
  onClickImage,
}: {
  imageSrcList: string[]
  onClickImage: (index: number) => void
}) {
  return imageSrcList.map((src, index) => (
    <Image
      key={src}
      src={src}
      alt={`Image${index}: ${src}`}
      className="w-auto h-full drop-shadow rounded-xl"
      width={0}
      height={0}
      sizes="100vw"
      priority
      onClick={() => onClickImage(index)}
    />
  ))
}
