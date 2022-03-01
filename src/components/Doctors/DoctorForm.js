import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import MaskedInput from "react-text-mask";
import { doctorValidation, phoneNumberMask, mobileNumberMask } from "../componentHelpers/validationHelpers";
import InputFeedback from "../componentHelpers/InputFeedback";

function DoctorForm({
  doctor,
  handleSubmit,
  docSpecialties,
  setSelectedSpecialties,
  specialtyOptions,
  docFacilities,
  setSelectedFacilities,
  facilityOptions,
  }) {
  return (
    <div>
         <Formik
          initialValues={{
            name: doctor.name || "",
            crm: doctor.crm || "",
            isActive: doctor.isActive === true ? "true" : "false",
            email: doctor.email,
            phone1: doctor.phone1 || "",
            phone2: doctor.phone2 || "",
          }}
          validationSchema={doctorValidation}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
            isSubmitting,
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
          }) => (
            <Form className="main-payment-div">
              <div className="card-info-box ">
                <div className="row">
                  <div className="form-group m-2 col-8 col-md-5">
                    <label htmlFor="registerName">Nome Completo do Medico *</label>
                    <Field
                      type="text"
                      className={`field-box fields form-control ${
                        errors.name && touched.name ? "is-invalid" : "is-valid"
                      }`}
                      id="registerName"
                      name="name"
                      value={values.name}
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
                  <div className="form-group m-2 col-8 col-md-5">
                    <label htmlFor="registerEmail">Email</label>
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
                </div>
                <div className="row">
                  <div className="form-group m-2 col-5 col-md-2">
                    <label htmlFor="registerCrm">CRM</label>
                    <Field
                      type="number"
                      className={`field-box fields form-control ${
                        errors.crm && touched.crm ? "is-invalid" : "is-valid"
                      }`}
                      id="registerCrm"
                      name="crm"
                    />
                    <ErrorMessage
                      name="crm"
                      render={(msg) => (
                        <InputFeedback invalid={errors.crm && touched.crm}>
                          {msg}
                        </InputFeedback>
                      )}
                    />
                  </div>
                  <div className="form-group m-2 col-8 col-md-4">
                    <label htmlFor="registerEmail">Celular *</label>
                    <Field
                      name="phone1"
                      render={({ field }) => (
                        <MaskedInput
                          {...field}
                          name="phone1"
                          mask={mobileNumberMask}
                          id="phone1"
                          placeholder="Informe celular"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`field-box fields form-control ${
                            errors.phone1 && touched.phone1
                              ? "is-invalid"
                              : "is-valid"
                          }`}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="phone1"
                      render={(msg) => (
                        <InputFeedback invalid={errors.phone1 && touched.phone1}>
                          {msg}
                        </InputFeedback>
                      )}
                    />
                  </div>
                  <div className="form-group m-2 col-8 col-md-4">
                    <label htmlFor="registerEmail">Telefone</label>
                    <Field
                      name="phone2"
                      render={({ field }) => (
                        <MaskedInput
                          {...field}
                          mask={phoneNumberMask}
                          id="phone2"
                          placeholder="Informe celular"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`field-box fields form-control ${
                            errors.phone2 && touched.phone2
                              ? "is-invalid"
                              : "is-valid"
                          }`}
                        />
                      )}
                    />
                    <ErrorMessage
                      name="phone2"
                      render={(msg) => (
                        <InputFeedback invalid={errors.phone2 && touched.phone2}>
                          {msg}
                        </InputFeedback>
                      )}
                    />
                  </div>
                </div>
  
               <div className="row">
                  <div className="form-group m-1 col-8 col-lg-4">
                    <label htmlFor="registerSpecialty">Especialidades</label>
                    <Select
                      placeholder="Selecione especialidades"
                      isMulti
                      defaultValue={docSpecialties}
                      name="specialties"
                      onChange={(item) => setSelectedSpecialties(item.map(x => Number(x.value)))}
                      options={specialtyOptions}
                      className="basic-multi-select field-box "
                      classNamePrefix="select"
                      closeMenuOnSelect={false}
                    />
                  </div>
                  <div className="form-group m-1 col-8 col-lg-4">
                    <label htmlFor="registerFacility">Estabelecimentos</label>
                    <Select
                      placeholder="Selecione estabelecimentos"
                      isMulti
                      defaultValue={docFacilities}
                      name="facilities"
                      onChange={(item) => setSelectedFacilities(item.map(x => Number(x.value)))}
                      options={facilityOptions}
                      className="basic-multi-select field-box"
                      classNamePrefix="select"
                      closeMenuOnSelect={false}
                    />
                  </div>
    
                  <div role="group" aria-labelledby="my-radio-group" className="col-8 col-md-5 col-lg-3">
                  <div id="my-radio-group" className="my-1">Stuatus</div>
                    <div className="field-box">
                    <label className="m-2">Ativo</label>
                      <Field
                        className="mx-2 "
                        type="radio"
                        name="isActive"
                        value="true"
                      />
                      <label className="m-2">Inativo</label>
                      <Field
                        className="mx-2"
                        type="radio"
                        name="isActive"
                        value="false"
                      />
                    </div>
                  </div>
               </div>
              </div>
              <div className="edit-buttons-box">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  // disabled={isSubmitting || !values.name || !values.crm || !values.phone1}
                >
                  <div>
                    {isSubmitting ? <span>Loading</span> : <span>Salvar</span>}
                  </div>
                </button>
              </div>
            </Form>
          )}
        </Formik>
    </div>
  );
}

export default DoctorForm;
