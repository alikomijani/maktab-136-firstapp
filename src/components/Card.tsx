import clsx from "clsx";
import type { ReactNode } from "react";
type CardProps = {
  className?: string;
  children?: ReactNode;
};

export default function Card({ className, children }: CardProps) {
  return (
    <div className={clsx("rounded-2xl border border-gray-300 p-3", className)}>
      {children}
    </div>
  );
}
