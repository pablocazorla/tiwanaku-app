import { useContext, useEffect, useState } from "react";
import AppContext from "@/context";
import { cx } from "@/utils/cx";

const Logo = ({ className }) => {
  const { Images } = useContext(AppContext);

  return (
    <div className={cx("max-w-[70%]  mx-auto text-center", className)}>
      <img src={Images.shared.logo} alt="Tiwanaku" className="w-full h-full" />
    </div>
  );
};

export default Logo;
