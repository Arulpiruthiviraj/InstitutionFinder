import React, { useState, useContext } from "react";
import InstitutionFinder from "../api/InstitutionFinder";
import { InstitutionContext } from "../context/InstitutionContext";

const AddInstitution = () => {
  const { addInstitutions } = useContext(InstitutionContext);

  const initialFormState = {
    name: "",
    location: "",
    price_range: "",
  };
  const [institution, setInstitution] = useState(initialFormState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInstitution({ ...institution, [name]: value });
  };

  //submitting to backend

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await InstitutionFinder.post("/", institution);
      addInstitutions(response.data.data.institution);
      setInstitution(initialFormState);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              name="name"
              value={institution.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="location"
              name="location"
              value={institution.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="col">
            <select
              className="custom-select my-1 mr-sm-2"
              name="price_range"
              value={institution.price_range}
              onChange={handleInputChange}
            >
              <option disabled> Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInstitution;
