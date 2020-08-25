import React, { useState, createContext } from "react";

export const InstitutionContext = createContext();
export const InstitutionContextProvider = (props) => {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const addInstitutions = (institution) => {
    setInstitutions([...institutions, institution]);
  };
  return (
    <InstitutionContext.Provider
      value={{
        institutions,
        setInstitutions,
        addInstitutions,
        selectedInstitution,
        setSelectedInstitution,
      }}
    >
      {props.children}
    </InstitutionContext.Provider>
  );
};
