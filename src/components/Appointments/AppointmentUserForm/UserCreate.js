import React, { useState } from 'react'

import UserForm from './UserForm'
import { api } from "../../../apis";

function UserCreate({  setToggled }) {
  const [error, setError] = useState()


  async function handleSubmit(values) {
    console.log(values);
    try {
      await api.post("/sign-up", values);
      setToggled(false)
    } catch (err) {
      setError(err.response.data.msg)
      console.error("This is a User Post ERROR", err.response.data.msg);
    }
  }
  
    return (
      <div>
      <h4>Cadastre novo Usuario</h4>
        <UserForm
          handleSubmit={handleSubmit}
          setToggled={setToggled}
          error={error}
        />
        
      </div>
    )
  }

export default UserCreate
