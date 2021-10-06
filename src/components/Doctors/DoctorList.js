import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertToSlug } from "../componentHelpers/slugify";
import { BsCheckCircle, BsDashCircle } from "react-icons/bs";
import { api } from "../../apis";
import "./DoctorList.css";

function DoctorList() {
  const [doctors, setDoctors] = useState();
  const [searchName, setSearchName] = useState();
  const [searchPhone, setSearchPhone] = useState();
  const [filteredDoctors, setFilteredDoctors] = useState();

  const fetchDoctors = async () => {
    const fetchedDoctors = await api.get("/doctors");

    const sorteddoctors = fetchedDoctors.data
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => b.isActive - a.isActive);
    console.log(sorteddoctors);
    setDoctors(sorteddoctors);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    function filterdoctors() {
      let filteredArray = [];
      if (doctors) {
        filteredArray = [...doctors];
      }
      if (doctors && searchName) {
        filteredArray = doctors.filter((doctor) =>
          convertToSlug(doctor.name).includes(convertToSlug(searchName))
        );
      } else if (doctors) {
        filteredArray = [...doctors];
      }

      if (doctors && searchPhone) {
        filteredArray = doctors.filter((doctor) =>
          convertToSlug(doctor.phone1).includes(convertToSlug(searchPhone))
        );
      }
      setFilteredDoctors(filteredArray);
    }
    filterdoctors();
  }, [doctors, searchName, searchPhone]);

  return (
    <div className="main-doctors-container">
      <h2 className=" text-center">Medicos</h2>{" "}
      <div className="add-link">
        <Link to="/adicionar-medico" className="link">
          Adicionar Medico
        </Link>
      </div>
      <div className="row">
        <div className="col-md-5 col-lg-3 m-1">
          <input
            placeholder="medico..."
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
            placeholder="celular medico..."
            type="text"
            className="m-1 form-control shadow-none no-border "
            id="searchPhone"
            name="searchPhone"
            onChange={(e) => setSearchPhone(e.target.value)}
            value={searchPhone}
          />
        </div>
      </div>
      <div className="list-doctors-header row">
        <div className=" col-5 col-md-3">NOME</div>
        <div className=" col-5 col-md-3">CELULAR</div>
        <div className=" col-5 col-md-4">EMAIL</div>
        <div className=" col-5 col-md-2">STATUS</div>
      </div>
      {filteredDoctors &&
        filteredDoctors.map((loopedDoctor) => (
          <div
            className="row border-bottom doctors-container "
            key={loopedDoctor.id}
          >
            <Link
              to={`/medico-detalhes/${loopedDoctor.id}`}
              className="link col-5 col-md-3"
            >
              {loopedDoctor.name}
            </Link>
            <div className="col-7 col-md-3">{loopedDoctor.phone1}</div>
            <div className="col-7 col-md-4">{loopedDoctor.email}</div>
            <div className="col-5 col-md-2">
              {loopedDoctor.isActive === true ? (
                <BsCheckCircle className="text-success h5" />
              ) : (
                <BsDashCircle className="text-danger h5" />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default DoctorList;
