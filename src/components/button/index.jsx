import { cx } from "@/utils/cx";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled,
  className,
  ...rest
}) => {
  return (
    <button
      className={cx(
        " text-white font-semibold uppercase px-4 py-2 rounded-lg",
        {
          "shadow-md cursor-pointer hover:opacity-80": !disabled,
          "opacity-20 cursor-default": disabled,
          //
          "bg-amber-700": variant === "primary",
          "border border-amber-900/60": variant === "secondary-outline",
          "shadow-none": variant === "transparent",
          //
          "text-xs": size === "sm",
        },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
