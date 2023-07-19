
import  { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
function Sign({ goBack, handleSubmit, answers, setAnswers }) { 
  const submitDisabled = !answers["fullName"] || !answers["signature"];
console.log(submitDisabled)
  const handleChange = (event) => {
    const { name, value } = event.target;

    setAnswers((prevState) => ({
      ...prevState,
      [name]: value,     
    }))    
  };

  const signatureRef = useRef();

  const handleClear = () => {
    signatureRef.current.clear();
    setAnswers((prevState) => ({
      ...prevState,
      "signature": undefined,     
    }));
  };

  const handleSave = () => {
    const signatureData = signatureRef.current.toDataURL();
    setAnswers((prevState) => ({
      ...prevState,
      "signature": signatureData,     
    }));
  };

  useEffect(() => {
    if (answers["signature"] && signatureRef.current) {            
      signatureRef.current.fromDataURL(answers["signature"]);       
    }
  }, [answers["signature"]]);

  return (  
    <>
      <div className="flex flex-col gap-2 ">        
        <label className="block mt-3 text-sm text-gray-700  font-semibold">
          What is your full name ?
          <input 
            type="text"
            name="fullName"
            value={answers["fullName"] || ""}
            onChange={handleChange}
            placeholder="Please type an answer" 
            className="rounded-lg border w-full h-10 px-3 mb-5 focus:outline-none focus:border-gray-400  mt-5"
          />
        </label>
      </div>
    
      <div className="flex justify-center pt-4  ">   
        <SignatureCanvas
          ref={signatureRef}
          penColor="black"
          canvasProps={{ className: "border border-gray-300 bg-slate-50 rounded-lg w-full h-36" }}
        />
      </div> 
      <div className="flex justify-center  gap-4 mt-4">
        <button
          type="button"
          onClick={handleClear}
          className="bg-white hover:bg-red-400 hover:text-white text-slate-400 uppercase font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
        >
          Limpiar
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="bg-white hover:bg-green-400 hover:text-white text-slate-400 uppercase font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow"
        >
          Guardar
        </button>
      </div>
      <div className="container flex justify-around pt-20 mb-8">
        <button onClick={goBack} className="bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2  border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 transform hover:-translate-x hover:scale-105 ease-in-out" >
          Back
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={submitDisabled} 
          className={`${submitDisabled ? "bg-gray-400 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointe" : "bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-green-700 hover:text-white transition duration-200 ease-in-out hover:shadow-inner focus:outline-none transform hover:-translate-x hover:scale-105"}`}
        >
          Submit
        </button>
      </div>
    </> 
  );}
                    
  
export default Sign; 