import React, { useState, useEffect } from "react";
import { api } from "../../../apis";
import { Link, useHistory } from "react-router-dom";
import AppointmentsListCard from "./AppointmentsListCard";
import ConfirmationModal from "../../componentHelpers/ConfirmationModal";
import { convertToSlug } from "../../componentHelpers/slugify";
import AppointmentListFilter from "./AppointmentListFilter";
import moment from "moment";
moment.locale("pt-br");

function AppointmentList() {
  const history = useHistory();
  const [appointments, setAppointments] = useState([]);
  const [, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [appointmentId, setAppointmentId] = useState();
  const [appointmentType, setAppointmentType] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchFacility, setSearchFacility] = useState("");
  const [searchPatient, setSearchPatient] = useState("");
  const [searchStatus, setSearchStatus] = useState("all");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        if (!appointmentType) {
          const fetchedAppointments = await api.get("/appointments");
          setAppointments(fetchedAppointments.data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppointments();
  }, [showModal, appointmentType]);

  useEffect(() => {
    const fetchAppointmentsByType = async () => {
      setLoading(true);
      try {
        if (appointmentType) {
          const fetchedAppointmentsByType = await api.get(
            `/appointments-type/${appointmentType}`
          );
          setAppointments(fetchedAppointmentsByType.data);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchAppointmentsByType();
  }, [appointmentType]);

  useEffect(() => {
    async function filterFacilities() {
      setLoading(true);
      try {
        let filteredArray = [];
        if (appointments && searchFacility) {
          filteredArray = [...appointments];
          filteredArray = appointments.filter((appointment) =>
            convertToSlug(appointment.facility.name).includes(
              convertToSlug(searchFacility)
            )
          );
        } else if (appointments) {
          filteredArray = [...appointments];
        }

        if (searchPatient) {
          filteredArray = filteredArray.filter((appointment) => {
              return appointment?.patient !== null && convertToSlug(appointment?.patient?.name)?.includes(
                convertToSlug(searchPatient)
              );
          });
        }

        if (searchStatus === "pendente") {
          filteredArray = filteredArray.filter(
            (appointment) => appointment.status === "pendente"
          );
        }

        if (searchStatus === "informado") {
          filteredArray = filteredArray.filter(
            (appointment) => appointment.status === "informado"
          );
        }
        if (searchStatus === "realizado") {
          filteredArray = filteredArray.filter(
            (appointment) => appointment.status === "realizado"
          );
        }
        if (searchStatus === "ausente") {
          filteredArray = filteredArray.filter(
            (appointment) => appointment.status === "ausente"
          );
        }
        if (searchStatus === "all") {
          setSearchStatus("");
        }

        setFilteredAppointments([...filteredArray]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    filterFacilities();
  }, [searchFacility, appointments, searchPatient, searchStatus]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/appointment-delete/${id}`);
      setShowModal(false);
      history.push("/agendamentos");
    } catch (err) {
      console.error(err);
    }
  };

  const setShowAll = () => {
    setAppointmentType("");
    setSearchFacility("");
    setSearchPatient("");
  };

  const setShowModalDelete = (id) => {
    setShowModal(true);
    setAppointmentId(id);
  };

  return (
    <div className="m-3">
      <div className="row">
        <div className="col-5">
          <div className="appointment-add-link">
            <Link to="/gerar-agendamento" className="appointment-link">
              Novo Agendamento
            </Link>
          </div>
        </div>

        <h2 className="mb-3 col-6">Agendamentos</h2>
      </div>

      <AppointmentListFilter
        setAppointmentType={setAppointmentType}
        setSearchFacility={setSearchFacility}
        setSearchPatient={setSearchPatient}
        searchPatient={searchPatient}
        searchFacility={searchFacility}
        setSearchStatus={setSearchStatus}
        setShowAll={setShowAll}
      />
      <div className="row">
        {filteredAppointments &&
          filteredAppointments.map((appointment) => (
            <AppointmentsListCard
              key={appointment.id}
              appointment={appointment}
              facility={appointment.facility}
              patient={appointment.patient}
              handleDelete={handleDelete}
              setShowModal={setShowModal}
              setShowModalDelete={setShowModalDelete}
            />
          ))}
        {appointments &&
          !filteredAppointments &&
          appointments.map((appointment) => (
            <AppointmentsListCard
              key={appointment.id}
              appointment={appointment}
              facility={appointment.facility}
              patient={appointment.patient}
              handleDelete={handleDelete}
              setShowModal={setShowModal}
              setShowModalDelete={setShowModalDelete}
            />
          ))}
      </div>
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() => handleDelete(appointmentId)}
        title={`Tem certeza de que deseja excluir este agendamento?`}
      >
        <p>Esta ação é irreversível! Clique em "Confirmar" para excluir.</p>
      </ConfirmationModal>
    </div>
  );
}

export default AppointmentList;
