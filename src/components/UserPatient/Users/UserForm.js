import * as Yup from "yup";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./UserForm.css";
import InputFeedback from "../../componentHelpers/InputFeedback";

function UserForm({ handleSubmit, setToggled, isUserForm, user, isEdit }) {
  const userValidation = Yup.object().shape({
    email: Yup.string()
      .email("Por favor informe email valido.")
      .required("Por favor informe um email."),
    confirmPassword: Yup.string().required("Inserir Senha."),
    password: Yup.string().required("Confirmar Senha").when("confirmPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("confirmPassword")],
        "Senha deve ser igual"
      ),
    }),
  });

  return (
    <div className="container">
      <Formik
        initialValues={{
          email: user?.email || "",
          confirmPassword: "",
          password: "",
          role: user?.role || "USER",
        }}
        validationSchema={userValidation}
        onSubmit={(values, { setSubmitting }) => {
          const treatedValues = {
            email: values.email || "",
            password: values.password,
            role: values.role,
          };
          handleSubmit(treatedValues);

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form>
            <div>
              <div className="form-group m-2 col-10 col-md-6">
                <label htmlFor="registerEmail">Email do Usuario</label>
                <Field
                  type="text"
                  className={`field-box fields form-control ${
                    errors.email && touched.email ? "is-invalid" : "is-valid"
                  }`}
                  id="registerEmail"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => (
                    <InputFeedback invalid={errors.email && touched.email}>
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>
              <div className="form-group m-2 col-10 col-md-6">
                <label htmlFor="registerEmail">Senha</label>
                <Field
                  type="password"
                  className={`field-box fields form-control ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  id="registerconfirmPassword"
                  name="confirmPassword"
                />
                <ErrorMessage
                  name="confirmPassword"
                  render={(msg) => (
                    <InputFeedback
                      invalid={
                        errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>
              <div className="form-group m-2 col-10 col-md-6">
                <label htmlFor="registerEmail">Confirmar Senha</label>
                <Field
                  type="password"
                  className={`field-box fields form-control ${
                    errors.password && touched.password
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  id="registerpassword"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => (
                    <InputFeedback
                      invalid={errors.password && touched.password}
                    >
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>

              {isEdit && (
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
              )}

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
                {setToggled && isUserForm && (
                  <div
                    className="btn btn-warning"
                    onClick={() => setToggled(false)}
                  >
                    Fechar
                  </div>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserForm;
