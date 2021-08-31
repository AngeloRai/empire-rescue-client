import React from 'react'

import UserForm from './UserForm'
import { api } from "../../apis";

function Users({  setToggled }) {


  
  async function handleSubmit(values) {
    console.log(values);
    try {
      await api.post("/sign-up", values);
      setToggled(false)
    } catch (err) {
      console.error("This is a User Post ERROR", err);
    }
  }
  
    return (
      <div>
      <h4>Cadastre novo Usuario</h4>
        <UserForm
          handleSubmit={handleSubmit}
          setToggled={setToggled}
        />
        
      </div>
    )
  }

export default Users
