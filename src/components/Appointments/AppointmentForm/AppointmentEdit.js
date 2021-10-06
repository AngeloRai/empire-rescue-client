import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import AppointmentForm from "./AppointmentForm";
import { api } from "../../../apis";
import Spinner from "react-bootstrap/Spinner";

function AppointmentEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

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
  const [user, setUser] = useState([]);
  const [patient, setPatient] = useState([]);
  const [appointType, setAppointType] = useState([]);
  const [exam, setExam] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [facility, setFacility] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [dateTime, setDateTime] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      const fetchedAppointment = await api.get(`/appointment/${id}`);
      const appointment = fetchedAppointment.data;
      if (appointment.patient.userId !== null) {
        setSelectedUser(appointment.patient.user.id);
        setUser([
          {
            label: appointment.patient.user.email,
            value: String(appointment.patient.user.id),
          },
        ]);
      }
      if (appointment.patientId !== null) {
        setSelectedPatient(appointment.patient.id);
        setPatient([
          {
            label: appointment.patient.name,
            value: String(appointment.patient.id),
          },
        ]);
      }
      if (appointment.appointmentType !== null) {
        setSelectedAppointType(appointment.appointmentType);
        setAppointType([
          {
            label: appointment.appointmentType,
            value: appointment.appointmentType,
          },
        ]);
      }
      if (appointment.exam !== null) {
        setSelectedExam(appointment.exam.id);
        setExam([
          {
            label: appointment.exam.examName || "",
            value: String(appointment.exam.id) || "",
          },
        ]);
      } else {
        setSelectedExam(null);
      }
      if (appointment.specialtyId !== null) {
        setSelectedSpecialty(appointment.specialty.id);
        setSpecialty([
          {
            label: appointment.specialty.name,
            value: String(appointment.specialty.id),
          },
        ]);
      }
      if (appointment.facilityId !== null) {
        setSelectedFacility(appointment.facility.id);
        setFacility([
          {
            label: appointment.facility.name,
            value: String(appointment.facility.id),
          },
        ]);
      }
      if (appointment.doctorId !== null) {
        setSelectedDoctor(appointment.doctor.id);
        setDoctor([
          {
            label: appointment.doctor.name,
            value: String(appointment.doctor.id),
          },
        ]);
      }
      if (appointment.dateTime !== null) {
        setDateTime(appointment.dateTime.substring(0, 16));
      }
      if (appointment.status !== null) {
        setStatus(appointment.status);
      }
      setLoading(false);
    };

    fetchAppointment();
  }, [id]);

  useEffect(() => {
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
    //Fetch facility options for dropdown select otptions, only facilities with selected specitalty
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
      await api.put(`/appointment-update/${id}`, {
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
        <h2>Editar Agendamento</h2>
      </div>
      {loading && (
        <div>
          <Spinner animation="border" role="status"></Spinner>
          <span className="">Loading...</span>
        </div>
      )}
      {!loading && (
        <AppointmentForm
          users={users}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
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
          user={user}
          patient={patient}
          appointType={appointType}
          exam={exam}
          specialty={specialty}
          facility={facility}
          doctor={doctor}
          dateTime={dateTime}
          status={status}
        />
      )}
    </div>
  );
}

export default AppointmentEdit;
