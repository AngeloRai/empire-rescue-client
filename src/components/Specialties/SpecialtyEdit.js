import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";

import FormSpecialty from './FormSpecialty'
import { api } from "../../apis";

function SpecialtyEdit() {

const { id } = useParams()
const history = useHistory();
const [specialty, setSpecialty] = useState()

useEffect(() => {
  async function fetchSpecialty() {
    const fetchedSpecialty = await api.get(`/specialty/${id}`)
    setSpecialty(fetchedSpecialty.data)
  }
  fetchSpecialty()
}, [id])


async function handleSubmit(values) {
  console.log(values);
  try {
    await api.put(`/specialty-update/${id}`, values);

    history.push("/especialidades");
  } catch (err) {
    console.error("This is Specialty Edit Put ERROR", err);
  }
}

  return (
    <div>
    <h2>Editar Especialidade</h2>
      {specialty && <FormSpecialty
        handleSubmit={handleSubmit}
        specialty={specialty}
      />}
    </div>
  )
}

export default SpecialtyEdit
