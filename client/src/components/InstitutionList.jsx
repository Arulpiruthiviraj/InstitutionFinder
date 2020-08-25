import React, { useEffect, useContext } from "react";
import InstitutionFinder from "../api/InstitutionFinder";
import { InstitutionContext } from "../context/InstitutionContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";
const InstitutionList = (props) => {
  const { institutions, setInstitutions } = useContext(InstitutionContext);
  let history = useHistory();
  //fetching the data to table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await InstitutionFinder.get("/");
        setInstitutions(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await InstitutionFinder.delete(`/${id}`);

      setInstitutions(
        institutions.filter((institution) => {
          return institution._id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/institution/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/institution/${id}`);
  };

  //to show rating on table
  const renderRating = (institution) => {
    if (!institution.reviews.length) {
      return <span className="text-warning">0 reviews</span>;
    }
    //avg star
    let totalRatings = 0;

    institution.reviews.map((review) => {
      totalRatings += review.rating;

      return totalRatings;
    });
    let avg = totalRatings / institution.reviews.length;
    return (
      <>
        <StarRating rating={avg <= 5 ? avg : 5} />
        <span className="text-warning ml-1">
          ({institution.reviews.length})
        </span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Institution</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {institutions &&
            institutions.map((institution) => {
              return (
                <tr
                  key={institution._id}
                  onClick={() => handleRestaurantSelect(institution._id)}
                >
                  <td>{institution.name}</td>
                  <td>{institution.location}</td>
                  <td>{"$".repeat(institution.price_range)}</td>
                  <td>{renderRating(institution)}</td>

                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={(e) => handleUpdate(e, institution._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, institution._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default InstitutionList;
