import I18n from "@/i18n";
import Button from "@/components/button";

const Failed = ({ setSubStep }) => {
  return (
    <div className="fade-in">
      <p className="text-center mb-1">
        <I18n id="createNewGame.failed.1" />
      </p>
      <p className="text-center mb-5">
        <I18n id="createNewGame.failed.2" />
      </p>
      <div className="flex justify-center">
        <Button onClick={() => setSubStep(0)}>
          <I18n id="btn.retry" />
        </Button>
      </div>
    </div>
  );
};

export default Failed;
