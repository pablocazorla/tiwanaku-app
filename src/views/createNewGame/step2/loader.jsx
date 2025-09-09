import { useEffect, useState, useContext, useRef } from "react";
import AppContext from "@/context";
import I18n from "@/i18n";
import GridGenerator from "@/utils/gridGenerator";
import { CANVAS_LOADER_CONFIG } from "@/config/constants";

const list = Array.from({ length: 5 }, (_, i) => i);

const Loader = ({ setSubStep, setStep }) => {
  const canvasRef = useRef(null);

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
    const { rows, cols, max_cells_revealed, otomasCount } = game;
    if (rows === 0 || cols === 0) {
      return;
    }
    const generateSolution = async () => {
      const generator = new GridGenerator({
        rows,
        cols,
        max_cells_revealed,
        otomasCount,
        canvas: canvasRef.current,
      });
      // Esperamos a que el generador complete su tarea
      const result = await generator.generate();

      if (result.success) {
        setGameGrid(result.grid, result.counts, result.otomas);
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
      {/* <div className="rounded-full w-[80px] aspect-square border-8 border-amber-600 border-t-transparent mx-auto animate-spin"></div> */}
      <div
        className="mx-auto"
        style={{
          maxWidth: `${CANVAS_LOADER_CONFIG.cellSize * game.cols}px`,
        }}
      >
        <canvas
          className="block w-full h-full"
          width={CANVAS_LOADER_CONFIG.cellSize * game.cols}
          height={CANVAS_LOADER_CONFIG.cellSize * game.rows}
          ref={canvasRef}
        ></canvas>
      </div>

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
