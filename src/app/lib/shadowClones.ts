export type ShadowClone = {
  x: number;
  y: number;
  delay: number;
  duration: number;
  opacity: [number, number, number, number, number];
};

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createPrng(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildShadowClones(seedKey: string, charCount: number): ShadowClone[][] {
  return Array.from({ length: charCount }, (_, charIndex) => {
    const random = createPrng(hashString(`${seedKey}:${charIndex}`));
    const cloneCount = Math.floor(random() * 5) + 4;

    return Array.from({ length: cloneCount }, () => ({
      x: random() * 60 - 30,
      y: random() * 60 - 30,
      delay: random() * 0.3,
      duration: random() * 0.3 + 0.4,
      opacity: [
        0,
        random() * 0.3 + 0.7,
        random() * 0.4 + 0.4,
        random() * 0.3 + 0.2,
        0,
      ] as [number, number, number, number, number],
    }));
  });
}
