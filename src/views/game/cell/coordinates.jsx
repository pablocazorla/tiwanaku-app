import { cx } from "@/utils/cx";
import { useContext } from "react";
import AppContext from "@/context";

const Coordinates = ({ cell, className }) => {
  const { x, y } = cell;

  const { Images } = useContext(AppContext);

  return (
    <div className={cx("flex gap-3 items-center justify-center", className)}>
      <div className="bg-white text-black w-10 aspect-square rounded-full grid place-items-center shadow-[0_1px_8px_rgba(0,0,0,1)] p-0.5">
        <img src={Images.symbols[`r${y}`]} className="w-full h-full" />
      </div>
      <div className="bg-red-500 w-10 aspect-square rounded-full grid place-items-center shadow-[0_1px_8px_rgba(0,0,0,1)] p-0.5">
        <img src={Images.symbols[`c${x}`]} className="w-full h-full" />
      </div>
    </div>
  );
};

export default Coordinates;
