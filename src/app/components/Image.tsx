import { ImgHTMLAttributes } from "react";
import clsx from "clsx";

type Props = {
  type: "fluid" | "thumb";
  alt: string;
  src: string;
} & Partial<ImgHTMLAttributes<HTMLImageElement>>;

function Image({ type, alt, src, className, ...rest }: Props) {
  const imgClassName = type === "fluid" ? "img-fluid" : "thumb";
  return (
    <img
      {...rest}
      className={clsx(imgClassName, className)}
      src={src}
      alt={alt}
    />
  );
}

export { Image };
