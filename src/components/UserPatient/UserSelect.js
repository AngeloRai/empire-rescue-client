import React, { useEffect, useState } from "react";
import Select from "react-select";
import { api } from "../../apis";
import { IoAdd } from "react-icons/io5";

function UserSelect({ setSelectedUser, setNewUserToggle, newUserToggle }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchSpecialtiesExamsUsers = async () => {
      try {
        const fetchedUsers = await api.get("/users");

        setUsers(
          fetchedUsers.data.map((user) => ({
            label: user.email,
            value: String(user.id),
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchSpecialtiesExamsUsers();
  }, [newUserToggle]);

  return (
    <div className="form-group m-1 col-8 col-lg-5 border p-3">
      <label htmlFor="registerUser">
        <h5>Usuario</h5>
      </label>
      <h6 className="text-secondary">Selecione um usuario</h6>
      <Select
        noOptionsMessage={() =>
          "Ususario não cadastrado! Cadastre um novo Usuario"
        }
        isClearable={true}
        placeholder="selecione..."
        defaultValue={[]}
        onChange={(item) => setSelectedUser(Number(item?.value))}
        options={users}
        className="basic-multi-select field-box "
        classNamePrefix="select"
      />
      <div className="d-flex">
        <h6 className="text-secondary">Cadastrar novo usuario</h6>
        <div onClick={() => setNewUserToggle(!newUserToggle)}>
          <IoAdd className="text-secondary plus-icon h4" />
        </div>
      </div>
    </div>
  );
}

export default UserSelect;
