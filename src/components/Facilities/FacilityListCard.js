import React from "react";
import { Link } from "react-router-dom";
import "./FacilityListCard.css";
import { FaPhone } from "react-icons/fa";

function FacilityListCard({ facility, address }) {
  return (
    <div className="col-12 col-md-12 col-lg-6 facility-card" key={facility.id}>
      <div className="border facility-inner-card">
        <div>
          <Link
            className="text-decoration-none"
            to={`/estabelecimento-detalhes/${facility.id}`}
          >
            <div className="facility-name-unit">
              <span className="text-secondary facility-name-card">
                {facility.name}{" "}
              </span>
              <div>
                <span className="text-dark">{address.city}</span>
              </div>
              <small className="text-secondary">
                {" "}
                <strong>unidade:</strong> {facility.unit}
              </small>
            </div>
          </Link>
          <div className="facility-name-unit">
            <div>
              <span>
                <FaPhone className="phone-icon" />
                {facility.phone1}
              </span>
            </div>
            <div className="text-center m-1">
              {facility.emergency === true ? (
                <span className="badge bg-danger text-white badgets-fixed-height-facility">
                  P A
                </span>
              ) : null}
              {facility.clinic === true ? (
                <span className="badge bg-primary text-white badgets-fixed-height-facility">
                  CONSULTÓRIO
                </span>
              ) : null}
              {facility.hospital === true ? (
                <span className="badge bg-success text-white badgets-fixed-height-facility">
                  HOSPITAL
                </span>
              ) : null}
              {facility.laboratory === true ? (
                <span className="badge bg-info text-white badgets-fixed-height-facility">
                  LAB
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityListCard;
