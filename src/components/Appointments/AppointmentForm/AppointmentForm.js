import React from "react";
import { Formik, Form } from "formik";
import "./AppointmentForm.css";
import Users from "../../Users/Users";
import Patients from "../../Patients/Patients";
import AppointmentStatus from "./AppointmentStatus";
import AppointmentDateTime from "./AppointmentDateTime";
import AppointmentDoctor from "./AppointmentDoctor";
import AppointmentFacility from "./AppointmentFacility";
import AppointmentSpecialty from "./AppointmentSpecialty";
import AppointmentType from "./AppointmentType";
import AppointmentPatient from "./AppointmentPatient";
import AppointmentUser from "./AppointmentUser";
import DisplayPatient from "./DisplayPatient";
import AppintmentExam from "./AppintmentExam";

function DoctorForm({
  handleSubmit,
  users,
  selectedUser,
  setSelectedUser,
  patient,
  patients,
  setSelectedPatient,
  specialtyOptions,
  setSelectedSpecialty,
  setSelectedFacility,
  setDocOptions,
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
}) {
  return (
    <div>
      {toggleCreateUser && !toggleCreatePatient && (
        <Users setToggled={setToggleCreateUser} />
      )}
      {toggleCreatePatient && !toggleCreateUser && (
        <Patients
          address={[]}
          patient={patient}
          setToggled={setToggleCreatePatient}
          toggled={toggleCreatePatient}
          userId={selectedUser}
        />
      )}

      <Formik
        initialValues={{
          status: "pendente",
          dateTime: "date",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="row">
              <hr />
              <AppointmentUser
                users={users}
                setSelectedUser={setSelectedUser}
                handleNewUserToggle={handleNewUserToggle}
                defaultValue={[]}
              />

              <AppointmentPatient
                patients={patients}
                selectedUser={selectedUser}
                setSelectedPatient={setSelectedPatient}
                handleToggleNewPatient={handleToggleNewPatient}
                showMessage={showMessage}
                defaultValue={[]}
              />
              {/* When patient is selected, patient info is displayed props coming from AppointmentCreate and sent to DisplayPatient */}
              {selectedPatient && displaySelectedPatient && (
                <DisplayPatient
                  displaySelectedPatient={displaySelectedPatient}
                />
              )}

              <AppointmentType
                setSelectedAppointType={setSelectedAppointType}
                defaultValue={[]}
              />

              {selectedAppointType === "exame" && (
                <AppintmentExam
                  examOptions={examOptions}
                  setSelectedExam={setSelectedExam}
                />
              )}

              {selectedAppointType === "consulta" && (
                <AppointmentSpecialty
                  specialtyOptions={specialtyOptions}
                  setSelectedSpecialty={setSelectedSpecialty}
                  defaultValue={[]}
                />
              )}

              {selectedAppointType && <AppointmentFacility
                facilityOptions={facilityOptions}
                setSelectedFacility={setSelectedFacility}
                defaultValue={[]}
              />}

              {selectedAppointType === "consulta" && (
                <AppointmentDoctor
                  docOptions={docOptions}
                  setSelectedDoctor={setSelectedDoctor}
                  defaultValue={[]}
                />
              )}

              {selectedAppointType && <AppointmentDateTime
                setFieldValue={setFieldValue}
                values={values}
              />}
              
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
