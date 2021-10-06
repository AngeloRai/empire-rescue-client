import React from "react";

function AppointmentListFilter({
  setAppointmentType,
  setSearchFacility,
  setSearchPatient,
  searchPatient,
  searchFacility,
  setSearchStatus,
  setShowAll,
}) {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center gap-2 flex-wrap">
        <span>
          <div
            type="button"
            className="filter-all filter "
            onClick={() => setShowAll()}
          >
            TODOS
          </div>
        </span>
        <span>
          <div
            type="button"
            className="filter-consult filter "
            onClick={() => setAppointmentType("consulta")}
          >
            CONSULTAS
          </div>
        </span>
        <span>
          <div
            type="button"
            className="filter-exam filter "
            onClick={() => setAppointmentType("exame")}
          >
            EXAMES
          </div>
        </span>
        <div className="m-1">
          <input
            placeholder="estabelecimento..."
            type="text"
            className="m-1 form-control shadow-none no-border "
            id="searchFacility"
            name="searchFacility"
            onChange={(e) => setSearchFacility(e.target.value)}
            value={searchFacility}
          />
        </div>
        <div className="m-1">
          <input
            placeholder="paciente..."
            type="text"
            className="m-1 form-control shadow-none no-border "
            id="searchPatient"
            name="searchPatient"
            onChange={(e) => setSearchPatient(e.target.value)}
            value={searchPatient}
          />
        </div>
      </div>

      <div id="my-radio-group" className="d-flex justify-content-center gap-2 my-3">
        <h5 className="text-secondary">STATUS:</h5>

        <div className="mx-1">
          <span className="badge badge-all mx-1 text-center text-white badgets-fixed-height-appointment">
            TODOS
          </span>
          <input
            type="radio"
            name="status"
            value="all"
            onChange={(e) => setSearchStatus(e.target.value)}
          />
        </div>

       <div className="mx-1">
          <span className="badge bg-danger mx-1 text-center text-white badgets-fixed-height-appointment">
            PENDENTE
          </span>
          <input
            type="radio"
            name="status"
            value="pendente"
            onChange={(e) => setSearchStatus(e.target.value)}
          />
       </div>

        <div className="mx-1">
          <span className="badge bg-info mx-1 text-center text-white badgets-fixed-height-appointment">
            INFORMADO
          </span>
          <input
            type="radio"
            name="status"
            value="informado"
            onChange={(e) => setSearchStatus(e.target.value)}
          />
        </div>

       <div className="mx-1">
          <span className="badge bg-success mx-1 text-center text-white badgets-fixed-height-appointment">
            REALIZADO
          </span>
          <input
            type="radio"
            name="status"
            value="realizado"
            onChange={(e) => setSearchStatus(e.target.value)}
          />
       </div>

        <div className="mx-1">
          <span className="badge bg-secondary mx-1 text-center text-white badgets-fixed-height-appointment">
            AUSENTE
          </span>
          <input
            type="radio"
            name="status"
            value="ausente"
            onChange={(e) => setSearchStatus(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default AppointmentListFilter;
