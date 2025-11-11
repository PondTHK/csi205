import RadixCounter from "../w6/RadixCounter";
import Temperatures from "../w6/Temperatures";
import Timer from "../w6/Timer";
import Adder from "../w6/Adder";

export default function ComponentW6() {
  return (
    <div className="container py-3">
      <h2 className="mb-3 display-4 text-center text-white">Components Week 6</h2>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}
      >
        <RadixCounter />
        <Timer />
        <Adder />
      </div>
      <div className="mt-3">
        <Temperatures />
      </div>
    </div>
  );
}
