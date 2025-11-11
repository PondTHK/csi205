import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
}>;

export default function Card({
  children,
  className = "",
  bodyClassName = "",
  style,
}: CardProps) {
  return (
    <div className={`card shadow-sm ${className}`} style={style}>
      <div className={`card-body ${bodyClassName}`}>{children}</div>
    </div>
  );
}
