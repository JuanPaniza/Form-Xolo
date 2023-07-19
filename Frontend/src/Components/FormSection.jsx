
const FormSection = ({ questions, answers, setAnswers, step, goBack, goNext }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setAnswers((prevState) => ({
      ...prevState,
      [name]: value,     
    }))    
  };

  const goBackDisabled = step === 0;
  const goNextDisabled = questions.find((question) => {
    if (answers[question.name] === undefined) { 
      return true;
    }
    if (question.inputText && answers[question.name] === "yes" && !Boolean(answers[question.inputText.value])) {
      return true;
    }
  });

  return (
    <div> 
      {questions.map((question) => (
        <div key={question.id}>
          <div className="mt-7">
            <p className="block mt-3 text-sm text-gray-700 font-semibold">
              {question.label}
            </p>
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
                        checked={answers[question.name] === option.value}
                        onChange={handleChange}
                        className= "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 text-green-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-400 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                      />
                      <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-600 opacity-0 transition-opacity peer-checked:opacity-100">
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
              {question.inputText && <div className="flex flex-col gap-2 ">
                <label className={`${answers[question.name] === "yes" ? "block mt-3 text-sm text-gray-700 text-center font-semibold": "block mt-3 text-sm text-gray-400 text-center font-semibold"}`}>
                  {question.inputText.label}
                  <input 
                    type="text"
                    name={question.inputText.value}
                    value={answers[question.inputText.value] || ""}
                    onChange={handleChange}
                    disabled={!(answers[question.name] === "yes")}
                    placeholder="Please type an answer"
                    className="rounded-lg border w-full h-10 px-3 mb-5 focus:outline-none focus:border-gray-400 mt-5"
                  />
                </label>
              </div>}
            </div>
          </div>
        </div>
      ))}

      <div className="container flex justify-between pt-12 mb-8">
        <button onClick={goBack} type="button" disabled={goBackDisabled} className="bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 ease-in-out">
          Back
        </button>
        <button onClick={goNext} type="button" disabled={goNextDisabled} className={`${goNextDisabled ? "bg-gray-400 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointe" : "bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-green-700 hover:text-white transition duration-200 ease-in-out hover:shadow-inner focus:outline-none transform hover:-translate-x hover:scale-105"}`}>
          Next
        </button>
      </div>
    </div>
  );
}
 
export default FormSection;