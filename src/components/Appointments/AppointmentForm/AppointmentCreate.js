import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import AppointmentForm from "./AppointmentForm";
import { api } from "../../../apis";
//this component is responsible for fetching all data and process the selectable options for React Select library component
// responsible for posting new appointment with post request receiving data from the AppointmentForm component
function AppointmentCreate() {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedAppointType, setSelectedAppointType] = useState("");
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState();
  const [selectedFacility, setSelectedFacility] = useState();
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [facilityOptions, setFacilityOptions] = useState([]);
  const [docOptions, setDocOptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
  const [displaySelectedPatient, setDisplaySelectedPatient] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [selectedExam, setSelectedExam] = useState();
  const [examOptions, setExamOptions] = useState(false);
  const [toggleCreateUser, setToggleCreateUser] = useState(false);
  const [toggleCreatePatient, setToggleCreatePatient] = useState(false);

  useEffect(() => {
    //fetch and process users, specialties and exams which are necessary to make other options of the form available
    // other options of the form are processed once these initial options are selected
    const fetchSpecialtiesExamsUsers = async () => {
      try {
        const fetchedUsers = await api.get("/users");
        const fetchedSpecialties = await api.get("/specialties");

        const fetchedExams = await api.get("/exams");

        setUsers(
          fetchedUsers.data.map((user) => ({
            label: user.email,
            value: String(user.id),
          }))
        );
        setSpecialtyOptions(
          fetchedSpecialties.data.map((specialty) => ({
            label: specialty.name,
            value: String(specialty.id),
          }))
        );
        setExamOptions(
          fetchedExams.data.map((exam) => ({
            label: exam.examName,
            value: String(exam.id),
          }))
        );
        if (selectedSpecialty) {
          setDocOptions([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSpecialtiesExamsUsers();
  }, [selectedUser, selectedPatient, selectedSpecialty]);

  useEffect(() => {
    // Fetch patients according to user selected, list of patients is only avaible after user is selected
    const updateUserPatients = async () => {
      try {
        if (selectedUser) {
          const fetchedPatients = await api.get(
            `/user-patients/${selectedUser}`
          );
          setPatients(
            fetchedPatients.data.map((patient) => ({
              label: patient.name,
              value: String(patient.id),
            }))
          );
          setDisplaySelectedPatient(
            fetchedPatients.data.filter(
              (patient) => patient.id === selectedPatient
            )
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    updateUserPatients();
  }, [selectedUser, selectedPatient, toggleCreatePatient]);

  useEffect(() => {
    //Fetch facility options for dropdown select options, only facilities with selected specitalty
    const updateFacilityOptions = async () => {
      try {
        if (selectedSpecialty) {

          const fetchedFacilityBySpecialty = await api.get(
            `/specialty/${selectedSpecialty}`
          );
          setFacilityOptions(
            fetchedFacilityBySpecialty.data.facilities?.map((facility) => ({
              label: facility.name + " / " + facility.unit,
              value: String(facility.id),
            }))
          );

        }
        if (selectedExam) {

          const fetchedExam = await api.get(`/exam/${selectedExam}`);
          setFacilityOptions(
            fetchedExam.data?.facilities?.map((facility) => ({
              label: facility.name + " / " + facility.unit,
              value: String(facility.id),
            }))
          );

        }
      } catch (err) {
        console.log(err);
      }
    };
    updateFacilityOptions();
  }, [selectedSpecialty, selectedDoctor, selectedExam]);

  useEffect(() => {
    //Set doctor options according to facility selected
    const updateDoctorOptions = async () => {
      try {
        if (selectedFacility) {
          const fetchedFacil = await api.get(`/facility/${selectedFacility}`);
          let filteredDoctorsBySpecFacil = fetchedFacil.data.doctors.filter(
            (doc) =>
              doc.specialties.map(
                (specialty) => specialty.id === selectedSpecialty
              )
          );
          console.log(filteredDoctorsBySpecFacil);
          setDocOptions(
            filteredDoctorsBySpecFacil.map((doc) => ({
              label: doc.name + " / " + doc.crm,
              value: String(doc.id),
            }))
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    updateDoctorOptions();
  }, [selectedFacility, selectedSpecialty]);
// post request to generate new appointment 
  const handleSubmit = async (values) => {

    try {
      await api.post("/appointment", {
        patientId: selectedPatient,
        facilityId: selectedFacility,
        doctorId: selectedDoctor,
        specialtyId: selectedSpecialty,
        examId: selectedExam,
        appointmentType: selectedAppointType,
        ...values,
      });
    } catch (err) {
      console.log(err);
    }
    history.push("/agendamentos");
  };

  const handleNewUserToggle = () => {
    setToggleCreatePatient(false);
    setToggleCreateUser(!toggleCreateUser);
  };

  const handleToggleNewPatient = () => {
    if (selectedUser) {
      setToggleCreateUser(false);
      setToggleCreatePatient(!toggleCreatePatient);
    } else {
      setShowMessage(true);
    }
  };

  return (
    <div className="container m-3">
      <div className="m-3 text-center">
        <h2>Novo Agendamento</h2>
      </div>

      <AppointmentForm
        users={users}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        patient={[]}
        patients={patients}
        handleSubmit={handleSubmit}
        setSelectedPatient={setSelectedPatient}
        setSelectedAppointType={setSelectedAppointType}
        selectedAppointType={selectedAppointType}
        specialtyOptions={specialtyOptions}
        setSelectedFacility={setSelectedFacility}
        setSelectedExam={setSelectedExam}
        examOptions={examOptions}
        facilityOptions={facilityOptions}
        docOptions={docOptions}
        setSelectedDoctor={setSelectedDoctor}
        setDocOptions={setDocOptions}
        setSelectedSpecialty={setSelectedSpecialty}
        toggleCreateUser={toggleCreateUser}
        handleNewUserToggle={handleNewUserToggle}
        setToggleCreateUser={setToggleCreateUser}
        setToggleCreatePatient={setToggleCreatePatient}
        toggleCreatePatient={toggleCreatePatient}
        handleToggleNewPatient={handleToggleNewPatient}
        showMessage={showMessage}
        displaySelectedPatient={displaySelectedPatient}
        selectedPatient={selectedPatient}
      />
    </div>
  );
}

export default AppointmentCreate;
