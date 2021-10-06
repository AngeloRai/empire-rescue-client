import React from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { FaPhone, FaMobileAlt } from "react-icons/fa";

function PatientContact({ facility }) {
  return (
    <div className="facility-contatct-box col-md-12 col-lg-4 border p-2">
                
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
  )
}

export default PatientContact
