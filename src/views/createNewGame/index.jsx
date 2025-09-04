import I18n from "@/i18n";
import { useState, useContext, useEffect } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import AppContext from "@/context";

const CreateNewGame = () => {
  const { resetGame } = useContext(AppContext);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const [step, setStep] = useState(1);

  return (
    <section>
      {step === 1 && <Step1 setStep={setStep} />}
      {step === 2 && <Step2 setStep={setStep} />}
      {step === 3 && <Step3 setStep={setStep} />}
    </section>
  );
};

export default CreateNewGame;
