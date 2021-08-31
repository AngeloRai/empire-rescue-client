import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../apis";

function SpecialtyDetails() {
  const [specialty, setSpecialty] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const fetchedSpecialty = await api.get(`/specialty/${id}`);
      setSpecialty(fetchedSpecialty.data);
    };
    fetchDetails();
  }, [id]);

  return (
    <div>
      {specialty && (
        <div className="row main-specialties-container">
          <h3>{specialty.name}</h3>
          <div>
            <h5>Locais:</h5>
            <div className="">
              <div className="row list-specialty-header  my-2">
                <span className="col">Estabelecimento</span>
                <span className="col">Unidade</span>
                <span className="col-6 text-center">Tipo</span>
              </div>
              {specialty.facilities &&
                specialty.facilities.map((facility) => (
                  <Link to={`/estabelecimento-detalhes/${facility.id}`} className="text-decoration-none text-dark">
                    <div className="row p-1 border my-1" key={facility.id}>
                      <span className="col">{facility.name}</span>
                      <span className="col"> {facility.unit}</span>
                      <div className="d-flex justify-content-center  col-6">
                        {facility.emergency === true ? (
                          <span
                            className="badge bg-danger text-white badgets-fixed-height-c"
                            style={{ fontSize: "10px" }}
                          >
                            P A
                          </span>
                        ) : null}
                        {facility.clinic === true ? (
                          <span
                            className="badge bg-primary text-white badgets-fixed-height-c"
                            style={{ fontSize: "10px" }}
                          >
                            CONSULTURIO
                          </span>
                        ) : null}
                        {facility.hospital === true ? (
                          <span
                            className="badge bg-success text-white badgets-fixed-height-c"
                            style={{ fontSize: "10px" }}
                          >
                            HOSPITAL
                          </span>
                        ) : null}
                        {facility.laboratory === true ? (
                          <span
                            className="badge bg-info text-white badgets-fixed-height-c"
                            style={{ fontSize: "10px" }}
                          >
                            LAB
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            <h5>Medicos:</h5>
            <ul>
              {specialty.doctors.map((doctor) => (
                <Link
                  to={`/medico-detalhes/${doctor.id}`}
                  className="text-decoration-none"
                >
                  <li className="row p-1 text-secondary" key={doctor.id}>
                    <span>{doctor.name}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpecialtyDetails;
