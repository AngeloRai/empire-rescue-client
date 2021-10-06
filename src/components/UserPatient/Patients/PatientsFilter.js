import React from "react";

function PatientsFilter({
  setSearchName,
  searchName,
  setSearchPhone,
  searchPhone,
  setSearchEmail,
  searchEmail,
}) {
  return (
    <div className="row">
      <div className="col-md-5 col-lg-3 m-1">
        <input
          placeholder="paciente..."
          type="text"
          className="m-1 form-control shadow-none no-border "
          id="searchName"
          name="searchName"
          onChange={(e) => setSearchName(e.target.value)}
          value={searchName}
        />
      </div>
      <div className="col-md-5 col-lg-3 m-1">
        <input
          placeholder="celular paciente..."
          type="text"
          className="m-1 form-control shadow-none no-border "
          id="searchPhone"
          name="searchPhone"
          onChange={(e) => setSearchPhone(e.target.value)}
          value={searchPhone}
        />
      </div>
      <div className="col-md-5 col-lg-3 m-1">
        <input
          placeholder="email usuario..."
          type="text"
          className="m-1 form-control shadow-none no-border "
          id="searchEmail"
          name="searchEmail"
          onChange={(e) => setSearchEmail(e.target.value)}
          value={searchEmail}
        />
      </div>
    </div>
  );
}

export default PatientsFilter;
