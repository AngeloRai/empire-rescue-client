import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import FormExam from "./FormExam";
import { api } from "../../apis";

function ExamEdit() {
  const history = useHistory();
  const { id } = useParams();
  const [exam, setExam] = useState()

  useEffect(() => {
    const fetchExam = async () => {
      const fetchedExam = await api.get(`/exam/${id}`);
      setExam(fetchedExam.data)
    };
    fetchExam();
  }, [id]);

  async function handleSubmit(values) {
    console.log(values);
    try {
      await api.put(`/exam-update/${id}`, values);

      history.push("/exames");
    } catch (err) {
      console.error("This is Exam Edit Put ERROR", err);
    }
  }

  return (
    <div className="w-100 m-5">
      <h2>Editar exame</h2>
      {exam && <FormExam handleSubmit={handleSubmit} exam={exam} />}
    </div>
  );
}

export default ExamEdit;
