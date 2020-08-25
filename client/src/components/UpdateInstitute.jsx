import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { InstitutionContext } from "../context/InstitutionContext";
import InstitutionFinder from "../api/InstitutionFinder";

const UpdateInstitute = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { institutions } = useContext(InstitutionContext);
  const initialFormState = {
    name: "",
    location: "",
    price_range: "",
  };
  const [institution, setInstitution] = useState(initialFormState);

  useEffect(() => {
    const fetchData = async () => {
      const response = await InstitutionFinder.get(`/${id}`);
      setInstitution(response.data);
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInstitution({ ...institution, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await InstitutionFinder.put(
      `/${id}`,
      institution
    );
    history.push("/");
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={institution.name}
            onChange={handleInputChange}
            id="name"
            className="form-control"
            type="text"
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={institution.location}
            onChange={handleInputChange}
            id="location"
            className="form-control"
            type="text"
            name="location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <select
            className="custom-select my-1 mr-sm-2"
            name="price_range"
            value={institution.price_range}
            onChange={handleInputChange}
            name="price_range"
          >
            <option disabled> Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateInstitute;
