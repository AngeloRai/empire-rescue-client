import React from "react";
import { Formik, Form } from "formik";
import moment from "moment";
import "./AppointmentForm.css";
import UserCreate from "../AppointmentUserForm/UserCreate";
import PatientCreate from "../../UserPatient/Patients/PatientCreate";
import AppointmentStatus from "./AppointmentStatus";
import AppointmentDateTime from "./AppointmentDateTime";
import AppointmentDoctor from "./AppointmentDoctor";
import AppointmentFacility from "./AppointmentFacility";
import AppointmentSpecialty from "./AppointmentSpecialty";
import AppointmentType from "./AppointmentType";
import AppointmentPatient from "./AppointmentPatient";
import AppointmentUser from "./AppointmentUser";
import DisplayPatient from "./DisplayPatient";
import AppintmentExam from "./AppointmentExam";

function DoctorForm({
  handleSubmit,
  users,
  selectedUser,
  setSelectedUser,
  patients,
  setSelectedPatient,
  specialtyOptions,
  setSelectedSpecialty,
  setSelectedFacility,
  facilityOptions,
  docOptions,
  setSelectedAppointType,
  toggleCreateUser,
  setToggleCreateUser,
  handleNewUserToggle,
  toggleCreatePatient,
  setToggleCreatePatient,
  handleToggleNewPatient,
  showMessage,
  displaySelectedPatient,
  selectedPatient,
  setSelectedDoctor,
  setSelectedExam,
  examOptions,
  selectedAppointType,
  user,
  patient,
  appointType,
  exam,
  specialty,
  facility,
  doctor,
  dateTime,
  status,
}) {

  return (
    <div>
      {toggleCreateUser && !toggleCreatePatient && (
        <UserCreate setToggled={setToggleCreateUser} />
      )}
      {toggleCreatePatient && !toggleCreateUser && (
        <PatientCreate
          address={[]}
          patient={[]}
          setToggled={setToggleCreatePatient}
          toggled={toggleCreatePatient}
          userId={selectedUser}
        />
      )}

      <Formik
        initialValues={{
          status: status || "pendente",
          dateTime: dateTime || "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          const treatedValues = {
            status: values.status,
            dateTime: moment(values.dateTime).subtract(3, "hours").format() || "",
          }
          
          handleSubmit(treatedValues);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="row">
              <hr />
              <AppointmentUser
                user={user}
                users={users}
                setSelectedUser={setSelectedUser}
                handleNewUserToggle={handleNewUserToggle}
                defaultValue={[]}
              />

              <AppointmentPatient
                patients={patients}
                patient={patient}
                selectedUser={selectedUser}
                setSelectedPatient={setSelectedPatient}
                handleToggleNewPatient={handleToggleNewPatient}
                showMessage={showMessage}
                
              />
              {/* When patient is selected, patient info is displayed props coming from AppointmentCreate and sent to DisplayPatient */}
              {selectedPatient && displaySelectedPatient && (
                <DisplayPatient
                  displaySelectedPatient={displaySelectedPatient}
                />
              )}

             {selectedPatient && <AppointmentType
                setSelectedAppointType={setSelectedAppointType}
                appointType={appointType}
              />}

              {selectedPatient && selectedAppointType === "exame" && (
                <AppintmentExam
                  examOptions={examOptions}
                  setSelectedExam={setSelectedExam}
                  exam={exam}
                />
              )}

              {selectedPatient && selectedAppointType === "consulta" && (
                <AppointmentSpecialty
                  specialtyOptions={specialtyOptions}
                  setSelectedSpecialty={setSelectedSpecialty}
                  specialty={specialty}
                />
              )}

              {selectedAppointType && (
                <AppointmentFacility
                  facilityOptions={facilityOptions}
                  setSelectedFacility={setSelectedFacility}
                  facility={facility}
                />
              )}

              {selectedAppointType === "consulta" && (
                <AppointmentDoctor
                  docOptions={docOptions}
                  setSelectedDoctor={setSelectedDoctor}
                  doctor={doctor}
                />
              )}

              {selectedAppointType && (
                <AppointmentDateTime
                  setFieldValue={setFieldValue}
                  values={values}
                  dateTime={dateTime}
                />
              )}

              {selectedAppointType && <AppointmentStatus />}
            </div>

            <div className="edit-buttons-box">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                <div>
                  {isSubmitting ? <span>Loading</span> : <span>Enviar</span>}
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DoctorForm;
