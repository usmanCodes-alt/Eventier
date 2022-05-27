import { useState } from "react";

const useInput = (validateInputValue) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateInputValue(inputValue);
  const inputFieldHasError = !valueIsValid && isTouched;

  const inputValueChangedHandler = (e) => {
    setInputValue(e.target.value);
  };

  const setInputValueForUpdate = (value) => {
    setInputValue(value);
  };

  const blurHandler = () => setIsTouched(true);
  const resetBlur = () => setIsTouched(false);

  const reset = () => {
    setInputValue("");
    setIsTouched(false);
  };

  return {
    value: inputValue,
    isValid: valueIsValid,
    inputFieldHasError,
    inputValueChangedHandler,
    setInputValueForUpdate,
    blurHandler,
    resetBlur,
    reset,
  };
};

export default useInput;
