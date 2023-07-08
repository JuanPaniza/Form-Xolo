"use client";
import Stepper from "@/Components/Stepper";
import Docuno from "@/Components/steps/Docuno";
import Docdos from "@/Components/steps/Docdos";
import Doctres from "@/Components/steps/Doctres";
import Final from "@/Components/steps/Final";
import {  useState } from "react";
import Doccuatro from "@/Components/steps/Doccuatro";
import ErrorComponet from "@/Components/ErrorComponet";

export default function Home() {
  const [currentStep, setCurrentStep ]= useState(1);
  const [checkState, setCheckState] = useState({});
  const [inputRealTimeValidation, setInputRealTimeValidation] = useState({});
  const [nombre, setNombre]= useState(" ");
  const [firma, setFirma]= useState("");
  const [errorForm, setErrorForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const objetoClientes = {
    alergias: checkState.Allergies || "",
    cualAlerigia: checkState.Allergies === "yes" ? checkState.allergiesInput || ""  : undefined,
    maternidad: checkState.Maternity || "",
    cualMaternidad: checkState.Maternity === "yes" ?  checkState.maternityInput || "" : undefined ,
    enfermedaad: checkState.Disease || "",
    cualEnfermedaad:checkState.Disease === "yes" ?  checkState.diseaseInput || "" : undefined ,
    Medication: checkState.Medication || "",
    cualMedication: checkState.Medication === "yes" ?  checkState.MedicationInput || "" : undefined , 
    AcneMedicCinco: checkState.AcneMedicCinco || "",
    cualAcneMedicCinco: checkState.AcneMedicCinco === "yes" ?  checkState.AcneMedicCincoInput || "" : undefined ,
    MedicalDevice: checkState.MedicalDevice || "",
    cualMedicalDevice: checkState.MedicalDevice === "yes" ?  checkState.MedicalDeviceInput || "" : undefined, 
    Skintreatment: checkState.Skintreatment || "" ,
    cualSkintreatment: checkState.Skintreatment === "yes" ?  checkState.SkintreatmentInput || "" : undefined, 
    Chokinproducts: checkState.Chokinproducts || "" ,
    cualChokinproducts: checkState.Chokinproducts === "yes" ?  checkState.ChokinproductsInput || "" : undefined,  
    nombre, 
    firma,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(objetoClientes).includes("") || objetoClientes.nombre === "" || objetoClientes.firma === "") {
      setErrorForm(true);
      return;
    } else {
      setErrorForm(false);
    }

    setIsLoading(true);

    // Manejo de errores
    // Estado de request
    try {
      const response = await fetch("http://localhost:8080/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objetoClientes),
      });

      if (response.ok) {
      // El POST se realizó correctamente
      } else {
      // El servidor devolvió un estado de error
      }
    } catch (error) {
    // Procesar errores de conexión u otros errores
    }

    setIsLoading(false);
  };

  const steps =[
    "Doc1",
    "Doc2",
    "Doc3",
    "Doc4",
    "Final",
  ];

  function displayStep (step) {
    switch(step){
    case 1:
      return <Docuno
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        checkState={checkState}
        inputRealTimeValidation={inputRealTimeValidation}  
        handleClick={handleClick}
        currentStep ={currentStep}
        steps={steps}
        errorForm={errorForm}

      />;
    case 2:
      return <Docdos
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        checkState={checkState}
        inputRealTimeValidation={inputRealTimeValidation}
        handleClick={handleClick}
        currentStep ={currentStep}
        steps={steps}
        errorForm={errorForm}
      
      />;
    case 3:
      return <Doctres
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
        checkState={checkState}
        inputRealTimeValidation={inputRealTimeValidation}
        handleClick={handleClick}
        currentStep ={currentStep}
        steps={steps}
        errorForm={errorForm}
      
      />;
    case 4:
      return <Doccuatro
        handleClick={handleClick}
        currentStep ={currentStep}
        steps={steps}
        setNombre={setNombre}
        setFirma={setFirma}
        firma={firma}
        nombre={nombre}
        handleSubmit={handleSubmit}
        errorForm={errorForm}
      />;
    case 5 :
      return <Final 
        handleClick={handleClick}
        errorForm={errorForm}
        isLoading={isLoading}
      
      />;
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;  // type === "checkbox" ?   checked={checkState[question.name] === option.value} : value    
  
    setCheckState((prevState) => ({  // Esta función de callback recibe el estado anterior como argumento
      ...prevState,
      [name]: newValue,     //checked={checkState[question.name] === option.value}
    }));

    setInputRealTimeValidation((prevValidation) => ({
      ...prevValidation,
      [name]: value !== "",  // es true si el valor del input no está vacío y false si esta vacio
    }));
  };

  const handleKeyUp = (event) => {
    const { name, value } = event.target;
    setInputRealTimeValidation((prevValidation) => ({
      ...prevValidation,
      [name]: value !== "",
    }));
  };
  
  return (
    <div className="relative form">
      <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
        <Stepper
          currentStep={currentStep}
          steps={steps}
          errorForm={errorForm}
        />
        <div className="mt-10 mb-0 p-10">                    
          <h1 htmlFor="" className=" uppercase font-extrabold block mt-3 text-lg text-neutral-600 text-center mb-9 ">
            Please answer the questions to the best of your knowledge
          </h1>                      
          {errorForm === true && <ErrorComponet/>}                           
          <form onSubmit={handleSubmit}>
            {displayStep(currentStep)}
          </form>
        </div>                    
      </div>
    </div>
  );
}
