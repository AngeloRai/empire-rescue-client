import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../componentHelpers/ConfirmationModal";
import { api } from "../../apis";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { convertToSlug } from "../componentHelpers/slugify";

import "./ExamList.css";

function ExamList() {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [searchName, setSearchName] = useState();
  const [searchType, setSearchType] = useState();

  const fetchExams = async () => {
    const fetchedExams = await api.get("/exams");

    const sortedExams = fetchedExams.data.sort((a, b) =>
      a.examName.localeCompare(b.examName)
    );
    setExams(sortedExams);
  };

  useEffect(() => {
    fetchExams();
  }, []);
  useEffect(() => {
    function filterExams() {
      let filteredArray = [...exams];
      if (exams && searchName) {
        filteredArray = exams.filter((exam) =>
          convertToSlug(exam.examName).includes(convertToSlug(searchName))
        );
      } else {
        filteredArray = [...exams];
      }

      if (searchType) {
        filteredArray = filteredArray.filter((exam) =>
          convertToSlug(exam.examType).includes(convertToSlug(searchType))
        );
      }
      setFilteredExams(filteredArray);
    }
    filterExams();
  }, [exams, searchName, searchType]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/exam-delete/${id}`);
      fetchExams();
      setShowModal(false);
    } catch (err) {
      console.console.error(err);
    }
  };

  const handleModalDeleteId = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };
  return (
    <div className="main-exams-container w-100 m-2">
      <h2 className=" text-center">Exames</h2>
      <div className="add-link">
        <Link to="/adicionar-exame" className="link">
          Adicionar Exame
        </Link>
      </div>
      <div className="row">
        <div className="col-md-5 col-lg-3 m-1">
          <input
            placeholder="exame..."
            type="text"
            className="m-1 form-control shadow-none no-border "
            id="searchName"
            name="searchName"
            onChange={(e) => setSearchName(e.target.value)}
            value={searchName}
          />
        </div>
        <div className="col-md-5 col-lg-3 m-1">
          <input
            placeholder="tipo..."
            type="text"
            className="m-1 form-control shadow-none no-border"
            id="searchType"
            name="searchType"
            onChange={(e) => setSearchType(e.target.value)}
            value={searchType}
          />
        </div>
      </div>
      <div className="row list-exams-header">
        <div className="col-5 col-md-4">NOME</div>
        <div className="col-3 col-md-4">TIPO</div>
        <div className=" col-2 col-md-1">EDITAR</div>
        <div className=" col-2 col-md-1">EXCLUIR</div>
      </div>
      {filteredExams &&
        filteredExams.map((loopedExam) => (
          <div
            className="exams-container row bg-light border-bottom"
            key={loopedExam.id}
          >
            <div className="col-5 col-md-4">
              <Link
                className="text-decoration-none text-dark"
                to={`/exame/${loopedExam.id}`}
              >
                {loopedExam.examName}
              </Link>
            </div>
            <div className="col-3 col-md-4">{loopedExam.examType}</div>
            <Link
              className="text-decoration-none text-dark col-2 col-md-1 text-center"
              to={`/editar-exame/${loopedExam.id}`}
            >
              <MdModeEdit />
            </Link>
            <div className="col-2 col-md-1 text-center">
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
