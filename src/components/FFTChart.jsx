export default function FFTChart({ running }) {
  const bars = Array.from({ length: 72 }, (_, i) => {
    const f = i * 2;
    const peak = Math.exp(-Math.pow((f - 50) / 7, 2)) * 0.9;
    const harmonic = Math.exp(-Math.pow((f - 100) / 10, 2)) * 0.42;
    const base = 0.05 + ((i * 17) % 11) / 220;
    return { f, a: Math.min(1, base + peak + harmonic) };
  });
  const maxH = 150;
  return (
    <div className="fft-wrap">
      <div className="fft-bars">
        {bars.map((b) => (
          <div key={b.f} className="fft-column" title={`${b.f} Hz`}>
            <div className="fft-bar" style={{ height: `${b.a * maxH}px` }} />
          </div>
        ))}
      </div>
      <div className="fft-axis"><span>0 Hz</span><span>50 Hz</span><span>100 Hz</span><span>150 Hz</span></div>
      <div className="dominant"><span className="pulse" /> Dominant frequency <strong>50.0 Hz</strong></div>
    </div>
  );
}