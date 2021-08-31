import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import FacilityForm from "./FacilityForm/FacilityForm";
import { api } from "../../apis";
import "./FacilityForm/FacilityForm.css";

function FacilityCreate() {
  const history = useHistory();
  const [examOtions, setExamOtions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  useEffect(() => {
    const fetchFacilitiesSpecialties = async () => {
      try {
        //fetch facilities and specialties to treat and set as dropdown options to associate to registered Doctor
        const fetchedExams = await api.get("/exams");
        const fetchedSpecialties = await api.get("/specialties");
        // treat facilites and specialties selecting only name and id as label and value which is the requested formated for "react-select" library
        let treatedExams = [];
        fetchedExams.data.forEach((exam) => {
          treatedExams.push({
            label: exam.examName,
            value: String(exam.id),
          });
        });
        setExamOtions(treatedExams);
        let treatedSpecialties = [];
        fetchedSpecialties.data.forEach((specialty) => {
          treatedSpecialties.push({
            label: specialty.name,
            value: String(specialty.id),
          });
        });
        setSpecialtyOptions(treatedSpecialties);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFacilitiesSpecialties();
  }, []);

  const handleSubmit = async (values) => {
    
    console.log(values)
    try {
      await api.post("/facility", {
        specialties: selectedSpecialties,
        exams: selectedExams,
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
        <h2>Cadastro Estabelecimento</h2>
      </div>
      <FacilityForm
        facility={[]}
        address={[]}
        handleSubmit={handleSubmit}
        facilitySpecialties={[]}
        facilityExams={[]}
        specialtyOptions={specialtyOptions}
        examOtions={examOtions}
        setSelectedSpecialties={setSelectedSpecialties}
        setSelectedExams={setSelectedExams}
      />
    </div>
  );
}

export default FacilityCreate;
