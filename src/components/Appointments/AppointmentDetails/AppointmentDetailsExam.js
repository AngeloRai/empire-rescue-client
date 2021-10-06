import React from "react";

function AppointmentDetailsExam({ exam }) {
  // exam coming from ApointmentDetails as prop
  return (
    <div className="col-10 col-md-5 border p-2 m-2">
    <h3 className="text-center">Exame</h3>
      <div>
        <div>
          <h4 className="text-secondary">{exam.examName}  </h4>
        </div>
        <div>
          <h5>Tipo: &nbsp;<span className="text-secondary">{exam.examType}</span> </h5>
        </div>
        
      </div>
    </div>
  );
}

export default AppointmentDetailsExam;
