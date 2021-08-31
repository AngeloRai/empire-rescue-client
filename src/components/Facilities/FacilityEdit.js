import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import FacilityForm from "./FacilityForm/FacilityForm";
import { api } from "../../apis";
import "./FacilityForm/FacilityForm.css";

function FacilityCreate() {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [facility, setFacility] = useState([]);
  const [examOtions, setExamOtions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [facilitySpecialties, setFacilitySpecialties] = useState([]);
  const [facilityExams, setFacilityExams] = useState([]);

  useEffect(() => {
    const fetchFacilitiesSpecialties = async () => {
      try {
        //fetch facilities and specialties to treat and set as dropdown options to associate to registered Doctor
        const fetchedExams = await api.get("/exams");
        const fetchedSpecialties = await api.get("/specialties");
        const fetchedFacility = await api.get(`/facility/${id}`);
        // treat facilites and specialties selecting only name and id as label and value which is the requested formated for "react-select" library
        let treatedExams = [];
        fetchedExams.data.forEach((exam) => {
          treatedExams.push({
            label: exam.examName,
            value: String(exam.id),
          });
        });
        let treatedSpecialties = [];
        fetchedSpecialties.data.forEach((specialty) => {
          treatedSpecialties.push({
            label: specialty.name,
            value: String(specialty.id),
          });
        });
        let facExams = [];
        fetchedFacility.data.exams.forEach((exam) => {
          facExams.push({
            label: exam.examName,
            value: String(exam.id),
          });
        });
        let facSpecialties = [];
        fetchedFacility.data.specialties.forEach((specialty) => {
          facSpecialties.push({
            label: specialty.name,
            value: String(specialty.id),
          });
        });
        setExamOtions(treatedExams);
        setSpecialtyOptions(treatedSpecialties);
        setFacility(fetchedFacility.data);
        setFacilityExams(facExams);
        setFacilitySpecialties(facSpecialties);
        setSelectedExams(facExams.map(x => Number(x.value)));
        setSelectedSpecialties(facSpecialties.map(x => Number(x.value)));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFacilitiesSpecialties();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      console.log("exams");
      console.log(selectedExams);
      console.log("specailties");
      console.log(selectedSpecialties);
      await api.put(`/facility-update/${id}`, {
        specialties: selectedSpecialties.length ? selectedSpecialties : [0],
        exams: selectedExams.length ? selectedExams : [0],
        ...values,
      });
    } catch (err) {
      console.log(err);
    }
    history.push("/estabelecimentos");
    console.log(values);
  };

  return (
    <div className="container">
      <div>
        <h2>Editar Estabelecimento</h2>
      </div>
      {!loading && (
        <FacilityForm
          facility={facility}
          address={facility.address}
          handleSubmit={handleSubmit}
          facilitySpecialties={facilitySpecialties}
          facilityExams={facilityExams}
          specialtyOptions={specialtyOptions}
          examOtions={examOtions}
          setSelectedSpecialties={setSelectedSpecialties}
          setSelectedExams={setSelectedExams}
        />
      )}
    </div>
  );
}

export default FacilityCreate;
