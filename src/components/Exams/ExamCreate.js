import React from 'react'
import { useHistory } from "react-router-dom";

import FormExam from './FormExam'
import { api } from "../../apis";

function ExamCreate() {

const history = useHistory();

async function handleSubmit(values) {
  console.log(values);
  try {
    await api.post("/exam", values);

    history.push("/exames");
  } catch (err) {
    console.error("This is Exam Post ERROR", err);
  }
}

  return (
    <div className="w-100 m-5">
    <h2>Registre um novo exame</h2>
      <FormExam
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default ExamCreate
