import { useEffect, useState, useContext } from "react";
import AppContext from "@/context";
import I18n from "@/i18n";
import GridGenerator from "@/utils/gridGenerator";

const list = Array.from({ length: 5 }, (_, i) => i);

const Loader = ({ setSubStep, setStep }) => {
  const { game, setGameGrid } = useContext(AppContext);

  const [numSelected, setNumSelected] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setNumSelected((prevNumSelected) => {
        const nextNumSelected = prevNumSelected + 1;
        return nextNumSelected % list.length;
      });
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const { rows, cols, max_cells_revealed } = game;
    if (rows === 0 || cols === 0) {
      return;
    }
    const generateSolution = async () => {
      const generator = new GridGenerator({ rows, cols, max_cells_revealed });
      // Esperamos a que el generador complete su tarea
      const result = await generator.generate();

      if (result.success) {
        setGameGrid(result.grid, result.counts);
        setStep(3);
      } else {
        setSubStep(1);
      }
    };

    // Ejecutar la función asincrónica
    generateSolution();
  }, [setSubStep, setStep, game, setGameGrid]);

  return (
    <div className="fade-in">
      <div className="rounded-full w-[80px] aspect-square border-8 border-amber-600 border-t-transparent mx-auto animate-spin"></div>
      {list.map((num) => {
        if (numSelected === num) {
          return (
            <p key={num} className="text-center pt-5 fade-in">
              <I18n id={`createNewGame.loading.${num}`} />
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Loader;
