import React from 'react'


import PatientForm from './PatientForm';
import { api } from "../../apis";

function Patients({  setToggled, patient, address, userId  }) {

  async function handleSubmit(values) {
    console.log(values, userId);
    try {
      await api.post("/patient", { ...values, userId: userId});
      setToggled(false)
      
    } catch (err) {
      console.error("This is a Patient Post ERROR", err);
    }
  }
  
    return (
      <div>
      
        <PatientForm
          handleSubmit={handleSubmit}
          setToggled={setToggled}
          address={patient}
          patient={address}
        />
        
      </div>
    )
  }

export default Patients