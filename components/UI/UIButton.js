import React from "react";
const variantClasses = {
  danger: "bg-red-500 hover:bg-red-400",
  success: "bg-green-500 hover:bg-green-400",
  disabled: "bg-dark-800",
  neutral: "bg-dark-600 hover:bg-dark-700",
  warning: "",
};

const sizeClasses = {
  sm: "py-2 px-4",
  md: "py-3 px-4",
  lg: "py-4 px-6",
};
export default function UIButton({
  children,
  className,
  variant,
  size,
  ...props
}) {
  return (
    <button
      {...props}
      className={`rounded flex flex-row items-center ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
