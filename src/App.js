import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import SideBar from "./components/SideBar/SideBar";
import DoctorCreate from "./components/Doctors/DoctorCreate";
import DoctorEdit from "./components/Doctors/DoctorEdit";
import DoctorList from "./components/Doctors/DoctorList";
import DoctorDetails from "./components/Doctors/DoctorDetails";
import FacilityCreate from "./components/Facilities/FacilityCreate";
import ExamCreate from "./components/Exams/ExamCreate";
import ExamList from "./components/Exams/ExamList";
import SpecialtyList from "./components/Specialties/SpecialtyList";
import SpecialtyCreate from "./components/Specialties/SpecialtyCreate";
import SpecialtyDetails from "./components/Specialties/SpecialtyDetails";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FacilitiesList from "./components/Facilities/FacilitiesList";
import FacilityEdit from './components/Facilities/FacilityEdit'
import FacilityDetails from "./components/Facilities/FacilityDetails";
import ExamDetails from "./components/Exams/ExamDetails";
import AppointmentCreate from "./components/Appointments/AppointmentForm/AppointmentCreate"
import Users from "./components/Users/Users"
import AppointmentList from "./components/Appointments/AppointmentList";
import AppointmentEdit from "./components/Appointments/AppointmentForm/AppointmentEdit";


function App() {
  return (
    <BrowserRouter className="App">
      <NavbarComponent />

      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            <Route exact path="/usuario" component={Users} />
            <Route exact path="/medicos" component={DoctorList} />
            <Route exact path="/adicionar-medico" component={DoctorCreate} />
            <Route exact path="/medico-detalhes/:id" component={DoctorDetails} />
            <Route exact path="/medico-editar/:id" component={DoctorEdit} />
            <Route exact path="/adicionar-estabelecimento" component={FacilityCreate} />
            <Route exact path="/estabelecimento-editar/:id" component={FacilityEdit} />
            <Route exact path="/estabelecimentos" component={FacilitiesList} />
            <Route exact path="/estabelecimento-detalhes/:id" component={FacilityDetails} />
            <Route exact path="/exames" component={ExamList} />
            <Route exact path="/exame/:id" component={ExamDetails} />
            <Route exact path="/adicionar-exame" component={ExamCreate} />
            <Route exact path="/especialidades" component={SpecialtyList} />
            <Route exact path="/adicionar-especialidade" component={SpecialtyCreate} />
            <Route exact path="/especialidade/:id" component={SpecialtyDetails} />
            <Route exact path="/gerar-agendamento" component={AppointmentCreate} />
            <Route exact path="/agendamentos" component={AppointmentList} />
            <Route exact path="/editar-agendamento/:id" component={AppointmentEdit} />
            
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;

// {routes.map((route, index) => (
//   <Route
//     key={index}
//     path={route.path}
//     exact={route.exact}
//     children={<route.main />}
//   />
// ))}

// const routes = [
//   {
//     path: "/",
//     exact: true,
//     main: () => <h2>Home</h2>,
//   },
//   {
//     path: "/medico",
//     exact: true,
//     main: () => <FormDoctor />,
//   },
//   {
//     path: "/exames",
//     exact: true,
//     main: () => <ExamList />,
//   },
//   {
//     path: "/adicionar-exame",
//     exact: true,
//     main: () => <ExamCreate />,
//   },
//   {
//     path: "/shoelaces",
//     exact: true,
//     main: () => <h2>Estabelecimento</h2>,
//   },
// ];
