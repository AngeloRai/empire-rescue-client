import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";


import InputFeedback from "../componentHelpers/InputFeedback";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Not a valid e-mail").required("Required field"),
  password: Yup.string().min(6).required("Required field"),
});

function UserFormIput({ handleSubmit, error }) {

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await handleSubmit(values)
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
            <label htmlFor="signupFormPassword">Senha</label>
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

export default UserFormIput;
