import React, { useState, useEffect } from "react";
import { api } from "../../apis";
import { Link } from "react-router-dom";
import AppointmentsListCard from "./AppointmentsListCard";

function AppointmentList() {
  const [appointments, setAppointments] = useState();
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      const fetchedAppointments = await api.get("/appointments");
      setAppointments(fetchedAppointments.data);
      setLoading(false)
      console.log(fetchedAppointments.data);
    };
    fetchAppointments();
  }, []);

  return (
    <div className="m-2">
    <h2 className="m-4">Agendamentos</h2>
    <div className="add-link">
        <Link to="/gerar-agendamento" className="link">
          Gerar Agendamento
        </Link>
      </div>
      <div className="row">
        {appointments && appointments.map((appointment) => (
          
        <AppointmentsListCard
          appointment={appointment}
          facility={appointment.facility}
          patient={appointment.patient}
        />
        ))}
      </div>
    </div>
  );
}

export default AppointmentList;
