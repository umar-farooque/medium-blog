import React from "react";

interface IButtonProps {
  type?: "submit" | "reset";
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}
export default function Button({ children, onClick, className }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-black text-white p-2 font-semibold rounded hover:bg-black/90 ${className}`}
    >
      {children}
    </button>
  );
}
