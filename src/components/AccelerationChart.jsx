function pathFor(data, key, width, height, min, max) {
  if (!data.length) return "";
  return data.map((p, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * width;
    const y = height - ((p[key] - min) / (max - min)) * height;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

export default function AccelerationChart({ data }) {
  const width = 900, height = 300, min = -0.35, max = 1.2;
  const visible = data.slice(-100);
  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="chart-svg">
        {[0, .25, .5, .75, 1].map((v) => (
          <line key={v} x1="0" x2={width} y1={height*v} y2={height*v} className="grid-line" />
        ))}
        <path d={pathFor(visible, "x", width, height, min, max)} className="line-x" />
        <path d={pathFor(visible, "y", width, height, min, max)} className="line-y" />
        <path d={pathFor(visible, "z", width, height, min, max)} className="line-z" />
      </svg>
      <div className="axis-label y-top">1.2 g</div>
      <div className="axis-label y-mid">0.4 g</div>
      <div className="axis-label y-bottom">-0.35 g</div>
      <div className="chart-legend">
        <span><i className="legend-x"/>X Axis</span>
        <span><i className="legend-y"/>Y Axis</span>
        <span><i className="legend-z"/>Z Axis</span>
      </div>
    </div>
  );
}