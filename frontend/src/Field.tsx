import { FC, useContext, ChangeEvent } from 'react';
import { FormContext } from './Form';

interface Props {
  name: string;
  label?: string;
  // Union type string litterals ; means
  // that the type prop can only be
  // one of those
  type?: 'Text' | 'Textarea' | 'Password';
}

export const Field: FC<Props> = ({ name, label, type = 'Text' }) => {
  const { setValue, touched, validate, setTouched } = useContext(FormContext);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (setValue) {
      setValue(name, e.currentTarget.value);
    }
    if (touched[name]) {
      if (validate) {
        validate(name);
      }
    }
  };

  const handleBlur = () => {
    if (setTouched) {
      setTouched(name);
    }
    if (validate) {
      validate(name);
    }
  };

  return (
    <FormContext.Consumer>
      {({ values, errors }) => (
        <div className="mb-3">
          {label && (
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor={name}
            >
              {label}
            </label>
          )}
          <div className="mt-1 flex rounded-md shadow-sm">
            {(type === 'Text' || type === 'Password') && (
              <input
                type={type.toLowerCase()}
                id={name}
                value={values[name] === undefined ? '' : values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
              />
            )}
            {type === 'Textarea' && (
              <textarea
                id={name}
                value={values[name] === undefined ? '' : values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
              ></textarea>
            )}
          </div>
          {/* Rendering the errors validation */}
          {errors[name] &&
            errors[name].length > 0 &&
            errors[name].map((error) => (
              <div
                className="bg-red-200 w-full text-xs font-bold p-2 mt-2"
                key={error}
              >
                {error}
              </div>
            ))}
        </div>
      )}
    </FormContext.Consumer>
  );
};
