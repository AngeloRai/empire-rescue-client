import React from 'react'
import { useHistory } from "react-router-dom";

import FormSpecialty from './FormSpecialty'
import { api } from "../../apis";

function SpecailtyCreate() {

const history = useHistory();

async function handleSubmit(values) {

  try {
    await api.post("/specialty", values);

    history.push("/especialidades");
  } catch (err) {
    console.error("This is Specialty Post ERROR", err);
  }
}

  return (
    <div>
    <h2>Registre uma nova Especialidade</h2>
      <FormSpecialty
        handleSubmit={handleSubmit}
        specialty={[]}
      />
    </div>
  )
}

export default SpecailtyCreate
