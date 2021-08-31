import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../componentHelpers/ConfirmationModal";
import { api } from "../../apis";
import { FaRegTrashAlt } from "react-icons/fa";
import "./ExamList.css";

function ExamList() {
  const [exams, setExams] = useState();
  const [isOrderedFirst, setIsOrderedFirst] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const fetchExams = async () => {
    const fetchedExams = await api.get("/exams");

    const sortedExams = fetchedExams.data.sort((a, b) =>
      a.examName.localeCompare(b.examName)
    );
    console.log(sortedExams);
    setExams(sortedExams);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/exam-delete/${id}`);
      fetchExams();
      alert(id);
      setShowModal(false);
    } catch (err) {
      console.console.error(err);
    }
  };

  const handleSorting = (value) => {
    if (value === "name") {
      sortByName();
    } else if (value === "type") {
      sortByType();
    }
  };

  const sortByName = () => {
    const examsCopy = [...exams];
    let newExamsCopy = [...examsCopy];
    if (isOrderedFirst) {
      newExamsCopy = examsCopy.sort((a, b) => a.examName - b.examName);
    } else {
      newExamsCopy = examsCopy.sort((a, b) => b.examName - a.examName);
    }
    setIsOrderedFirst(!isOrderedFirst);
    setExams(newExamsCopy);
    console.log(newExamsCopy);
  };

  const sortByType = () => {
    const examsCopy = [...exams];
    let newExamsCopy = [...examsCopy];
    if (isOrderedFirst) {
      newExamsCopy = examsCopy.sort((a, b) => a.examType - b.examType);
    } else {
      newExamsCopy = examsCopy.sort((a, b) => b.examType - a.examType);
    }
    setIsOrderedFirst(!isOrderedFirst);
    setExams(newExamsCopy);
    console.log(newExamsCopy);
  };

  const handleModalDeleteId = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  return (
    <div className="main-exams-container w-100 m-2">
      <h2>Exames</h2>{" "}
      <div className="add-link">
        <Link to="/adicionar-exame" className="link">
          Adicionar Exame
        </Link>
      </div>
      <div className="row list-exams-header">
        <div onClick={() => handleSorting("name")} className="col-4">
          NOME
        </div>
        <div onClick={() => handleSorting("type")} className=" col-4">
          TIPO
        </div>
        <div className=" col-2">EXCLUIR</div>
      </div>
      {exams &&
        exams.map((loopedExam) => (
          <div
            className="exams-container row bg-light border-bottom"
            key={loopedExam.id}
          >
            <div className="col-4">
              <Link
                className="text-decoration-none text-dark"
                to={`/exame/${loopedExam.id}`}
              >
                {loopedExam.examName}
              </Link>
            </div>
            <div className="col-4">{loopedExam.examType}</div>
            <div className="col-2">
              <span
                type="button"
                onClick={() => handleModalDeleteId(loopedExam.id)}
              >
                <FaRegTrashAlt />
              </span>
            </div>
          </div>
        ))}
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(0)}
        handleConfirm={() => handleDelete(deleteId)}
        title={`Tem certeza de que deseja excluir o exame?`}
      >
        <p>Esta ação é irreversível! Clique em "Confirmar" para excluir.</p>
      </ConfirmationModal>
    </div>
  );
}

export default ExamList;
