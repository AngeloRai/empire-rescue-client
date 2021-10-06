import React from "react";
import { Formik, Form, Field } from "formik";

import "./UserForm.css";

function UserEditForm({ handleSubmit, user }) {
  return (
    <div className="container">
      <Formik
        initialValues={{
          email: user?.email || "",
          role: user?.role || "USER",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              {user.email && (
                <div className="form-group m-3 col-10 col-md-6">
                  <strong>Email:</strong> {user.email}
                </div>
              )}
              <div className="m-2">
                <Field
                  className="mx-2 "
                  type="radio"
                  name="role"
                  value="USER"
                />
                <label className="m-2">
                  <h6>USUARIO</h6>
                </label>
                <Field
                  className="mx-2"
                  type="radio"
                  name="role"
                  value="ADMIN"
                />

                <label className="m-2">
                  <h6>ADMINISTRADOR</h6>
                </label>
              </div>

              <div className="edit-buttons-box col-10 col-md-6 m-4">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSubmitting || !values.email}
                >
                  <div>
                    {isSubmitting ? <span>Loading</span> : <span>Salvar</span>}
                  </div>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserEditForm;
