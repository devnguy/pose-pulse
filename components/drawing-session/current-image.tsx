import Image from "next/image";

type CurrentImageProps = {
  src?: string;
};

export function CurrentImage(props: CurrentImageProps) {
  const { src } = props;

  return (
    <div className="h-[1104px] w-[736px] relative">
      <Image
        src={
          src ??
          "https://i.pinimg.com/736x/1b/76/47/1b76478d2def47c4ebfee4252e94adb4.jpg"
        }
        alt=""
        fill
        objectFit="contain"
      />
    </div>
  );
}
