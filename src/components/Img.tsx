import NextImage, { type ImageProps } from "next/image";
import { asset } from "@/lib/utils";

/** next/image + préfixe automatique du sous-chemin de publication (GitHub Pages). */
export default function Img({ src, ...props }: ImageProps) {
  return <NextImage src={typeof src === "string" ? asset(src) : src} {...props} />;
}
