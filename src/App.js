import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import SideBar from "./components/SideBar/SideBar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup"
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
import FacilitiesList from "./components/Facilities/FacilitiesList";
import FacilityEdit from './components/Facilities/FacilityEdit'
import FacilityDetails from "./components/Facilities/FacilityDetails";
import ExamDetails from "./components/Exams/ExamDetails";
import AppointmentCreate from "./components/Appointments/AppointmentForm/AppointmentCreate"
import AppointmentList from "./components/Appointments/AppointmentList/AppointmentList"
import AppointmentEdit from "./components/Appointments/AppointmentForm/AppointmentEdit";
import AppointmentDetails from "./components/Appointments/AppointmentDetails/AppointmentDetails";
import ExamEdit from "./components/Exams/ExamEdit";
import SpecialtyEdit from "./components/Specialties/SpecialtyEdit";
import PatientList from "./components/UserPatient/Patients/PatientsList";
import UserPatientCreate from "./components/UserPatient/UserPatientCreate";
import PatientEdit from "./components/UserPatient/Patients/PatientEdit";
import PatientDetails from "./components/UserPatient/Patients/PatientDetails";
import UserCreate from "./components/UserPatient/Users/UserCreate";
import UsersList from "./components/UserPatient/Users/UsersList";
import UserEdit from "./components/UserPatient/Users/UserEdit";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthContextComponent } from "./contexts/authContext";
import UserDetails from "./components/UserPatient/Users/UserDetails";


function App() {
  return (
    <BrowserRouter className="App">
    <AuthContextComponent>

      <NavbarComponent />
      <div style={{ display: "flex" }}>

        <SideBar />
        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/cadastro" component={Signup} />

            <ProtectedRoute exact path="/medicos" component={DoctorList} />
            <ProtectedRoute exact path="/adicionar-medico" component={DoctorCreate} />
            <ProtectedRoute exact path="/medico-detalhes/:id" component={DoctorDetails} />
            <ProtectedRoute exact path="/medico-editar/:id" component={DoctorEdit} />
            <ProtectedRoute exact path="/usuarios" component={UsersList} />
            <ProtectedRoute exact path="/detalhes-usuario/:id" component={UserDetails} />
            <ProtectedRoute exact path="/adicionar-usuario" component={UserCreate} />
            <ProtectedRoute exact path="/editar-usuario/:id" component={UserEdit} />
            <ProtectedRoute exact path="/pacientes" component={PatientList} />
            <ProtectedRoute exact path="/detalhes-paciente/:id" component={PatientDetails} />
            <ProtectedRoute exact path="/editar-paciente/:id" component={PatientEdit} />
            <ProtectedRoute exact path="/adicionar-paciente" component={UserPatientCreate} />
            <ProtectedRoute exact path="/adicionar-estabelecimento" component={FacilityCreate} />
            <ProtectedRoute exact path="/estabelecimento-editar/:id" component={FacilityEdit} />
            <ProtectedRoute exact path="/estabelecimentos" component={FacilitiesList} />
            <ProtectedRoute exact path="/estabelecimento-detalhes/:id" component={FacilityDetails} />
            <ProtectedRoute exact path="/exames" component={ExamList} />
            <ProtectedRoute exact path="/exame/:id" component={ExamDetails} />
            <ProtectedRoute exact path="/editar-exame/:id" component={ExamEdit} />
            <ProtectedRoute exact path="/adicionar-exame" component={ExamCreate} />
            <ProtectedRoute exact path="/especialidades" component={SpecialtyList} />
            <ProtectedRoute exact path="/adicionar-especialidade" component={SpecialtyCreate} />
            <ProtectedRoute exact path="/especialidade/:id" component={SpecialtyDetails} />
            <ProtectedRoute exact path="/editar-specialidade/:id" component={SpecialtyEdit} />
            <ProtectedRoute exact path="/gerar-agendamento" component={AppointmentCreate} />
            <ProtectedRoute exact path="/agendamentos" component={AppointmentList} />
            <ProtectedRoute exact path="/editar-agendamento/:id" component={AppointmentEdit} />
            <ProtectedRoute exact path="/agendamento-detalhes/:id" component={AppointmentDetails} />
            
          </Switch>
        </div>
      </div>
      </AuthContextComponent>
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
