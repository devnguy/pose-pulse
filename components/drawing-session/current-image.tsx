import Image from "next/image";

type CurrentImageProps = {
  src?: string;
};

export function CurrentImage(props: CurrentImageProps) {
  const { src } = props;

  return (
    <div className="relative w-full h-full">
      {src && (
        <Image
          src={src}
          alt=""
          fill
          className="object-contain"
          quality={70}
          priority={true}
          preload={true}
        />
      )}
    </div>
  );
}
