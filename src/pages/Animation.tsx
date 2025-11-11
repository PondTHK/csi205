import { useEffect, useMemo, useRef, useState } from "react";

type BallType = "non" | "Basketball" | "Football" | "Volleyball" | "Human" | "Cartoon";

const assetBase = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const resolveImg = (file: string) => `${assetBase}img/${file}`;

export default function Animation() {
  const [fieldWidth] = useState(800);
  const [fieldHeight] = useState(400);
  const [ballSize] = useState(150);
  const [vX] = useState(5);
  const [vY] = useState(5);

  const maxX = fieldWidth - ballSize;
  const maxY = fieldHeight - ballSize;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [running, setRunning] = useState(false);
  const [ballType, setBallType] = useState<BallType>("non");

  const [rotationAngle, setRotationAngle] = useState(0);
  const [rotationSpeed] = useState(5);
  const [rotationDirection, setRotationDirection] = useState(1);

  const ballRef = useRef<HTMLDivElement>(null);

  const step = () => {
    setRotationAngle((a) => a + rotationSpeed * rotationDirection);

    setX((prevX) => {
      let nx = prevX + (goRight ? vX : -vX);
      if (nx >= maxX) {
        nx = maxX;
        setGoRight(false);
        setRotationDirection((d) => -d);
      } else if (nx <= 0) {
        nx = 0;
        setGoRight(true);
        setRotationDirection((d) => -d);
      }
      return nx;
    });

    setY((prevY) => {
      let ny = prevY + (goDown ? vY : -vY);
      if (ny >= maxY) {
        ny = maxY;
        setGoDown(false);
        setRotationDirection((d) => -d);
      } else if (ny <= 0) {
        ny = 0;
        setGoDown(true);
        setRotationDirection((d) => -d);
      }
      return ny;
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (running) step();
    }, 25);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, goRight, goDown, rotationSpeed, rotationDirection, maxX, maxY]);

  
  useEffect(() => {
    const el = ballRef.current;
    if (!el) return;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = `rotate(${rotationAngle}deg)`;

    if (ballType === "non") {
      el.style.backgroundImage = "none";
      el.style.backgroundColor = "#f0f0f0";
      el.style.border = "1px solid #000";
    } else if (ballType === "Cartoon") {
      el.style.backgroundImage = `url('${resolveImg("Cartoon.png")}')`;
      el.style.backgroundColor = "#f0f0f0";
      el.style.border = "1px solid #000";
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
    } else {
      el.style.backgroundImage = `url('${resolveImg(`${ballType}.png`)}')`;
      el.style.backgroundColor = "transparent";
      el.style.border = "none";
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
    }
  }, [x, y, rotationAngle, ballType]);

  useEffect(() => {
    const keyMap: Record<string, () => void> = {
      " ": () => setRunning((r) => !r),
      "0": () => setBall("non"),
      "1": () => setBall("Basketball"),
      "2": () => setBall("Football"),
      "3": () => setBall("Volleyball"),
      "4": () => setBall("Human"),
      "5": () => setBall("Cartoon"),
    };
    const onKey = (e: KeyboardEvent) => {
      if (keyMap[e.key]) keyMap[e.key]();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const setBall = (b: BallType) => setBallType(b);

  const btnClass = (b: BallType) =>
    b === ballType ? { backgroundColor: "#0d6efd", color: "#fff" } : { };

  const runBtnLabel = useMemo(() => (running ? "Pause" : "Run"), [running]);
  const runBtnStyle = useMemo(
    () => ({ backgroundColor: running ? "#dc3545" : "#198754", color: "#fff" }),
    [running]
  );

  return (
    <div
      style={{
        margin: "16px auto",
        width: "fit-content",
        padding: 10,
        backgroundColor: "#f0f0f0",
        border: "1px solid #000",
      }}
    >
      <div
        id="field"
        style={{
          border: "1px solid #000",
          width: fieldWidth,
          height: fieldHeight,
          marginBottom: "1rem",
          backgroundImage: `url('${resolveImg("bg.jpg")}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          id="ball"
          ref={ballRef}
          style={{
            width: ballSize,
            height: ballSize,
            borderRadius: "50%",
            position: "absolute",
            left: 0,
            top: 0,
            backgroundColor: "#f0f0f0",
            border: "1px solid #000",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <button onClick={() => setRunning((r) => !r)} style={{ ...runBtnStyle, padding: "8px 12px", border: "none", borderRadius: 6 }}>
          {runBtnLabel}
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setBall("non")}        style={{ padding: "8px 12px", borderRadius: 6, ...btnClass("non") }}>non</button>
          <button onClick={() => setBall("Basketball")} style={{ padding: "8px 12px", borderRadius: 6, ...btnClass("Basketball") }}>BasketBall</button>
          <button onClick={() => setBall("Football")}   style={{ padding: "8px 12px", borderRadius: 6, ...btnClass("Football") }}>FootBall</button>
          <button onClick={() => setBall("Volleyball")} style={{ padding: "8px 12px", borderRadius: 6, ...btnClass("Volleyball") }}>VolleyBall</button>
          <button onClick={() => setBall("Human")}      style={{ padding: "8px 12px", borderRadius: 6, ...btnClass("Human") }}>Human</button>
          <button onClick={() => setBall("Cartoon")}    style={{ padding: "8px 12px", borderRadius: 6, ...btnClass("Cartoon") }}>Cartoon</button>
        </div>
      </div>
    </div>
  );
}
