import React from "react";
import Header from "../components/Header";
import AddInstitution from "../components/AddInstitution";
import InstitutionList from "../components/InstitutionList";

export default function Home() {
  return (
    <div>
      <Header />

      <AddInstitution />
      <InstitutionList />
    </div>
  );
}
