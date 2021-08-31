import { Formik, Form } from "formik";
import { facilityValidation } from "../../componentHelpers/validationHelpers";
import AddressForm from "../../componentHelpers/AddressForm";
import ContactForm from "../../componentHelpers/ContactForm";
import FacilityFormInfo from "./FacilityFormInfo";
import "./FacilityForm.css";

function FacilityForm({
  facility,
  address,
  handleSubmit,
  facilitySpecialties,
  facilityExams,
  setSelectedSpecialties,
  specialtyOptions,
  examOtions,
  setSelectedExams,
}) {
  return (
    <div>
      <Formik
        initialValues={{
          name: facility.name || "",
          unit: facility.unit || "",
          email: facility.email || "",
          phone1: facility.phone1 || "",
          phone2: facility.phone2 || "",
          phone3: facility.phone3 || "",
          clinic: facility.clinic || false,
          hospital: facility.hospital || false,
          laboratory: facility.laboratory || false,
          emergency: facility.emergency || false,
          postalCode: address.postalCode || "",
          street: address.street || "",
          number: address.number || "",
          neighborhood: address.neighborhood || "",
          city: address.city || "",
          state: address.state || "",
          complement: address.complement || "",
          observations: address.observations || "",
        }}
        validationSchema={facilityValidation}
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
            <div>
              <div className="edit-buttons-box-top">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSubmitting || !values.postalCode}
                >
                  <div>
                    {isSubmitting ? <span>Loading</span> : <span>Salvar</span>}
                  </div>
                </button>
              </div>
              <FacilityFormInfo
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                facilitySpecialties={facilitySpecialties}
                setSelectedSpecialties={setSelectedSpecialties}
                specialtyOptions={specialtyOptions}
                facilityExams={facilityExams}
                setSelectedExams={setSelectedExams}
                examOtions={examOtions}
              />

              {values.name &&
                values.unit &&
                (values.clinic ||
                  values.hospital ||
                  values.laboratory ||
                  values.emergency) && (
                  <ContactForm
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    isFacility={true}
                  />
                )}
              {values.phone1 && (
                <AddressForm
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
            </div>
            <div className="edit-buttons-box">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isSubmitting || !values.postalCode}
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

export default FacilityForm;
