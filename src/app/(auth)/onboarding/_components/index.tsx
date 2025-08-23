"use client";

import { MultiStepLoader } from "@/components/global/step-loader";
import React, { useEffect, useState } from "react";
import { finalizeOnboardingAction } from "@/actions/reg";
import { delay } from "@/lib/utils";
import { useRouter } from "next/navigation";

type StepState = {
  text: string;
  state: boolean;
  verified?: string;
};

const Onboarding = () => {
  const [steps, setSteps] = useState<StepState[]>([
    { text: "Verifying User", state: false },
  ]);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      setSteps([{ text: "User Verified", state: true }]);
      await delay(500);
      setSteps([
        { text: "User Verified", state: true },
        { text: "Store is Being Set Up", state: false },
      ]);
      const result = await finalizeOnboardingAction();
      if (result.ok) {
        await delay(500);
        setSteps([
          { text: "User Verified", state: true },
          { text: "Store is Ready", state: true },
        ]);
        await delay(500);
        setSteps([
          { text: "User Verified", state: true },
          { text: "Store is Ready", state: true },
          { text: "Redirecting...", state: false },
        ]);
        await delay(1000);
        router.push(`/dashboard`);
      } else {
        await delay(500);
        setSteps([
          { text: "User Verified", state: true },
          { text: "Failed to Set Up Store", state: false },
        ]);
      }
    };
    verifyUser();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <MultiStepLoader steps={steps} />
    </div>
  );
};

export default Onboarding;
