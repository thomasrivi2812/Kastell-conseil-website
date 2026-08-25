import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/** URL d'un visuel Sanity, ou null si le CMS n'est pas branché. */
export function imageUrl(source: SanityImageSource | undefined | null, width = 1200) {
  if (!builder || !source) return null;
  return builder.image(source).width(width).auto("format").url();
}
