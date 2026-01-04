import React, { createContext, useState } from "react";

export const SubmissionsContext = createContext();

export function SubmissionsProvider({ children }) {
  const [submissions, setSubmissions] = useState([]);

  const addSubmission = (data) => {
    setSubmissions((prev) => [...prev, data]);
  };

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </SubmissionsContext.Provider>
  );
}
