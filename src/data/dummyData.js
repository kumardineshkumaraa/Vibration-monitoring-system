export const initialSamples = Array.from({ length: 120 }, (_, i) => {
  const t = i * 0.02;
  const noise = () => (Math.random() - 0.5) * 0.08;
  const x = 0.12 + 0.28 * Math.sin(2 * Math.PI * 5 * t) + noise();
  const y = 0.08 + 0.20 * Math.sin(2 * Math.PI * 5 * t + 1.1) + noise();
  const z = 0.98 + 0.10 * Math.sin(2 * Math.PI * 3 * t) + noise();
  return { t, x, y, z };
});

export function generateSample(index) {
  const t = index * 0.02;
  const vibration = 0.16 + 0.04 * Math.sin(index / 9);
  const noise = () => (Math.random() - 0.5) * 0.06;
  return {
    t,
    x: 0.12 + vibration * Math.sin(2 * Math.PI * 5 * t) + noise(),
    y: 0.08 + 0.16 * Math.sin(2 * Math.PI * 5 * t + 1.1) + noise(),
    z: 0.98 + 0.08 * Math.sin(2 * Math.PI * 3 * t) + noise(),
  };
}