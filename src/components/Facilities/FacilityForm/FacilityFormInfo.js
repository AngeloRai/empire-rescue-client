import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import './FacilityForm.css'


import InputFeedback from "../../componentHelpers/InputFeedback";
function FacilityFormInfo({
  values,
  errors,
  touched,
  setFieldValue,
  facilitySpecialties,
  setSelectedSpecialties,
  specialtyOptions,
  facilityExams,
  setSelectedExams,
  examOtions,
}) {
  return (
    <div>
      <div className="row">
        <div className="form-group m-2 col-8 col-md-7 col-lg-5">
          <label htmlFor="registerName">Nome Do Estabelecimento *</label>
          <Field
            placeholder="estabelecimento..."
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
        <div className="form-group m-2 col-8 col-md-7 col-lg-5">
          <label htmlFor="registerUnit">Unidade *</label>
          <Field
            placeholder="unidade..."
            type="text"
            className={`field-box fields form-control ${
              errors.unit && touched.unit ? "is-invalid" : "is-valid"
            }`}
            id="registerUnit"
            name="unit"
          />
          <ErrorMessage
            name="unit"
            render={(msg) => (
              <InputFeedback invalid={errors.unit && touched.unit}>
                {msg}
              </InputFeedback>
            )}
          />
        </div>
        <div className="form-group m-2 col-8 col-md-7 col-lg-5 ">
          <label htmlFor="registerSpecialty">Especialidades</label>
          <Select
            placeholder="Selecione..."
            isMulti
            defaultValue={facilitySpecialties}
            name="specialties"
            onChange={(items) =>
              setSelectedSpecialties(items.map((item) => Number(item.value)))
            }
            options={specialtyOptions}
            className="basic-multi-select field-box "
            classNamePrefix="select"
            closeMenuOnSelect={false}
          />
        </div>
        <div className="form-group m-2 col-8 col-md-7 col-lg-5 ">
          <label htmlFor="registerExams">Exames</label>
          <Select
            placeholder="Selecione..."
            isMulti
            defaultValue={facilityExams}
            name="exams"
            onChange={(items) =>
              setSelectedExams(items.map((item) => Number(item.value)))
            }
            options={examOtions}
            className="basic-multi-select field-box"
            classNamePrefix="select"
            closeMenuOnSelect={false}
          />
        </div>
                

        <div className="col-8 col-md-8 col-lg-12 row mx-2">
        <div className="form-check checkbox-item col-8 col-md-6 col-lg-3">
          
          <label className="form-check-label" htmlFor="flexCheckChecked">
            <input
            className="form-check-input"
            type="checkbox"
            name="emergency"
            checked={values.emergency}
            onChange={(e) => setFieldValue("emergency", e.target.checked)}
            id="flexCheckChecked"
          />
          <span className="badge bg-danger text-white details-badgets-fixed-height-c">
                  PRONTO ATENDIMENTO
                </span>
          </label>
        </div>
          <div className="form-check checkbox-item col-8 col-md-6 col-lg-3">
           
            <label className="form-check-label" htmlFor="flexCheckChecked"> 
            <input
              className="form-check-input"
              type="checkbox"
              name="clinic"
              checked={values.clinic}
              onChange={(e) => setFieldValue("clinic", e.target.checked)}
              id="flexCheckChecked"
            />
              <span className="badge bg-primary text-white details-badgets-fixed-height-c">
                  CONSULTURIO
                </span>
            </label>
          </div>
          <div className="form-check checkbox-item col-8 col-md-6 col-lg-3">
            
            <label className="form-check-label" htmlFor="flexCheckChecked">
              <input
              className="form-check-input"
              type="checkbox"
              name="hospital"
              checked={values.hospital}
              onChange={(e) => setFieldValue("hospital", e.target.checked)}
              id="flexCheckChecked"
            />
            <span className="badge bg-success text-white details-badgets-fixed-height-c">
                  HOSPITAL
                </span>
            </label>
          </div>
          <div className="form-check checkbox-item col-8 col-md-6 col-lg-3">
            
            <label className="form-check-label" htmlFor="flexCheckChecked">
              <input
              className="form-check-input"
              type="checkbox"
              name="laboratory"
              checked={values.laboratory}
              onChange={(e) => setFieldValue("laboratory", e.target.checked)}
              id="flexCheckChecked"
            />
            <span className="badge bg-info text-white details-badgets-fixed-height-c">
                  LABORATORIO
                </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityFormInfo;
