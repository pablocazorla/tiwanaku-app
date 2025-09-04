import { cx } from "@/utils/cx";

const Logo = ({ className }) => {
  return (
    <div
      className={cx(
        "max-w-64 aspect-square rounded-2xl bg-amber-600 mx-auto text-center",
        className
      )}
    >
      Tiwanaku
    </div>
  );
};

export default Logo;
