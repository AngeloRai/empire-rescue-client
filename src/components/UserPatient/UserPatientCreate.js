import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { api } from "../../apis";
import PatientForm from "./Patients/PatientForm";
import UserCreate from "../UserPatient/Users/UserCreate";
import UserSelect from "./UserSelect";

function UserPatientCreate() {
  const histroy = useHistory();
  const [selectedUser, setSelectedUser] = useState();
  const [newUserToggle, setNewUserToggle] = useState(false);
  const [newPatientToggle, setNewPatientToggle] = useState(true);

  async function handleSubmit(values) {
    try {
      await api.post("/patient", { ...values, userId: selectedUser });
      histroy.push("/pacientes");
    } catch (err) {
      console.error("This is a Patient Post ERROR", err);
    }
  }

  return (
    <div className="m-4">
      <h2 className="text-center">Cadastre Novo Usuario/Paciente</h2>
      {/* Select a user before regestering a new Patient */}
      <UserSelect
        setSelectedUser={setSelectedUser}
        setNewUserToggle={setNewUserToggle}
        newUserToggle={newUserToggle}
      />
      
      {selectedUser && !newPatientToggle && !newUserToggle ? (
        <span
          onClick={() => setNewPatientToggle(true)}
          className="btn btn-secondary"
        >
          Adicionar Paciente
        </span>
      ) : null}

      {newUserToggle && <UserCreate setToggled={setNewUserToggle} />}
        {/* Form to add new patient only shows if a user is selected, patient is always associated to a user id */}
      {selectedUser && newPatientToggle ? (
        <PatientForm
          handleSubmit={handleSubmit}
          setToggled={setNewPatientToggle}
          isPatientUserForm={true}
        />
      ) : null}
    </div>
  );
}

export default UserPatientCreate;
