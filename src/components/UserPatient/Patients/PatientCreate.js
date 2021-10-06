import React from "react";
import PatientForm from "./PatientForm";
import { api } from "../../../apis";

function PatientCreate({ setToggled, patient, address, userId }) {
  async function handleSubmit(values) {
    console.log(values, userId);
    try {
      await api.post("/patient", { ...values, userId: userId });
      setToggled(false);
    } catch (err) {
      console.error("This is a Patient Post ERROR", err);
    }
  }

  return (
    <div>
      <h3 className="text-center">Cadastrar Novo Paciente</h3>
      <PatientForm
        handleSubmit={handleSubmit}
        setToggled={setToggled || null}
        address={address || null}
        patient={patient || null}
        isPatientUserForm={true}
      />
    </div>
  );
}

export default PatientCreate;
