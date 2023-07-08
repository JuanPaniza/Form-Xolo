"use client";

import { useEffect, useState, useRef } from "react";

function Stepper({currentStep, steps, errorForm}) {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();
   
  const updateStep = (stepNumber, stepsUpdated) => {
    const newSteps = [...stepsUpdated];
    let count = 0;

    while (count < newSteps.length){
      if(count === stepNumber){
        newSteps[count] = {

          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed:true,

        };
        count++;
      }
      else if(count< stepNumber){
        newSteps[count] = {

          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,

        };
        count++;
      }
      else {
        newSteps[count] = {

          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed:false,

        };
        count ++;
      }
    }
    return newSteps;
  };
   

  useEffect (()=>{

    const stepsState = steps.map((step,index)=>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current );
    setNewStep(current);

  },[steps, currentStep]);

  const displaySteps = newStep.map((step, index)=>(
    <div key= {index} className={index !== newStep.length -1 ? "w-full flex items-center" :"flex items-center"}>
      <div className={`${ errorForm === true ? "relative flex flex-col items-center text-red-600" : "relative flex flex-col items-center text-teal-600"}`}>
        <div className={`rounded-full transition duration-500 ease-in-out border-2 border-grav-300 h-7 w-7 lg:h-9 lg:w-9  flex items-center justify-center py-3 ${step.selected && errorForm === true ? " bg-red-600 text-white font-bold border border-red-600 " : " "} ${step.selected && errorForm === false  ? " bg-green-600 text-white font-bold border border-green-600 " : " "}`}>
          {step.completed ? (
            <span className=" text-white font-bold text-xl">&#10003;</span>
          ) : (
            index + 1
          ) }
        </div>

        <div className= {` absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${step.highlighted ? " text-gray-900 " : " text-gray-400 "}`}>
          {step.description}
        </div>
      </div>
      <div className={`flex-auto border-t-2 trasition duration-500 ease-in-out ${step.completed && errorForm === true ? " border-red-600" : " border-gray-300 " }  ${step.completed && errorForm === false ? " border-green-600" : " border-gray-300 " }`}></div>  
    </div>
  ));
     
        
  return (

    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps} 
    </div>
  );
}

export default Stepper;