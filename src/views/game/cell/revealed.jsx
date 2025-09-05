import { useContext } from "react";
import AppContext from "@/context";
import Button from "@/components/button";
import I18n from "@/i18n";

const Revealed = ({ cell, closeModal }) => {
  const { field, fruit } = cell;

  const { Images } = useContext(AppContext);

  return (
    <div className="pt-3">
      <div className="w-[140px] mx-auto relative">
        <img src={Images.fields[field]} alt={field} className="w-full h-full" />
        <img
          src={Images.fruits[fruit]}
          alt={fruit}
          className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex justify-center pt-4">
        <Button variant="secondary-outline" size="sm" onClick={closeModal}>
          <I18n id="btn.close" />
        </Button>
      </div>
    </div>
  );
};

export default Revealed;
