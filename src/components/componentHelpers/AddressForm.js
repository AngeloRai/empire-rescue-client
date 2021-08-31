import React from "react";
import MaskedInput from "react-text-mask";
import { Field, ErrorMessage } from "formik";
import { cepMask } from "./validationHelpers";
import InputFeedback from "./InputFeedback";
import { cepApi } from "../../apis";

function FacilityFormAddress({ errors, touched, handleChange, setFieldValue }) {
 
 
  const onBlurCep = async (ev, setFieldValue) => {
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]/g, "");

    if (cep?.length !== 8) {
      return;
    }

    const fetchedCep = await cepApi.get(`/${cep}/json/`);

    setFieldValue("street", fetchedCep.data.logradouro);
    setFieldValue("neighborhood", fetchedCep.data.bairro);
    setFieldValue("city", fetchedCep.data.localidade);
    setFieldValue("state", fetchedCep.data.uf);
  };

  return (
    <div>
      <div className="row">
        <hr className="my-4" />
        <h5>ENDEREÇO</h5>
        <div className="form-group m-2 col-8 col-md-4 col-lg-3 col-xl-2">
          <label htmlFor="registerEmail">CEP *</label>
          <Field name="postalCode">
            {({ field }) => (
              <MaskedInput
                {...field}
                name="postalCode"
                mask={cepMask}
                id="postalCode"
                placeholder="Informe cep"
                type="text"
                onChange={handleChange}
                onBlur={(ev) => onBlurCep(ev, setFieldValue)}
                className={`field-box fields form-control ${
                  errors.postalCode && touched.postalCode
                    ? "is-invalid"
                    : "is-valid"
                }`}
              />
            )}
          </Field>
          <ErrorMessage name="postalCode">
            {(msg) => (
              <InputFeedback invalid={errors.postalCode && touched.postalCode}>
                {msg}
              </InputFeedback>
            )}
          </ErrorMessage>
        </div>

        <div className="form-group m-2 col-8 col-md-6">
          <label htmlFor="registerStreet">Rua/Av *</label>
          <Field
            placeholder="unidade..."
            type="text"
            className={`field-box fields form-control ${
              errors.street && touched.street ? "is-invalid" : "is-valid"
            }`}
            id="registerStreet"
            name="street"
          />
          <ErrorMessage name="street">
            {(msg) => (
              <InputFeedback invalid={errors.street && touched.street}>
                {msg}
              </InputFeedback>
            )}
          </ErrorMessage>
        </div>

        <div className="form-group m-2 col-8 col-md-4 col-lg-3 col-xl-2">
          <label htmlFor="registerNumber">Numero *</label>
          <Field
            placeholder="numero..."
            type="number"
            className={`field-box fields form-control ${
              errors.number && touched.number ? "is-invalid" : "is-valid"
            }`}
            id="registerNumber"
            name="number"
          />
          <ErrorMessage name="number">
            {(msg) => (
              <InputFeedback invalid={errors.number && touched.number}>
                {msg}
              </InputFeedback>
            )}
          </ErrorMessage>
        </div>

        <div className="form-group m-2 col-8 col-md-6">
          <label htmlFor="registerNeighborhood">Bairro *</label>
          <Field
            placeholder="bairro..."
            type="text"
            className={`field-box fields form-control ${
              errors.neighborhood && touched.neighborhood
                ? "is-invalid"
                : "is-valid"
            }`}
            id="registerNeighborhood"
            name="neighborhood"
          />
          <ErrorMessage name="neighborhood">
            {(msg) => (
              <InputFeedback
                invalid={errors.neighborhood && touched.neighborhood}
              >
                {msg}
              </InputFeedback>
            )}
          </ErrorMessage>
        </div>

        <div className="form-group m-2 col-8 col-md-6">
          <label htmlFor="registerCity">Cidade *</label>
          <Field
            placeholder="cidade..."
            type="text"
            className={`field-box fields form-control ${
              errors.city && touched.city ? "is-invalid" : "is-valid"
            }`}
            id="registerCity"
            name="city"
          />
          <ErrorMessage name="city">
            {(msg) => (
              <InputFeedback invalid={errors.city && touched.city}>
                {msg}
              </InputFeedback>
            )}
          </ErrorMessage>
        </div>

        <div className="form-group m-2 col-8 col-md-4 col-lg-3 col-xl-2">
          <label htmlFor="registerUnit">Estado *</label>
          <Field
            placeholder="estado..."
            type="text"
            className={`field-box fields form-control ${
              errors.state && touched.state ? "is-invalid" : "is-valid"
            }`}
            id="registerstate"
            name="state"
          />
          <ErrorMessage name="state">
            {(msg) => (
              <InputFeedback invalid={errors.state && touched.state}>
                {msg}
              </InputFeedback>
            )}
          </ErrorMessage>
        </div>

        <div className="form-group m-2 col-8 col-md-5">
          <label htmlFor="registerComplement">Complemento</label>
          <Field
            placeholder="complemento..."
            type="text"
            className={`field-box fields form-control ${
              errors.complement && touched.complement
                ? "is-invalid"
                : "is-valid"
            }`}
            id="registerComplement"
            name="complement"
          />
          <ErrorMessage name="complement">
            {(msg) => (
              <InputFeedback invalid={errors.complement && touched.complement}>
                {msg}
              </InputFeedback>
            )}
          </ErrorMessage>
        </div>

        <div className="form-group m-2 col-8 col-md-5">
          <label htmlFor="registerObservations">Observações</label>
          <Field
            placeholder="observações..."
            type="text"
            className={`field-box fields form-control ${
              errors.observations && touched.observations
                ? "is-invalid"
                : "is-valid"
            }`}
            id="registerObservations"
            name="observations"
          />
          <ErrorMessage name="observations">
            {(msg) => (
              <InputFeedback
                invalid={errors.observations && touched.observations}
              >
                {msg}
              </InputFeedback>
            )}
          </ErrorMessage>
        </div>

      </div>

    </div>
  );
}

export default FacilityFormAddress;
