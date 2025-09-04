import Button from "@/components/button";
import I18n from "@/i18n";

import sandImg from "@/assets/img/sand.webp";
import dirtImg from "@/assets/img/dirt.webp";
import grassImg from "@/assets/img/grass.webp";
import rockImg from "@/assets/img/rock.webp";
//
import fruitImg_1 from "@/assets/img/f-1.webp";
import fruitImg_2 from "@/assets/img/f-2.webp";
import fruitImg_3 from "@/assets/img/f-3.webp";
import fruitImg_4 from "@/assets/img/f-4.webp";
import fruitImg_5 from "@/assets/img/f-5.webp";

const fieldImgs = {
  sand: sandImg,
  dirt: dirtImg,
  grass: grassImg,
  rock: rockImg,
};

const fruitImgs = {
  1: fruitImg_1,
  2: fruitImg_2,
  3: fruitImg_3,
  4: fruitImg_4,
  5: fruitImg_5,
};

const Revealed = ({ cell, closeModal }) => {
  const { field, fruit } = cell;

  return (
    <div className="pt-3">
      <div className="w-[140px] mx-auto relative">
        <img src={fieldImgs[field]} alt={field} className="w-full h-full" />
        <img
          src={fruitImgs[fruit]}
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
