import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((p) => p + 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running]);

  const pad2 = (n: number) => String(n).padStart(2, "0");
  const formatTime = (secs: number) => {
    if (secs < 60) return `${secs}s`;
    const m = Math.floor(secs / 60), s = secs % 60;
    if (secs < 3600) return `${m}m ${pad2(s)}s`;
    const h = Math.floor(secs / 3600), mm = Math.floor((secs % 3600) / 60);
    if (secs < 86400) return `${h}h ${pad2(mm)}m ${pad2(s)}s`;
    const d = Math.floor(secs / 86400), hh = Math.floor((secs % 86400) / 3600), mmm = Math.floor((secs % 3600) / 60);
    return `${d}d ${pad2(hh)}h ${pad2(mmm)}m ${pad2(s)}s`;
  };

  const buttons = running
    ? [
        { text: "Reset", variant: "danger", icon: "bi-arrow-counterclockwise", onClick: () => { setRunning(false); setSeconds(0); } },
        { text: "Pause", variant: "warning", icon: "bi-pause-fill", onClick: () => setRunning(false) },
      ]
    : [
        { text: "Reset", variant: "danger", icon: "bi-arrow-counterclockwise", onClick: () => { setRunning(false); setSeconds(0); } },
        { text: "Run", variant: "success", icon: "bi-play-fill", onClick: () => setRunning(true) },
      ];

  return (
    <div
      className="border border-2 border-black rounded-3 p-3 mt-3 mx-auto bg-dark text-white"
      style={{ width: "100%", maxWidth: 360 }}
    >
      <div className="text-center fw-bold fs-5 mb-2 text-white">TIMER</div>
      <div className="text-center border rounded py-2 mb-3 bg-light">
        <span className="fs-2 fw-bold font-monospace text-dark">{formatTime(seconds)}</span>
      </div>
      <div className="d-flex justify-content-center gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.text}
            className={`btn btn-${btn.variant} fw-bold px-4 d-flex align-items-center gap-2`}
            onClick={btn.onClick}
          >
            <i className={`bi ${btn.icon}`} /> {btn.text}
          </button>
        ))}
      </div>
    </div>
  );
}
