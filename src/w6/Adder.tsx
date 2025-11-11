import { useState } from "react";
import Value from "./Value";

export default function Adder() {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(1);

  return (
    <div
      className="border border-2 border-black rounded-4 mt-3 p-2 mx-auto bg-dark text-white"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-center fs-5 m-0 text-white">ADDER</h1>
      <div className="d-flex justify-content-between align-items-center my-2 gap-2">
        <div className="badge bg-white text-dark">A = {a}</div>
        <div className="badge bg-white text-dark">A + B = {a + b}</div>
        <div className="badge bg-white text-dark">B = {b}</div>
      </div>
      <div className="d-flex gap-2">
        <Value name="A" value={a} onValueChange={setA} />
        <Value name="B" value={b} onValueChange={setB} />
      </div>
    </div>
  );
}
