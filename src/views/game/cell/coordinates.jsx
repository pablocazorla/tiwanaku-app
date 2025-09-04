import { cx } from "@/utils/cx";

const Coordinates = ({ cell, className }) => {
  const { x, y } = cell;
  return (
    <div className={cx("flex gap-3 items-center justify-center", className)}>
      <div className="bg-white text-black w-8 aspect-square rounded-full grid place-items-center shadow-[0_1px_8px_rgba(0,0,0,1)]">
        {y}
      </div>
      <div className="bg-red-500 w-8 aspect-square rounded-full grid place-items-center shadow-[0_1px_8px_rgba(0,0,0,1)]">
        {x}
      </div>
    </div>
  );
};

export default Coordinates;
