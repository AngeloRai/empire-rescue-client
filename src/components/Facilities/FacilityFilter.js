import React from "react";

function FacilityFilter({
  setSearchCity,
  searchCity,
  setSearchName,
  searchName,
  setSearchLab,
  searchLab,
  setSearchEmergency,
  searchEmergency,
  setSearchHospital,
  searchHospital,
  setSearchClinic,
  searchClinic,
}) {
  return (
    <div className="mb-3 d-flex justify-content-center row">
      <div className="row col-8 col-md-4">
        <input
          placeholder="cidade..."
          type="text"
          className="m-1 form-control shadow-none no-border col-5"
          id="searchCity"
          name="searchCity"
          onChange={(e) => setSearchCity(e.target.value)}
          value={searchCity}
        />
        <input
          placeholder="estabelecimento..."
          type="text"
          className="m-1 form-control shadow-none no-border col-5"
          id="searchName"
          name="searchName"
          onChange={(e) => setSearchName(e.target.value)}
          value={searchName}
        />
      </div>
      <div className="row col-8 col-md-6">
        <div className="col-5">
          <input
            type="checkbox"
            className="m-2"
            id="searchLab"
            name="searchLab"
            onChange={(e) => setSearchLab(e.target.checked)}
            value={searchLab}
          />
          <label>laboratorio</label>
        </div>
        <div className="col-5 ">
          <input
            type="checkbox"
            className="m-2 "
            id="searchEmergency"
            name="searchEmergency"
            onChange={(e) => setSearchEmergency(e.target.checked)}
            value={searchEmergency}
          />
          <label>PA</label>
        </div>
        <div className="col-5 ">
          <input
            type="checkbox"
            className="m-2 "
            id="searchHospital"
            name="searchHospital"
            onChange={(e) => setSearchHospital(e.target.checked)}
            value={searchHospital}
          />
          <label>hospital</label>
        </div>
        <div className="col-5 ">
          <input
            type="checkbox"
            className="m-2 "
            id="searchClinic"
            name="searchClinic"
            onChange={(e) => setSearchClinic(e.target.checked)}
            value={searchClinic}
          />
          <label>consultorio</label>
        </div>
      </div>
    </div>
  );
}

export default FacilityFilter;
