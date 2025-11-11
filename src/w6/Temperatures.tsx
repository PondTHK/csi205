import { useState } from "react";
import Value from "./Value";

export default function Temperatures() {
  const [celsius, setCelsius] = useState<number>(25);

  const fahrenheit = celsius * 9 / 5 + 32;
  const kelvin = celsius + 273.15;

  const fmt = (n: number) =>
    Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const onC = (v: number) => setCelsius(v);
  const onF = (v: number) => setCelsius((v - 32) * 5 / 9);
  const onK = (v: number) => setCelsius(v - 273.15);

  return (
    <div
      className="border border-2 border-black rounded-3 p-3 mt-3 mx-auto bg-dark text-white"
      style={{ width: "fit-content" }}
    >
      <div className="text-center fw-bold fs-5 mb-2 text-white">TEMPERATURES</div>

      <div className="d-flex justify-content-between mb-3">
        <div className="badge bg-white text-dark rounded-pill px-3 py-2 fs-6 fw-bold w-100 mx-1 text-center">
          {fmt(celsius)} °C
        </div>
        <div className="badge bg-white text-dark rounded-pill px-3 py-2 fs-6 fw-bold w-100 mx-1 text-center">
          {fmt(fahrenheit)} °F
        </div>
        <div className="badge bg-white text-dark rounded-pill px-3 py-2 fs-6 fw-bold w-100 mx-1 text-center">
          {fmt(kelvin)} °K
        </div>
      </div>

      <div className="d-flex justify-content-between gap-2">
        <Value name="CELSIUS" value={celsius} onValueChange={onC} type="real" />
        <Value name="FAHRENHEIT" value={fahrenheit} onValueChange={onF} type="real" />
        <Value name="KELVIN" value={kelvin} onValueChange={onK} type="real" />
      </div>
    </div>
  );
}
