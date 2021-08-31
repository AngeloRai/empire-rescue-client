import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone, FaMobileAlt } from "react-icons/fa";
import { useParams, useHistory } from "react-router";
import ConfirmationModal from "../componentHelpers/ConfirmationModal";
import ListAssociations from "../componentHelpers/ListAssociations";
import { api } from "../../apis";
import "./FacilityDetails.css";

function FacilityDetails() {
  const [facility, setFacility] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFacility = async () => {
      const fetchedFacility = await api.get(`/facility/${id}`);
      setFacility(fetchedFacility.data);
      console.log(fetchedFacility.data);
      setLoading(false);
    };
    fetchFacility();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/facility-delete/${id}`);
      setShowModal(false);
      history.push("/estabelecimentos");
    } catch (err) {
      console.console.error(err);
    }
  };

  return (
    <div className="main-facility-card">
      {facility && (
        <div>
          <div className="facility-name text-center">
            {facility.name}
            <small className="text-secondary h5"> / ({facility.unit})</small>
          </div>
          <div className="text-center m-1">
              {facility.emergency === true ? (
                <span className="badge bg-danger text-white details-badgets-fixed-height-c">
                  PRONTO ATENDIMENTO
                </span>
              ) : null}
              {facility.clinic === true ? (
                <span className="badge bg-primary text-white details-badgets-fixed-height-c">
                  CONSULTURIO
                </span>
              ) : null}
              {facility.hospital === true ? (
                <span className="badge bg-success text-white details-badgets-fixed-height-c">
                  HOSPITAL
                </span>
              ) : null}
              {facility.laboratory === true ? (
                <span className="badge bg-info text-white details-badgets-fixed-height-c">
                  LAB
                </span>
              ) : null}
            </div>
          <div className="facility-contact">
            
            <div className="row">
              
              <div className="facility-contatct-box col-md-12 col-lg-4 border">
                
                <div className="">
                  <div>
                    <span className="p-2">
                      <strong>
                        <FaMobileAlt />{" "}
                      </strong>{" "}
                      <span> {facility.phone1}</span>
                    </span>
                  </div>
  
                  <div>
                    <span className="p-2">
                      <strong>
                        <FaMobileAlt />{" "}
                      </strong>{" "}
                      <span> {facility.phone2}</span>
                    </span>
                  </div>
                </div>
                
                <div className="">
                  <div>
                    <span className="p-2">
                      <strong>
                        <FaPhone />{" "}
                      </strong>{" "}
                      <span> {facility.phone3}</span>
                    </span>
                  </div>
                  <div>
                    <span className="p-2">
                      <strong>
                        <HiOutlineMail />{" "}
                      </strong>{" "}
                      <span> {facility.email}</span>
                    </span>
                  </div>
                </div>
              </div>
  
              {facility?.address && (
                <div className="facility-contatct-box col-md-12 col-lg-7 border">
                  <div className=" row">
                   
                    <span className=" col-md-12 ">
                      <span className="p-2">
                        <strong>Endereço: </strong> &nbsp;
                        {facility.address.street} , {facility.address.number}
                      </span>
                    </span>
  
                    <div className=" col-md-12 ">
                      <span className="p-2">
                        <strong>Bairro:</strong>{" "}
                        <span> &nbsp; {facility.address.neighborhood}</span>
                      </span>
  
                      <span className="p-2">
                        <strong>Cidade:</strong>{" "}
                        <span> &nbsp; {facility.address.city}</span>
                      </span>
  
                      <span className="p-2">
                        <strong>Estado:</strong>{" "}
                        <span> &nbsp; {facility.address.state}</span>
                      </span>
                    </div>
                  </div>
  
                  <div className="col-md-12 row">
                    <span className=" col-12 ">
                      {facility.address.complement && (
                        <span className="p-2">
                          <strong>Complemento: </strong> &nbsp;
                          {facility.address.complement}
                        </span>
                      )}
                    </span>
                    <span className=" col-12 ">
                      {facility.address.observations && (
                        <span className="p-2">
                          <strong>Observações:</strong> &nbsp;
                          {facility.address.observations}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="specialty-facility row">
              {!loading && facility.specialties?.length ? (
                <ListAssociations
                  title={"Especialidades:"}
                  items={facility.specialties}
                  link="especialidade"
                />
              ) : (
                <div className="col-8 col-md-5 doc-spec-fac">
                  <h4>Especialidades:</h4>Nenhuma especialidade encontrada.
                </div>
              )}
              {!loading && facility.exams?.length ? (
                <ListAssociations
                  title={"Exames:"}
                  items={facility.exams}
                  exam={true}
                  link="medico-detalhes"
                />
              ) : (
                <div className="col-8 col-md-5 doc-spec-fac">
                  <h4>Exames:</h4>Nenhum exame encontrado.
                </div>
              )}
              {!loading && facility.doctors?.length ? (
                <ListAssociations
                  title={"Medicos:"}
                  items={facility.doctors}
                  link="medico-detalhes"
                />
              ) : (
                <div className="col-8 col-md-5 doc-spec-fac">
                  <h4>Medicos:</h4>Nenhum medico encontrado.
                </div>
              )}
              <div className="row border col-8 col-md-10 appointment-box">
                <h4>Agendamentos:</h4>
                {!loading && facility.appointments?.length ? (
                  facility.appointments.map((appointment) => (
                    <div className="col-5 m-1 shadow border p-2">
                      <div>
                        <p>
                          <strong>Data/Horario: </strong>
                          {appointment.dateTime}
                        </p>{" "}
                        <p>
                          <strong>Tipo:</strong> {appointment.type}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Local:</strong> {appointment.facility.name}
                        </p>{" "}
                        <p>
                          <strong>Unidade:</strong> {appointment.facility.unit}
                        </p>
                      </div>
                      <Link
                        to={`/agendamento/${appointment.id}`}
                        key={appointment.id}
                        className="link "
                      ></Link>
                    </div>
                  ))
                ) : (
                  <p>Nenhum agendamento encontrado</p>
                )}
              </div>
            </div>

            <div className="facility-edit-delete-box">
              <div className="facility-edit-delete">
                <Link to={`/estabelecimento-editar/${id}`}>
                  {" "}
                  <MdModeEdit />
                </Link>
              </div>
              <div className="facility-edit-delete">
                <span type="button" onClick={() => setShowModal(true)}>
                  <FaRegTrashAlt />
                </span>
              </div>
            </div>
            <ConfirmationModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              handleConfirm={() => handleDelete(id)}
              title={`Tem certeza de que deseja excluir este estabelecimento?`}
            >
              <p>
                Esta ação é irreversível! Clique em "Confirmar" para excluir.
              </p>
            </ConfirmationModal>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacilityDetails;
