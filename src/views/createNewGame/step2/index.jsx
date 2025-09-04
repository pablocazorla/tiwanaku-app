import { useState } from "react";
import Loader from "./loader";
import Failed from "./failed";

const Step2 = ({ setStep }) => {
  const [subStep, setSubStep] = useState(0);

  if (subStep === 0) {
    return <Loader setSubStep={setSubStep} setStep={setStep} />;
  } else {
    return <Failed setSubStep={setSubStep} />;
  }
};

export default Step2;
