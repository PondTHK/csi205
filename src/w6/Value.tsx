import { useState } from "react";

type ValueType = "int" | "real";

export interface ValueProps {
  name?: string;
  initialValue?: number;
  type?: ValueType;              // ค่าแสดงผล: int/real
  value?: number;                // controlled
  onValueChange?: (v: number) => void; // controlled callback
}

export default function Value({
  name = "Value",
  initialValue = 0,
  type = "int",
  value,
  onValueChange,
}: ValueProps) {
  const [internalValue, setInternalValue] = useState<number>(initialValue);
  const controlled = value !== undefined;
  const current = controlled ? (value as number) : internalValue;

  const change = (v: number) => {
    if (controlled) onValueChange?.(v);
    else setInternalValue(v);
  };

  return (
    <div
      className="border border-black border-2 rounded-4 mt-3 p-2 bg-white"
      style={{ width: "100%" }}
    >
      <h1 className="text-center fs-5 m-0 text-dark">{name}</h1>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <button className="btn btn-danger" onClick={() => change(current - 1)}>
          &minus;
        </button>
        <span className="font-monospace fs-4 text-dark">
          {type === "real" ? Number(current).toFixed(2) : Math.round(current)}
        </span>
        <button className="btn btn-success" onClick={() => change(current + 1)}>
          +
        </button>
      </div>
    </div>
  );
}
