import { useState } from "react";
import { ZodSchema } from "zod";

export const useZodForm = <T extends Record<string, any>>(
  schema: ZodSchema<T>,
  initialValues: T,
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>,
  );

  const validateField = (field: keyof T, value: any) => {
    const result = schema.safeParse({ ...values, [field]: value });

    if (!result.success) {
      const { fieldErrors: flatFieldErrors } = result.error.flatten();
      const newFieldErrors: Partial<Record<keyof T, string>> = {};

      Object.entries(flatFieldErrors).forEach(([key, messages]) => {
        const msg = messages as string[] | undefined;
        if (msg && msg.length > 0) {
          newFieldErrors[key as keyof T] = msg[0];
        }
      });

      setErrors((prev) => ({
        ...prev,
        [field]: newFieldErrors[field] ?? "", // Update only the current field's error
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleChange = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const isValid = schema.safeParse(values).success;

  return {
    values,
    errors,
    handleChange,
    isValid,
    setValues,
  };
};
