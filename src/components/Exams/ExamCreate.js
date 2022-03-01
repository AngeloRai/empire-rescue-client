import React from 'react'
import { useHistory } from "react-router-dom";

import FormExam from './FormExam'
import { api } from "../../apis";

function ExamCreate() {

const history = useHistory();

async function handleSubmit(values) {
  try {
    const exam = await api.post("/exam", values);
    console.log(exam);
    
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
        exam={[]}
      />
    </div>
  )
}

export default ExamCreate
