import { createContext, useState } from 'react';

export const FormContext = createContext(null);

export default function FormContextProvider({ children }) {
  const [fields, setFields] = useState({
    link: '',
    condition: 'any',
    tokens: '',
  });

  const updateField = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <FormContext.Provider value={{ fields, updateField }}>
      {children}
    </FormContext.Provider>
  )
}
