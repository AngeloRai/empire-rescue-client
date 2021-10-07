import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import DoctorForm from "./DoctorForm";
import { api } from "../../apis";
import "./FormDoctor.css";

function DoctorCreate() {
  const history = useHistory();
  const [facilityOptions, setFacilityOptions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  useEffect(() => {
    const fetchFacilitiesSpecialties = async () => {
      try {
        //fetch facilities and specialties to treat and set as dropdown options to associate to registered Doctor
        const fetchedFacilities = await api.get("/facilities");
        const fetchedSpecialties = await api.get("/specialties");
        // treat facilites and specialties selecting only name and id as label and value which is the requested formated for "react-select" library
        let treatedFacilities = [];
        fetchedFacilities.data.forEach((facility) => {
          treatedFacilities.push({
            label: facility.name + " /" + facility.unit,
            value: String(facility.id),
          });
        });
        setFacilityOptions(treatedFacilities);
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

    try {
      const doctor = await api.post("/doctor", {
        specialties: selectedSpecialties,
        facilities: selectedFacilities,
        ...values,
      });
      console.log(values);
      console.log(doctor);
    } catch (err) {
      console.log(err);
    }
    history.push("/medicos");
  };

  return (
    <div className="container">
      <div>
        <h2>Cadastro Medico</h2>
      </div>
      <DoctorForm
        doctor={{isActive: true}}
        handleSubmit={handleSubmit}
        docSpecialties={[]}
        docFacilities={[]}
        specialtyOptions={specialtyOptions}
        facilityOptions={facilityOptions}
        setSelectedSpecialties={setSelectedSpecialties}
        setSelectedFacilities={setSelectedFacilities}
      />
    </div>
  );
}

export default DoctorCreate;
