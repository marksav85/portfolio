import type { ImageAttributes } from '../types/portfolio';
// Resolve only against the verified configured CMS origin, never a guessed host.
export function resolveMedia(image: ImageAttributes, origin: string): ImageAttributes | null {
  try {
    const url = new URL(image.url, origin);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
    return { ...image, url: url.href };
  } catch {
    return null;
  }
}
