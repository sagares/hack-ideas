import { useState } from "react";

function useForm<T>(initialState = {}, validations = []) {
  const [values, setValues] = useState<T>(initialState as T);
  const [errors, setErrors] = useState<T>({} as T);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState<T>({} as T);

  const changeHandler = (event) => {
    let value: string | Array<string>;
    if (event.target.tagName === "SELECT") {
      value = Array.from(
        event.target.selectedOptions,
        (option: HTMLOptionElement) => option.value
      );
    } else {
      value = event.target.value;
    }
    const newValues = {
      ...values,
      [event.target.name]: value,
    };
    const { isValid, errors } = validate(validations, newValues);
    setValues(newValues);
    setIsValid(isValid);
    setErrors(errors);
    setTouched({ ...touched, [event.target.name]: true });
  };

  return { values, changeHandler, isValid, errors, touched };
}

function validate(validations, values) {
  const errors = validations
    .map((validation) => validation(values))
    .filter((validation) => typeof validation === "object");
  return {
    isValid: errors.length === 0,
    errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}),
  };
}

export default useForm;
