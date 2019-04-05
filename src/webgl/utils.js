export const lerp = (a, b, t) => a + (b - a) * t;

export const ease = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

export const randomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomID = () =>
  "_" +
  Math.random()
    .toString(36)
    .substr(2, 9);
