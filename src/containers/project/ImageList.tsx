import Image from "next/image"

export default function ImageList({
  imageSrcList,
  onClickImage,
}: {
  imageSrcList: string[]
  onClickImage: (index: number) => void
}) {
  return imageSrcList.map((src, index) => (
    <button
      key={src}
      type="button"
      aria-label={`프로젝트 이미지 ${index + 1} 크게 보기`}
      className="h-full shrink-0 cursor-zoom-in"
      onClick={() => onClickImage(index)}
    >
      <Image
        src={src}
        alt={`프로젝트 화면 ${index + 1}`}
        className="w-auto h-full drop-shadow rounded-xl"
        width={0}
        height={0}
        sizes="100vw"
      />
    </button>
  ))
}
