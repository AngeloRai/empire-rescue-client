import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";

import InputFeedback from "../componentHelpers/InputFeedback";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Not a valid e-mail").required("Required field"),
  confirmPassword: Yup.string().required("Inserir Senha."),
  password: Yup.string()
    .required("Confirmar Senha")
    .when("confirmPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("confirmPassword")],
        "Senha deve ser igual"
      ),
    }),
});

function UserFormIputSignup({ handleSubmit, error }) {
  return (
    <Formik
      initialValues={{
        email: "",
        confirmPassword: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await handleSubmit(values);
          console.log(values);
          setSubmitting(false);
        } catch (err) {
          console.error(err);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched, values }) => (
        <Form>
          <div className="m-4 form-group col-8 col-md-5">
            <label htmlFor="signupFormEmail">Email</label>
            <Field
              type="email"
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : "is-valid"
              }`}
              autoComplete="off"
              id="signupFormEmail"
              aria-describedby="emailHelp"
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
          <div className="mx-4 form-group col-8 col-md-5">
                <label htmlFor="registerEmail">Senha</label>
                <Field
                  type="password"
                  className={` form-control ${
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
          <div className="mx-4 my-3 form-group col-8 col-md-5">
            <label htmlFor="signupFormPassword">Confrimar Senha</label>
            <Field
              type="password"
              className={`form-control ${
                errors.password && touched.password ? "is-invalid" : "is-valid"
              }`}
              autoComplete="new-password"
              id="signupFormPassword"
              name="password"
            />
            <ErrorMessage
              name="password"
              render={(msg) => (
                <InputFeedback invalid={errors.password && touched.password}>
                  {msg}
                </InputFeedback>
              )}
            />
          </div>
          {error && <p className="mx-4 text-danger">{error}</p>}
          <button
            type="submit"
            className="m-4 btn btn-primary"
            disabled={isSubmitting || !values.email || !values.password}
          >
            {isSubmitting ? (
              <div>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Submitting</span>
              </div>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default UserFormIputSignup;
