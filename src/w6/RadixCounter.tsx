import { useState } from "react";

export default function RadixCounter() {
  const MAX_VALUE = 0xfff; // 4095
  const [value, setValue] = useState<number>(0);

  const plus = () => setValue((v) => (v >= MAX_VALUE ? 0 : v + 1));
  const minus = () => setValue((v) => (v <= 0 ? MAX_VALUE : v - 1));
  const reset = () => setValue(0);

  const toHex = (v: number) => v.toString(16).toUpperCase().padStart(3, "0");
  const toOct = (v: number) => v.toString(8).padStart(4, "0");
  const toBin = (v: number) => v.toString(2).padStart(12, "0");

  return (
    <div
      className="border border-2 border-black rounded-3 p-3 mt-3 mx-auto bg-dark text-white"
      style={{ width: "100%", maxWidth: 400 }}
    >
      <div className="text-center fw-bold text-white">RAXDIX COUNTER</div>
      <div className="d-flex justify-content-between">
        <div className="text-center">
          <div className="fw-bold text-white">[HEX]</div>
          <div className="font-monospace text-dark bg-white rounded p-1">{toHex(value)}</div>
        </div>
        <div className="text-center">
          <div className="fw-bold text-white">[DEX]</div>
          <div className="font-monospace text-dark fw-bold bg-white rounded p-1">
            {value.toString().padStart(4, "0")}
          </div>
        </div>
        <div className="text-center">
          <div className="fw-bold text-white">[OCT]</div>
          <div className="font-monospace text-dark bg-white rounded p-1">{toOct(value)}</div>
        </div>
        <div className="text-center">
          <div className="fw-bold text-white">[BIN]</div>
          <div className="font-monospace text-dark bg-white rounded p-1">{toBin(value)}</div>
        </div>
      </div>

      <div className="mt-3 d-flex justify-content-around">
        <button className="btn btn-danger" onClick={minus}>
          &minus;
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          RESET
        </button>
        <button className="btn btn-success" onClick={plus}>
          +
        </button>
      </div>
    </div>
  );
}
