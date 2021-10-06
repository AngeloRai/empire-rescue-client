import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../apis";
import FacilityListCard from "./FacilityListCard";
import { convertToSlug } from "../componentHelpers/slugify";
import "./FacilityListCard.css";
import FacilityFilter from "./FacilityFilter";

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
            convertToSlug(facility.name).includes(convertToSlug(searchName))
          );
        }

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
    searchName,
  ]);

  return (
    <div className="row container ">
      <h2 className="my-3 text-center">Estabelecimentos</h2>
      <div className="facility-add-link-box">
        <Link
          to="/adicionar-estabelecimento"
          className="facility-add-link facility-link"
        >
          Adicionar Estabelecimento
        </Link>
      </div>
      <FacilityFilter
        setSearchCity={setSearchCity}
        searchCity={searchCity}
        setSearchName={setSearchName}
        searchName={searchName}
        setSearchLab={setSearchLab}
        searchLab={searchLab}
        setSearchEmergency={setSearchEmergency}
        searchEmergency={searchEmergency}
        setSearchHospital={setSearchHospital}
        searchHospital={searchHospital}
        setSearchClinic={setSearchClinic}
        searchClinic={searchClinic}
      />

      {!loading &&
        (searchCity ||
          searchName ||
          searchEmergency === true ||
          searchLab === true ||
          searchHospital === true ||
          searchClinic === true) &&
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
