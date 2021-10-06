import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import UserEditForm from "./UserEditForm";
import { api } from "../../../apis";

function UserEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [user, setuser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await api.get(`/user/${id}`);
      setuser(fetchedUser.data);
      console.log(fetchedUser.data);
    };
    fetchUser();
  }, [id]);

  async function handleSubmit(values) {
    console.log(values);
    try {
      await api.put(`/user-update/${id}`, values);

      history.push("/usuarios");
    } catch (err) {
      console.error("This is a User Post ERROR", err);
    }
  }
  return (
    <div className="m-3">
      <h3 className="text-center">Editar Usuario</h3>
      {user.email && (
        <UserEditForm
          handleSubmit={handleSubmit}
          user={user}
        />
      )}
    </div>
  );
}

export default UserEdit;
