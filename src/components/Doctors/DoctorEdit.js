import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { api } from "../../apis";
import DoctorForm from "./DoctorForm";
import "./FormDoctor.css";

function DoctorEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [doctor, setDoctor] = useState([]);
  const [facilityOptions, setFacilityOptions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [docSpecialties, setDocSpecialties] = useState([]);
  const [docFacilities, setDocFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFacilitiesSpecialties = async () => {
      try {
        setLoading(true);
        //fetch facilities and specialties to treat and set as dropdown options to associate to registered Doctor
        const fetchedFacilities = await api.get("/facilities");
        const fetchedSpecialties = await api.get("/specialties");
        const fetchedDoctor = await api.get(`/doctor/${id}`);
        // treat facilites and specialties selecting only name and id as label and value which is the requested formated for "react-select" library
        let treatedFacilities = [];
        fetchedFacilities.data.forEach((facility) => {
          treatedFacilities.push({
            label: facility.name + " /" + facility.unit,
            value: String(facility.id),
          });
        });
        let treatedSpecialties = [];
        fetchedSpecialties.data.forEach((specialty) => {
          treatedSpecialties.push({
            label: specialty.name,
            value: String(specialty.id),
          });
        });
        let docFacilities = [];
        fetchedDoctor.data.facilities.forEach((facility) => {
          docFacilities.push({
            label: facility.name + " /" + facility.unit,
            value: String(facility.id),
          });
        });
        let docSpecialties = [];
        fetchedDoctor.data.specialties.forEach((specialty) => {
          docSpecialties.push({
            label: specialty.name,
            value: String(specialty.id),
          });
        });
        setSelectedFacilities(docFacilities.map(x => Number(x.value)));
        setSelectedSpecialties(docSpecialties.map(x => Number(x.value)));
        setDocFacilities(docFacilities);
        setDocSpecialties(docSpecialties);
        setFacilityOptions(treatedFacilities);
        setSpecialtyOptions(treatedSpecialties);
        setDoctor(fetchedDoctor.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFacilitiesSpecialties();
  }, [id]);


  const handleSubmit = async (values) => {
   
    //extract ids only from speacilaties and facilties  to send to post request
    try {
      
      await api.put(`/doctor-update/${id}`, {
        specialties: selectedSpecialties.length ? selectedSpecialties : [0],
        facilities: selectedFacilities.length ? selectedFacilities : [0],
        ...values,
      });
    } catch (err) {
      console.log(err);
    }
    history.push("/medicos");
  };

  return (
    <div className="container">
      {!loading && (
        <div>
          <h2>Editar Dr(a). {doctor.name}</h2>
          <DoctorForm
            doctor={doctor}
            handleSubmit={handleSubmit}
            docSpecialties={docSpecialties}
            docFacilities={docFacilities}
            specialtyOptions={specialtyOptions}
            facilityOptions={facilityOptions}
            setSelectedSpecialties={setSelectedSpecialties}
            setSelectedFacilities={setSelectedFacilities}
          />
        </div>
      )}
    </div>
  );
}

export default DoctorEdit;
