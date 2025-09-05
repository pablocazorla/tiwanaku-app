import { useRef, useEffect, useContext, useMemo } from "react";
import AppContext from "@/context";
import Button from "@/components/button";
import Modal from "@/components/modal";
import I18n from "@/i18n";
import { IconCopy } from "@/components/icons/copy";
import { IconShare } from "@/components/icons/share";
import QRCode from "qrcode";
import GameCompressor from "@/utils/gameCompressor";

const ShareGameContent = () => {
  const { game, setShowShareGame } = useContext(AppContext);

  const url = useMemo(() => {
    return `${window.location.origin}/?game=${GameCompressor.compressGame(
      game
    )}`;
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (url) {
      QRCode.toCanvas(canvasRef.current, url, function () {});
    }
  }, [url]);

  return (
    <div>
      <nav className="flex flex-col gap-4 px-4">
        <p className="text-center">
          <I18n id="p.share.1" />
        </p>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
          className="flex items-center justify-center gap-2"
        >
          <IconCopy />
          <I18n id="btn.share.copyGame" />
        </Button>
        <Button
          variant="share"
          onClick={() => {
            navigator.share({
              title: "Tiwanaku App - Share Game",
              url,
            });
          }}
          className="flex items-center justify-center gap-2"
        >
          <IconShare />
          <I18n id="btn.share.shareGame" />
        </Button>
        <div className="border-t border-amber-700/60 pt-3">
          <p className="text-center mb-2">
            <I18n id="p.share.2" />
          </p>
          <div className="aspect-square w-full max-w-[240px] mx-auto bg-white shadow-[0_2px_10px_rgba(0,0,0,1)]">
            <canvas
              className="bg-white block w-full h-full qr-code"
              ref={canvasRef}
              width="240"
              height="240"
            />
          </div>
        </div>
      </nav>
      <div className="text-center pt-3">
        <Button
          variant="secondary-outline"
          onClick={() => {
            setShowShareGame(false);
          }}
        >
          <I18n id="btn.close" />
        </Button>
      </div>
    </div>
  );
};

const ShareGame = () => {
  const { showShareGame, setShowShareGame } = useContext(AppContext);

  return (
    <>
      <Modal
        isOpen={showShareGame}
        onClose={() => setShowShareGame(false)}
        maxWidth={400}
      >
        <ShareGameContent />
      </Modal>
    </>
  );
};

export default ShareGame;
