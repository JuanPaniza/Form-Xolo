// Desmontar y montar
// El estado local se pierde
function Docuno({handleChange, handleKeyUp, checkState, inputRealTimeValidation, handleClick, errorForm}) {
  const questionsUno = [
    {
      id: 1,
      label:
        "Do you have any known allergies to food, medication or plants? If so, please mention all of them below:",
      name: "Allergies",
      options: [
        { value: "yes", label: "Yes", id: 1,  idRadio: 7},
        { value: "no", label: "No", id: 2,  idRadio: 8},
      ],
      inputText: { value: "allergiesInput", label: "Mention what they are?"},
    },
    {
      id: 2,
      label: "Are you pregnant or breastfeeding?",
      name: "Maternity",
      options: [
        { value: "yes", label: "Yes", id: 3,  idRadio: 9},
        { value: "no", label: "No", id: 4,  idRadio: 10},
      ],
      inputText: { value: "maternityInput", label: "Mention what they are?" },
    },
    {
      id: 3,
      label:
        "Do you suffer from any circulatory or skin disease, cancer, diabetes, epilepsy, stye or tinnitus? If so, which one?",
      name: "Disease",
      options: [
        { value: "yes", label: "Yes", id: 5,  idRadio: 11},
        { value: "no", label: "No", id: 6,  idRadio: 12},
      ],
      inputText: { value: "diseaseInput", label: "Mention what they are?", error: "is a required field."},
    },
  ];

  const handleClickBeforeContinue = () => {
    // Validation...
    handleClick("next");
  };

  return (
    <div> 
      {questionsUno.map((question) => (
        <div key={question.id}>
          <div className="mt-7">
            <label className="block mt-3 text-sm text-gray-700 font-semibold">
              {question.label}
            </label>
            <div>
              <div className="flex gap-3 mt-7">
                {question.options.map((option) => (
                  <div key={option.id} className="inline-flex items-center">
                    <label
                      className="relative flex cursor-pointer items-center rounded-full p-3"
                      htmlFor={option.idRadio}
                      data-ripple-dark="true"
                    >
                      <input
                        id={option.idRadio}
                        type="radio"
                        name={question.name}
                        value={option.value}
                        checked={checkState[question.name] === option.value}
                        onChange={handleChange}
                        className={` ${errorForm === true ? " before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 text-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-400 before:opacity-0 before:transition-opacity checked:border-red-600 checked:before:bg-red-600 hover:before:opacity-10" : "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 text-green-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-400 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"}  `}
                      />
                      <div className={` ${errorForm === true ? "pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-red-600 opacity-0 transition-opacity peer-checked:opacity-100" : "pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-600 opacity-0 transition-opacity peer-checked:opacity-100"}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                        </svg>
                      </div>
                    </label>
                    <label
                      className="mt-px cursor-pointer select-none font-light text-gray-700"
                      htmlFor={option.idRadio} 
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 ">
                <label className={`${checkState[question.name] === "yes" ? "block mt-3 text-sm text-gray-700 text-center font-semibold": "block mt-3 text-sm text-gray-400 text-center font-semibold"}`}>
                  {question.inputText.label}
                  <input 
                    type="text"
                    name={question.inputText.value}
                    value={checkState[question.inputText.value] || ""}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp} 
                    disabled={checkState[question.name] === "yes" ? false : true}  placeholder="Escriba su razon..." 
                    className={`${inputRealTimeValidation[question.inputText.value] === false && checkState[question.name] == "yes" ? " mt-5 focus:outline-none focus:border-red-400 border-2 border-solid border-red-600 redondeado-lg bg-red-100  w-full h-10 px-3 mb-0 rounded-md": "rounded-lg border w-full h-10 px-3 mb-5 focus:outline-none focus:border-gray-400  mt-5"}`}/>
                  {inputRealTimeValidation[question.inputText.value] === false && checkState[question.name] === "yes" ? <div className="error-message mt-0 pt-0">{question.name}is a required field.</div> : ""}
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="container flex justify-around pt-12 mb-8">
        <button onClick={() =>handleClickBeforeContinue()}  type="button"  className=" bg-gray-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out hover:shadow-inner focus:outline-none transform hover:-translate-x hover:scale-105 ">
             Next
        </button>
      </div>
    </div>
  );
}

export default Docuno;
