import React from 'react'
import { useHistory } from "react-router-dom";

import FormExam from './FormSpecialty'
import { api } from "../../apis";

function ExamCreate() {

const history = useHistory();

async function handleSubmit(values) {
  console.log(values);
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
      <FormExam
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default ExamCreate
