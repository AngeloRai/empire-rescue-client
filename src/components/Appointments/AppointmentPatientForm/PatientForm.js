import { Formik, Form, Field, ErrorMessage } from "formik";
import { patienteValidation } from "../../componentHelpers/validationHelpers";
import InputFeedback from "../../componentHelpers/InputFeedback";
import AddressForm from "../../componentHelpers/AddressForm";
import ContactForm from "../../componentHelpers/ContactForm";

function PatientForm({
  patient,
  address,
  handleSubmit,
  setToggled,
  isPatientUserForm,
}) {
  return (
    <div>
      <Formik
        initialValues={{
          name: patient?.name || "",
          rg: patient?.rg || "",
          cpf: patient?.cpf || "",
          phone1: patient?.phone1 || "",
          phone2: patient?.phone2 || "",
          postalCode: address?.postalCode || "",
          street: address?.street || "",
          number: address?.number || "",
          neighborhood: address?.neighborhood || "",
          city: address?.city || "",
          state: address?.state || "",
          complement: address?.complement || "",
          observations: address?.observations || "",
        }}
        validationSchema={patienteValidation}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);

          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
        }) => (
          <Form>
            <div className="d-flex justify-content-between gap-5 m-4">
              <hr />
              <div className="d-flex gap-5">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSubmitting || !values.postalCode}
                >
                  <div>
                    {isSubmitting ? <span>Loading</span> : <span>Salvar</span>}
                  </div>
                </button>
                {isPatientUserForm === true && (
                  <div
                    className="btn btn-warning"
                    onClick={() => setToggled(false)}
                  >
                    Fechar
                  </div>
                )}
              </div>
            </div>
            <h5>DADOS PESSOAIS </h5>
            <div className="row">
              <div className="form-group m-2 col-10 col-md-8 col-lg-5">
                <label htmlFor="registerName">Nome Completo</label>
                <Field
                  type="text"
                  className={`field-box fields form-control ${
                    errors.name && touched.name ? "is-invalid" : "is-valid"
                  }`}
                  id="registerName"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  render={(msg) => (
                    <InputFeedback invalid={errors.name && touched.name}>
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>
              <div className="form-group m-2 col-6 col-md-5 col-lg-3">
                <label htmlFor="registerRG">RG</label>
                <Field
                  type="text"
                  className={`field-box fields form-control ${
                    errors.rg && touched.rg ? "is-invalid" : "is-valid"
                  }`}
                  id="registerRG"
                  name="rg"
                />
                <ErrorMessage
                  name="rg"
                  render={(msg) => (
                    <InputFeedback invalid={errors.rg && touched.rg}>
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>
              <div className="form-group m-2 col-6 col-md-5 col-lg-3">
                <label htmlFor="registerCPF">CPF</label>
                <Field
                  type="text"
                  className={`field-box fields form-control ${
                    errors.cpf && touched.name ? "is-invalid" : "is-valid"
                  }`}
                  id="registerCPF"
                  name="cpf"
                />
                <ErrorMessage
                  name="cpf"
                  render={(msg) => (
                    <InputFeedback invalid={errors.cpf && touched.cpf}>
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>
            </div>
            <div>
              {
                <ContactForm
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isFacility={false}
                />
              }
              {
                <AddressForm
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              }
            </div>
            <div className="d-flex justify-content-center gap-5 m-3">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                <div>
                  {isSubmitting ? <span>Loading</span> : <span>Salvar</span>}
                </div>
              </button>
              {isPatientUserForm === true && (
                <div
                  className="btn btn-warning"
                  onClick={() => setToggled(false)}
                >
                  Fechar
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PatientForm;
