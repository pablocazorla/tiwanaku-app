import { useContext, useEffect, useState } from "react";
import AppContext from "@/context";
import Button from "@/components/button";
import I18n from "@/i18n";

import sandImg from "@/assets/img/sand.webp";
import dirtImg from "@/assets/img/dirt.webp";
import grassImg from "@/assets/img/grass.webp";
import rockImg from "@/assets/img/rock.webp";
import fieldImg from "@/assets/img/field.webp";
import { cx } from "@/utils/cx";

const fieldImgs = {
  sand: sandImg,
  dirt: dirtImg,
  grass: grassImg,
  rock: rockImg,
};

const ToRevealField = ({ cell, closeModal }) => {
  const { updateCell } = useContext(AppContext);

  const { field } = cell;

  const [revealed, setRevealed] = useState(false);

  const [alreadyRevealed, setAlreadyRevealed] = useState(false);

  useEffect(() => {
    let timer = null;
    if (revealed) {
      timer = setTimeout(() => {
        setAlreadyRevealed(true);
      }, 700);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [revealed]);

  return (
    <div className="pt-5 field-to-reveal-container">
      <div
        className={cx(
          "w-[140px] aspect-square mx-auto relative field-to-reveal",
          {
            "field-revealed": revealed,
          }
        )}
      >
        <img
          src={fieldImg}
          alt={"field"}
          className="top-0 left-0 absolute w-full h-full field-front"
        />
        <img
          src={fieldImgs[field]}
          alt={field}
          className="top-0 left-0 absolute w-full h-full field-back"
        />
      </div>
      <nav className="pt-5 flex flex-col gap-4 items-center min-h-16">
        {!revealed && (
          <Button
            onClick={() => {
              setRevealed(true);
              updateCell({ ...cell, visibleField: true });
            }}
          >
            <I18n id="btn.revealField" />
          </Button>
        )}
        {revealed && alreadyRevealed && (
          <Button
            variant="secondary-outline"
            className="fade-in"
            size="sm"
            onClick={closeModal}
          >
            <I18n id="btn.close" />
          </Button>
        )}
      </nav>
    </div>
  );
};

export default ToRevealField;
