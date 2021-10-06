import axios from "axios";

const apis = {
    development: "http://localhost:4000",
    production: "https://empire-rescue.herokuapp.com",
  };

export const api = axios.create({ 
    baseURL: "https://empire-rescue.herokuapp.com",
  });

export const cepApi = axios.create({
    baseURL: "https://viacep.com.br/ws",
  });
  
export const statesCitiesApi = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
  });
  

  // api.interceptors.request.use((config) => {
  //   // fetch logged user data in localStorage 
  //   const storedUser = localStorage.getItem("loggedInUser");
  
  //   // Transforms a string into a json object
  //   const parsedStoredUser = JSON.parse(storedUser || '""');
  
  //   if (parsedStoredUser.token) {
  //     config.headers = {
  //       Authorization: `Bearer ${parsedStoredUser.token}`,
  //     };
  //   }
  //   return config;
  // });
