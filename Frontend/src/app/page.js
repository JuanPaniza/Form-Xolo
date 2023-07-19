"use client";
import { useState } from "react";
import Stepper from "@/Components/Stepper";
import FormSection from "@/Components/FormSection";
import Sign from "@/Components/Sign";
import Status from "@/Components/Status";
import {steps} from "./settings";

  const tabs = steps.map(step => step.name);
  tabs.push("Final");


export default function Home() {
  const [currentStep, setCurrentStep ]= useState(0);
  const [requestStatus, setRequestStatus] = useState("IDLE"); // Use ENUM - IDLE, SENT, SUCCESS, FAILED
  const [answers, setAnswers] = useState({
    hasAllergies: undefined,
    allergies: undefined,
    isInMaternity: undefined,
    hasADisease: undefined,
    disease: undefined,
    hasAMedication: undefined,
    medication: undefined,
    hasAcneMedication: undefined,
    hasAMedicalDevice: undefined,
    hasASkinTreatment: undefined,
    skinTreatment: undefined,
    isUsingSkinProducts: undefined,
    skinProducts: undefined,
    fullName: undefined,
    signature: undefined,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setRequestStatus("LOADING");
    setCurrentStep(4);
    try {
      const response = await fetch("http://localhost:8080/consents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        setRequestStatus("SUCCESS")
      } else {
        setRequestStatus("FAILED")
      }
    } catch (error) {
      setRequestStatus("FAILED")
    }
  };

  const goBack = () => {
    if (currentStep >= 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goNext = () => {
    if (currentStep <= steps.length + 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function displayStep(step) {
    switch (step) {
    case 0:
    case 1:     
    case 2:
      return <FormSection
        questions={steps[step].questions}
        answers={answers}
        setAnswers={setAnswers}
        step={step}
        goBack={goBack}
        goNext={goNext}
      />;
    case 3:
      return <Sign
        goBack={goBack}
        goNext={goNext}
        answers={answers}
        setAnswers={setAnswers}
        handleSubmit={handleSubmit}
      />;
    case 4:
      return <Status 
        goBack={goBack}
        requestStatus={requestStatus}
      />;
    }
  }
  
  return (
    <main className="relative form">
      <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
        
        <Stepper
          currentStep={currentStep}
          steps={tabs}
        />
        
        <div className="mt-10 mb-0 p-10">                    
          <h1 className="uppercase font-extrabold block mt-3 text-lg text-neutral-600 text-center mb-9">
            Please answer the questions to the best of your knowledge
          </h1>                                               
          <form onSubmit={handleSubmit}>
            {displayStep(currentStep)}
          </form>
        </div>                    
      </div>
    </main>
  );
}