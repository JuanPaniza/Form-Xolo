function Stepper({currentStep, steps}) { 
  const tabState = steps.map((step, index) => ({
    description: step,
    highlighted: index === currentStep,
    completed: index < currentStep,
  }));
  const displaySteps = tabState.map((step, index)=>(
    <div key={index} className={index === tabState.length - 1 ? "flex items-center" : "w-full flex items-center"}>
      <div className= "relative flex flex-col items-center text-teal-600">
        <div className={`rounded-full transition duration-500 ease-in-out border-2 border-grav-300 h-7 w-7 lg:h-9 lg:w-9  flex items-center justify-center py-3 ${step.completed && " bg-green-600 text-white font-bold border border-green-600 "}`}>
          {step.completed ? (
            <span className=" text-white font-bold text-xl">&#10003;</span>
          ) : (
            index + 1
          ) }
        </div>

        <div className= {` absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${step.completed ? " text-gray-900 " : " text-gray-400 "}`}>
          {step.description}
        </div>
      </div>
      <div className={`flex-auto border-t-2 trasition duration-500 ease-in-out  ${step.completed ? " border-green-600" : " border-gray-300 " }`}></div>  
    </div>
  ));     
  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps} 
    </div>
  );
}

export default Stepper;