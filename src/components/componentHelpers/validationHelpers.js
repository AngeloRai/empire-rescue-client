import * as Yup from "yup";

export const mobileNumberMask = [
  "(",
  /[1-9]/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
export const phoneNumberMask = [
  "(",
  /[1-9]/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const cepMask = [
  /[0-9]/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
];

export const cep = /[0-9]{5}-[\d]{3}/

const phoneRegex =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const doctorValidation = Yup.object().shape({
  name: Yup.string().max(100).required("Por favor informe nome completo."),
  crm: Yup.string()
    .max(6, "6 digitos no maximo")
    .required("Por favor informe CRM."),
  email: Yup.string().email("Por favor informe email valido."),
  phone1: Yup.string()
    .matches(phoneRegex, "Informe numero valido")
    .required("Por favor informe numero de celular."),
  phone2: Yup.string().matches(phoneRegex, "Informe numero telefone valido"),
  isActive: Yup.string().required("Por favor informe estatus do medico."),
});


export const facilityValidation = Yup.object().shape({
  name: Yup.string()
    .max(100)
    .required("Por favor informe nome do estabelcimento."),
  unit: Yup.string().required("Por favor informe unidade."),
  email: Yup.string().email("Por favor informe email valido."),
  phone1: Yup.string().matches(phoneRegex, "Informe numero celular valido")
    .required("Por favor informe numero de celular."),
  phone2: Yup.string().matches(phoneRegex, "Informe numero celular valido"),
  phone3: Yup.string().matches(phoneRegex, "Informe numero telefone valido"),
  postalCode: Yup.string().required("Por favor informe CEP."),
  street: Yup.string().required("Por favor informe rua/avenida."),
  number: Yup.string().required("Por favor informe numero."),
  neighborhood: Yup.string().required("Por favor informe bairro."),
  city: Yup.string().required("Por favor informe cidade."),
  state: Yup.string().required("Por favor informe estado."),
});

export const patienteValidation = Yup.object().shape({
  name: Yup.string()
    .max(100)
    .required("Por favor informe nome do paciente."),
  phone1: Yup.string().matches(phoneRegex, "Informe numero celular valido")
    .required("Por favor informe numero de celular."),
  phone2: Yup.string().matches(phoneRegex, "Informe numero celular valido"),
  postalCode: Yup.string().required("Por favor informe CEP."),
  street: Yup.string().required("Por favor informe rua/avenida."),
  number: Yup.string().required("Por favor informe numero."),
  neighborhood: Yup.string().required("Por favor informe bairro."),
  city: Yup.string().required("Por favor informe cidade."),
  state: Yup.string().required("Por favor informe estado."),
});

export const facilityTypeOptions = [
  { label: "cl??nica", value: "cl??nica" },
  { label: "hospital", value: "hospital" },
  { label: "laborat??rio", value: "laborat??rio" },
];

