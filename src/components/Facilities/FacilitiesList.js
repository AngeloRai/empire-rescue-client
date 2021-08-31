import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { api } from "../../apis";
import FacilityListCard from "./FacilityListCard";
import { convertToSlug } from "../componentHelpers/slugify";
import './FacilityListCard.css'

function FacilitiesList() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchLab, setSearchLab] = useState(false);
  const [searchEmergency, setSearchEmergency] = useState(false);
  const [searchHospital, setSearchHospital] = useState(false);
  const [searchClinic, setSearchClinic] = useState(false);

  useEffect(() => {
    const fetchFacilities = async () => {
      const fetchedFacilities = await api.get("/facilities-info");
      setFacilities(fetchedFacilities.data);
      console.log(fetchedFacilities.data);
      setLoading(false);
    };

    fetchFacilities();
  }, [setFacilities]);

  useEffect(() => {
    async function filterFacilities() {
      setLoading(true);
      try {
        let filteredArray = [...facilities];
        if (facilities.length && searchCity.length) {
          filteredArray = facilities.filter((facility) =>
            convertToSlug(facility.address.city).includes(
              convertToSlug(searchCity)
            )
          );
        } else {
          filteredArray = [...facilities];
        }
        if (searchName) {
          filteredArray = filteredArray.filter((facility) =>
            convertToSlug(facility.name).includes(
              convertToSlug(searchName)
            )
          );
        }
console.log(filteredArray);
        if (searchLab === true) {
          filteredArray = filteredArray.filter(
            (facility) => facility.laboratory === true
          );
        }

        if (searchEmergency === true) {
          filteredArray = filteredArray.filter(
            (facility) => facility.emergency === true
          );
        }

        if (searchHospital === true) {
          filteredArray = filteredArray.filter(
            (facility) => facility.hospital === true
          );
        }

        if (searchClinic === true) {
          filteredArray = filteredArray.filter(
            (facility) => facility.clinic === true
          );
        }

        setFilteredFacilities([...filteredArray]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    filterFacilities();
  }, [
    searchCity,
    facilities,
    searchEmergency,
    searchLab,
    searchHospital,
    searchClinic,
    searchName
  ]);

  return (
    <div className="row container " >
    <h2 className="my-3 text-center">Estabelecimentos</h2>
    <div className="facility-add-link-box">
          <Link to="/adicionar-estabelecimento" className="facility-add-link facility-link"  >
            Adicionar Estabelecimento
          </Link>
        </div>
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

      {!loading &&
        (searchCity || searchName ||
          searchEmergency === true ||
          searchLab === true ||
          searchHospital === true ||
          searchClinic === true ) &&
        filteredFacilities.map((facility) => (
          <FacilityListCard
            key={facility.id}
            facility={facility}
            address={facility.address}
          />
        ))}
      {!loading &&
        !searchCity &&
        !searchName &&
        !searchEmergency &&
        !searchLab &&
        !searchHospital &&
        !searchClinic &&
        facilities.map((facility) => (
          <FacilityListCard
            key={facility.id}
            facility={facility}
            address={facility.address}
          />
        ))}
    </div>
  );
}

export default FacilitiesList;
