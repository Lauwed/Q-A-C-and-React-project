import { FC, useState, createContext, FormEvent } from 'react';

/* INTERFACES */

export interface Values {
  // An indexable type is where the index signature is defined
  // rather than specific properties
  [key: string]: any;
}

export interface Errors {
  [key: string]: string[];
}

export interface Touched {
  [key: string]: boolean;
}

export interface SubmitResult {
  success: boolean;
  errors?: Errors;
}

interface Validation {
  validator: Validator;
  arg?: any;
}

interface ValidationProp {
  [key: string]: Validation | Validation[];
}

interface Props {
  submitCaption?: string;
  validationRules?: ValidationProp;
  onSubmit: (values: Values) => Promise<SubmitResult>;
  successMessage?: string;
  failureMessage?: string;
}

interface FormContextProps {
  values: Values;
  setValue?: (fieldName: string, value: any) => void;
  // FORM VALIDATION
  errors: Errors;
  validate?: (fieldName: string) => void;
  touched: Touched;
  setTouched?: (fieldName: string) => void;
}

export const FormContext = createContext<FormContextProps>({
  values: {},
  errors: {},
  touched: {},
});

/* FORM VALIDATION */

// This is a type alias ; it creates new name for a type.
type Validator = (value: any, args?: any) => string;

export const required: Validator = (value: any): string =>
  value === undefined || value === null || value === ''
    ? 'This must be populated'
    : '';
export const minLength: Validator = (value: any, length: number): string =>
  value && value.length < length
    ? `This must be at least ${length} characters`
    : '';

/* FORM ERRORS */

export const Form: FC<Props> = ({
  submitCaption,
  children,
  validationRules,
  onSubmit,
  successMessage = 'Success!',
  failureMessage = 'Something went wrong',
}) => {
  const [values, setValue] = useState<Values>({});
  // FORM VALIDATION
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  // SUBMITTING FORM
  const [submitting, setSubmitting] = useState(false); // The submission is in progress
  const [submitted, setSubmitted] = useState(false); // The form has been submitted
  const [submitError, setSubmitError] = useState(false); // If the submission failed

  const validate = (fieldName: string): string[] => {
    // Return an empty array if there are no rules
    // to check
    if (!validationRules) {
      return [];
    }
    if (!validationRules[fieldName]) {
      return [];
    }
    const rules = Array.isArray(validationRules[fieldName])
      ? (validationRules[fieldName] as Validation[]) // Casting each validationRules[fieldName] to Validation[] because compiler isn't smart enough yet
      : ([validationRules[fieldName]] as Validation[]);
    // Iterate through the rules, invoking the validator and
    // collecting errors in a fieldErrors array
    const fieldErrors: string[] = [];
    rules.forEach((rule) => {
      const error = rule.validator(values[fieldName], rule.arg);
      if (error) {
        fieldErrors.push(error);
      }
    });

    // Update the errors state with the new errors
    const newErrors = { ...errors, [fieldName]: fieldErrors };
    setErrors(newErrors);
    return fieldErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitting(true);
      setSubmitError(false);
      const result = await onSubmit(values);
      setErrors(result.errors || {});
      setSubmitError(!result.success);
      setSubmitting(false);
      setSubmitted(true);
    }
  };
  const validateForm = () => {
    const newErrors: Errors = {};
    let haveErrors: boolean = false;
    if (validationRules) {
      Object.keys(validationRules).forEach((fieldName) => {
        // Iterate throught the validation rules for each field
        // invoking each rule.
        newErrors[fieldName] = validate(fieldName);
        if (newErrors[fieldName].length > 0) {
          haveErrors = true;
        }
      });
    }
    // Update the error state
    setErrors(newErrors);
    return !haveErrors;
  };

  return (
    <FormContext.Provider
      value={{
        values,
        setValue: (fieldName: string, value: any) => {
          setValue({ ...values, [fieldName]: value });
        },
        errors,
        validate,
        touched,
        setTouched: (fieldName: string) => {
          setTouched({ ...touched, [fieldName]: true });
        },
      }}
    >
      <form noValidate={true} onSubmit={handleSubmit}>
        <fieldset className="mb-5">{children}</fieldset>
        <button
          type="submit"
          disabled={submitting || (submitted && !submitError)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {submitCaption}
        </button>
        {submitted && submitError && (
          <p className="bg-red-200 w-full text-xs font-bold p-2 mt-2">
            {failureMessage}
          </p>
        )}
        {submitted && !submitError && (
          <p className="bg-green-200 w-full text-xs font-bold p-2 mt-2">
            {successMessage}
          </p>
        )}
      </form>
    </FormContext.Provider>
  );
};
