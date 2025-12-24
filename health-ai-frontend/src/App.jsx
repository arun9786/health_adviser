import { useState } from "react";
import Landing from "./pages/Landing";
import BasicDetails from "./pages/BasicDetails";
import Assessment from "./pages/Assessment";
import Processing from "./pages/Processing";
import Result from "./pages/Result";

export default function App() {
  const [step, setStep] = useState("landing");
  const [basicInfo, setBasicInfo] = useState(null);
  const [payload, setPayload] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <>
      {step === "landing" && (
        <Landing onStart={() => setStep("basic")} />
      )}

      {step === "basic" && (
        <BasicDetails
          onNext={(data) => {
            setBasicInfo(data);
            setStep("assessment");
          }}
        />
      )}

      {step === "assessment" && (
      <Assessment
        basicInfo={basicInfo}
        onBackToBasic={() => setStep("basic")}
        onProcessing={(answers) => {
          setPayload({
            user: {
              name: "Anonymous",
              ...basicInfo
            },
            answers
          });
          setStep("processing");
        }}
      />
    )}


      {step === "processing" && (
        <Processing
          payload={payload}
          onResult={(res) => {
            setResult(res);
            setStep("result");
          }}
        />
      )}

      {step === "result" && (
        <Result
          result={result}
          onRetry={() => {
            // 🔄 reset everything
            setResult(null);
            setPayload(null);
            setBasicInfo(null);

            // 🚀 restart flow
            setStep("basic");
          }}
        />
      )}

    </>
  );
}
