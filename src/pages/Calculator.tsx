import { useEffect, useMemo, useState } from "react";

type State = "S1" | "S2" | "S3" | "S4";
type Op = "" | "+" | "-";

export default function Calculator() {
  const [screen, setScreen] = useState<string>("0");
  const [state, setState] = useState<State>("S1");
  const [lastOperator, setLastOperator] = useState<Op>("");
  const [firstOperand, setFirstOperand] = useState<string>("");
  const [lastOperand, setLastOperand] = useState<string>("");

  const isPlusActive = useMemo(() => lastOperator === "+", [lastOperator]);
  const isMinusActive = useMemo(() => lastOperator === "-", [lastOperator]);

  const clamp9 = (s: string) => (s.length <= 9 ? s : s.slice(0, 9));

  const numClick = (num: number) => {
    if (state === "S1") {
      setScreen(String(num));
      setState("S2");
    } else if (state === "S2") {
      setScreen((prev) => clamp9(prev + String(num)));
    } else if (state === "S3") {
      setFirstOperand(screen);
      setScreen(String(num));
      setState("S4");
    } else if (state === "S4") {
      setScreen((prev) => clamp9(prev + String(num)));
    }
  };

  const opClick = (op: Op) => {
    if (state === "S1") return; 
    switch (state) {
      case "S2":
        setLastOperator(op);
        setState("S3");
        break;
      case "S3":
      case "S4":
        setLastOperator(op);
        break;
    }
  };

  const equalClick = () => {
    if (!lastOperator) return;

    const left = Number(firstOperand || screen);
    const right = Number(lastOperand || screen);

    let result = 0;
    switch (lastOperator) {
      case "+":
        result = left + right;
        break;
      case "-":
        result = left - right;
        break;
    }
    const s = clamp9(String(result));

    setScreen(s);
    setFirstOperand(String(result));
    setLastOperand(String(right));
    setState("S2");
  };

  const ceClick = () => {
    if (state === "S1") return;
    setScreen("0");
    setLastOperator("");
    setFirstOperand("");
    setLastOperand("");
    setState("S1");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { key } = e;
      if (key >= "0" && key <= "9") {
        numClick(parseInt(key, 10));
      } else if (key === "+" || key === "-") {
        opClick(key as Op);
      } else if (key === "Enter" || key === "=") {
        equalClick();
      } else if (key === "Escape") {
        ceClick();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, state, lastOperator, firstOperand, lastOperand]);


  const BBtn: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }
  > = ({ variant = "secondary", className = "", ...rest }) => (
    <button {...rest} className={`btn btn-${variant} ${className}`} />
  );

  const plusVariant = isPlusActive ? "warning" : "success";
  const minusVariant = isMinusActive ? "warning" : "success";

  return (
    <div className="container my-5">
      <div className="mx-auto border border-3 rounded-4 shadow-sm p-3" style={{ maxWidth: 480, background: "#ddd" }}>
        <div className="bg-info-subtle rounded-3 px-4 py-3 mb-3">
          <h1 className="m-0 text-end text-dark" style={{ fontSize: 36 }}>{screen}</h1>
        </div>

        <div className="bg-light rounded-3 p-3">
          <div className="row row-cols-5 g-2">
            <div className="col"><BBtn variant="success" disabled>MC</BBtn></div>
            <div className="col"><BBtn variant="success" disabled>MR</BBtn></div>
            <div className="col"><BBtn variant="success" disabled>M+</BBtn></div>
            <div className="col"><BBtn variant="success" disabled>M-</BBtn></div>
            <div className="col"><BBtn variant="danger" onClick={ceClick}>CE</BBtn></div>

            {[7,8,9].map(n=>(
              <div className="col" key={n}>
                <BBtn variant="primary" onClick={()=>numClick(n)}>{n}</BBtn>
              </div>
            ))}
            <div className="col"><BBtn variant="success" disabled>÷</BBtn></div>
            <div className="col"><BBtn variant="success" disabled>√</BBtn></div>

            {[4,5,6].map(n=>(
              <div className="col" key={n}>
                <BBtn variant="primary" onClick={()=>numClick(n)}>{n}</BBtn>
              </div>
            ))}
            <div className="col"><BBtn variant="success" disabled>x</BBtn></div>
            <div className="col"><BBtn variant="success" disabled>%</BBtn></div>

            {[1,2,3].map(n=>(
              <div className="col" key={n}>
                <BBtn variant="primary" onClick={()=>numClick(n)}>{n}</BBtn>
              </div>
            ))}
            <div className="col">
              <BBtn variant={minusVariant} onClick={()=>opClick("-")} aria-label="minus">&mdash;</BBtn>
            </div>
            <div className="col"><BBtn variant="success" disabled>1/x</BBtn></div>

            <div className="col"><BBtn variant="primary" onClick={()=>numClick(0)}>0</BBtn></div>
            <div className="col"><BBtn variant="primary" disabled>.</BBtn></div>
            <div className="col"><BBtn variant="primary" disabled>+/-</BBtn></div>
            <div className="col">
              <BBtn variant={plusVariant} onClick={()=>opClick("+")} aria-label="plus">+</BBtn>
            </div>
            <div className="col"><BBtn variant="success" onClick={equalClick}>=</BBtn></div>
          </div>
        </div>
      </div>
    </div>
  );
}
