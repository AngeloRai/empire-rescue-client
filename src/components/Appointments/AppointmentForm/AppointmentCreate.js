import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import AppointmentForm from "./AppointmentForm";
import { api } from "../../../apis";

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
    const fetchFacilitiesSpecialtiesDocs = async () => {
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchFacilitiesSpecialtiesDocs();
  }, [selectedUser, selectedPatient]);

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
        if (selectedUser) {
          setToggleCreateUser(false);
        }
        if (selectedPatient) {
          setToggleCreatePatient(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    updateUserPatients();
  }, [selectedUser, selectedPatient]);

  useEffect(() => {
    //Set doctor options according to specialty and facility selected
    const updateDoctorOptions = async () => {
      let fetchedDocs = [];
      try {
        fetchedDocs = await api.get("/doctors");
        if (!selectedFacility && !selectedSpecialty) {
          setDocOptions(
            fetchedDocs.data.map((doc) => ({
              label: doc.name + " / " + doc.crm,
              value: String(doc.id),
            }))
          );
        }

        if (selectedSpecialty && !selectedFacility) {
          let filteredDoctorsBySpec = [];
          fetchedDocs.data.forEach((doc) => {
            doc.specialties?.forEach((specialty) => {
              if (selectedSpecialty === specialty.id)
                filteredDoctorsBySpec.push(doc);
            });
          });
          setDocOptions(
            filteredDoctorsBySpec.map((doc) => ({
              label: doc.name + " / " + doc.crm,
              value: String(doc.id),
            }))
          );
        }
        if (!selectedSpecialty && selectedFacility) {
          const fetchedFcility = await api.get(`/facility/${selectedFacility}`);

          setDocOptions(
            fetchedFcility.data.doctors.map((doc) => ({
              label: doc.name + " / " + doc.crm,
              value: String(doc.id),
            }))
          );
        }
        if (selectedSpecialty && selectedFacility) {
          let filteredDoctorsBySpecFacil = [];
          const fetchedFacil = await api.get(`/facility/${selectedFacility}`);
          fetchedFacil.data.doctors?.forEach((doc) => {
            doc?.specialties.forEach((special) => {
              if (selectedSpecialty === special.id)
                filteredDoctorsBySpecFacil.push(doc);
            });
          });
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

  useEffect(() => {
    //Fetch or update facility options for dropdown select otptions, if specialty is selected fetch only facilities with selected specitalty
    const updateFacilityOptions = async () => {
      try {
        if (!selectedSpecialty && !selectedDoctor) {
          const fetchedFacilities = await api.get("/facilities-info");
          setFacilityOptions(
            fetchedFacilities.data?.map((facility) => ({
              label: facility.name + " / " + facility.unit,
              value: String(facility.id),
            }))
          );
        }
        if (selectedSpecialty && !selectedDoctor) {
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
        if (selectedDoctor && !selectedSpecialty) {
          const fetchedDoctor = await api.get(`/doctor/${selectedDoctor}`);
          setFacilityOptions(
            fetchedDoctor.data.facilities?.map((facility) => ({
              label: facility.name + " / " + facility.unit,
              value: String(facility.id),
            }))
          );
        }
        if (selectedDoctor && selectedSpecialty) {
          let filteredByDocSpecialty = [];
          const fetchedDoctor = await api.get(`/doctor/${selectedDoctor}`);
          fetchedDoctor.data.facilities?.forEach((fac) => {
            fac.specialties?.forEach((spec) => {
              if (spec.id === selectedSpecialty) {
                filteredByDocSpecialty.push(fac);
              }
            });
          });

          setFacilityOptions(
            filteredByDocSpecialty?.map((facility) => ({
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
    //Update exam options according to facility selected
    const updateExamOptions = async () => {
      if (selectedFacility) {
        const fetchedFacility = await api.get(`/facility/${selectedFacility}`);

        setExamOptions(
          fetchedFacility.data?.exams?.map((exam) => ({
            label: exam.examName,
            value: String(exam.id),
          }))
        );
      }
    };
    updateExamOptions();
  }, [selectedFacility]);


  useEffect(() => {
    //Update specialty options according to facility or doctor selected
    const updateSpecialtyOptions = async () => {
      if (selectedFacility && !selectedDoctor) {
        const fetchedFacility = await api.get(`/facility/${selectedFacility}`);

        setSpecialtyOptions(
          fetchedFacility.data.specialties?.map((spec) => ({
            label: spec.name,
            value: String(spec.id),
          }))
        );
      }
      if (!selectedFacility && selectedDoctor) {
        const fetchedDoctor = await api.get(`/doctor/${selectedDoctor}`);

        setSpecialtyOptions(
          fetchedDoctor.data.specialties?.map((spec) => ({
            label: spec.name,
            value: String(spec.id),
          }))
        );
      }
      // let filteredSpecialtyByDocFacility = []
      // if (selectedFacility && selectedDoctor) {
      //   const fetchedFacility = await api.get(`/facility/${selectedFacility}`);

      //   fetchedFacility.data.specialties?.forEach((specialty) => {
      //     doc?.specialties.forEach((special) => {
      //       if (selectedSpecialty === special.id)
      //         filteredDoctorsBySpecFacil.push(doc);
      //     });
      //   });
      //   setSpecialtyOptions(
      //     fetchedDoctor.data.specialties?.map((spec) => ({
      //       label: spec.name,
      //       value: String(spec.id),
      //     }))
      //   );
      // }
    };
    updateSpecialtyOptions();
  }, [selectedFacility, selectedDoctor]);

  const handleSubmit = async (values) => {
    console.log({
      patientId: selectedPatient,
      facilityId: selectedFacility,
      doctorId: selectedDoctor,
      specialtyId: selectedSpecialty,
      examId: selectedExam,
      appointmentType: selectedAppointType,
      ...values,
    });
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
    //history.push("/agendamentos");
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
        <h2>Gerar Agendamento</h2>
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
