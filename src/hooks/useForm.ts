import { useCallback, useState } from "react";

export default function useForm<T extends object>(
  defaultValue: T,
  validations?: Validations<T>,
) {
  const [data, setData] = useState<T>(defaultValue);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string[]>>>();
  const validate = useCallback(() => {
    let _errors: Partial<Record<keyof T, string[]>> = {};
    if (validations) {
      Object.entries(validations).forEach(([key, arr]) => {
        if (Array.isArray(arr)) {
          arr.forEach((callback) => {
            const message = callback(data[key], data);
            if (message) {
              const p = _errors[key] ?? [];
              _errors = Object.assign(_errors, {
                [key]: [...p, message],
              });
            }
          });
        }
        if (typeof arr === "function") {
          const message = arr(data[key], data);
          if (message) {
            const p = _errors[key] ?? [];
            _errors = Object.assign(_errors, {
              [key]: [...p, message],
            });
          }
        }
      });
      setErrors(_errors);
      if (Object.keys(_errors).length > 0) {
        throw _errors;
      }
    }
    return data;
  }, [validations, data]);
  return {
    data,
    setData,
    errors,
    validate,
  };
}
type ValidateFunction = (input: any, data: any) => string | undefined;

type Validations<T extends object> = Partial<
  Record<keyof T, ValidateFunction[] | ValidateFunction>
>;
