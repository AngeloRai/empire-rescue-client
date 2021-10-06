import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router';
import PatientForm from './PatientForm';
import { api } from "../../../apis";

function PatientEdit() {
  const { id } = useParams()
  const history = useHistory()
  const [patient, setPatient] = useState([])

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await api.get(`/patient/${id}`)
      setPatient(fetchedPatient.data)
      console.log(fetchedPatient.data);
    }
    fetchPatient()
  }, [id])

  async function handleSubmit(values) {
    console.log(values);
    try {
      await api.put(`/patient/${id}`, values);
      
      history.push('/pacientes')
      
    } catch (err) {
      console.error("This is a Patient Post ERROR", err);
    }
  }
    return (
      <div className="m-3">
                    <h3 className="text-center">Editar Paciente</h3>
        {patient.name && <PatientForm
          handleSubmit={handleSubmit}
          address={patient.address}
          patient={patient}
          isPatientUserForm={false}
        />}
      </div>
    )

  }

export default PatientEdit