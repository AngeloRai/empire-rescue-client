import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCheckCircle, BsDashCircle } from "react-icons/bs"
import { api } from "../../apis";
import "./DoctorList.css";

function DoctorList() {
  const [doctors, setDoctors] = useState();
 
  const fetchDoctors = async () => {
    const fetchedDoctors = await api.get("/doctors");

    const sorteddoctors = fetchedDoctors.data.sort((a, b) =>
      a.name.localeCompare(b.name)).sort((a, b) =>
      b.isActive - a.isActive)
    console.log(sorteddoctors);
    setDoctors(sorteddoctors);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  

  return (
    <div className="main-doctors-container">
      <h2>Medicos</h2>{" "}
      <div className="add-link">
        <Link to="/adicionar-medico" className="link">
          Adicionar Medico
        </Link>
      </div>
      <div className="list-doctors-header row">
        <div className=" col-5 col-md-3">NOME</div>
        <div className=" col-5 col-md-3">CELULAR</div>
        <div className=" col-5 col-md-4">EMAIL</div>
        <div className=" col-5 col-md-2">STATUS</div>
      </div>
      {doctors &&
        doctors.map((loopedDoctor) => (
          <div className="row border-bottom doctors-container " key={loopedDoctor.id}>
            <Link to={`/medico-detalhes/${loopedDoctor.id}`} className="link col-5 col-md-3">
              {loopedDoctor.name}
            </Link>
            <div className="col-7 col-md-3">{loopedDoctor.phone1}</div>
            <div className="col-7 col-md-4">{loopedDoctor.email}</div>
            <div className="col-5 col-md-2">{loopedDoctor.isActive === true ? <BsCheckCircle className="text-success h5"/> : <BsDashCircle className="text-danger h5"/>}</div>
          </div>
        ))}
     
    </div>
  );
}

// <div className="main-doctors-container">
//   <h2>Medicos</h2>{" "}
//   <div className="add-link btn btn-primary ">
//     <Link to="/adicionar-medico" className="link">ADICIONAR MEDICO</Link>
//   </div>
//       <div className="row ">
//   {doctors &&
//     doctors.map((loopedDoctor) => (
//         <DoctorCard
//           doctor={loopedDoctor}
//           handleModalDeleteId={handleModalDeleteId}
//         />
//     ))}
//       </div>
//         
// </div>

// <div className="col-2 text-center">
//           <span
//             type="button"
//             onClick={() => handleModalDeleteId(loopedDoctor.id)}
//           >
//             <FaRegTrashAlt />
//           </span>
//           <span>{loopedDoctor.id}</span>
//         </div>
export default DoctorList;
