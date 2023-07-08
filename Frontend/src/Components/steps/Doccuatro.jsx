
import  { useRef, useEffect } from "react";

import SignatureCanvas from "react-signature-canvas";

function Doccuatro ({ handleClick, setNombre, nombre, setFirma, handleSubmit, firma}) {
  function handle(event){
    handleClick("next");
    handleSubmit(event);
  }
 
  const signatureRef = useRef();

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    const signatureData = signatureRef.current.toDataURL();
    setFirma(signatureData);
  };

  useEffect(() => {
    if (firma && signatureRef.current) {             // si la firma esta en la pagina de ella 
      signatureRef.current.fromDataURL(firma);       // imprimeme este valor que seria la firma que ya guardamos 
    }
  }, [firma]);
  
  return (  
    <>
      <div className="flex flex-col gap-2 ">        
        <label className="block mt-3 text-sm text-gray-700  font-semibold">
                What is your full name ?
          <input 
            type="text"
            name="name"
            value={nombre}
            onChange={(e)=>{setNombre(e.target.value);}}
            onBlur={(e)=>{setNombre(e.target.value);}} 
            placeholder="Escriba su razon..." 
            className={`${ nombre === ""  ? " mt-5 focus:outline-none focus:border-red-300 border-2 border-solid border-red-500 redondeado-lg bg-red-100  w-full h-10 px-3 mb-0 rounded-md": "rounded-lg border w-full h-10 px-3 mb-5 focus:outline-none focus:border-gray-400  mt-5"}`}/>
          {nombre === ""  ? <div className="error-message mt-0 pt-0"> Name is a required field.</div> : ""}
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
        <button onClick={() =>handleClick("back")} className="bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2  border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 transform hover:-translate-x hover:scale-105 ease-in-out" >
          Back
        </button>
        <button
          onClick={handle}
          type="submit"
          className= "bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out hover:shadow-inner focus:outline-none transform hover:-translate-x hover:scale-105 "
        >
          Submit
        </button>
      </div>
    </> 
  );}
                    
  
export default Doccuatro; 