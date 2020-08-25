import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import { InstitutionContext } from "../context/InstitutionContext";
import InstitutionFinder from "../api/InstitutionFinder";

const InstitutionDetailPage = () => {
  const { id } = useParams();
  const { selectedInstitution, setSelectedInstitution } = useContext(
    InstitutionContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await InstitutionFinder.get(`/${id}`);
        setSelectedInstitution(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {selectedInstitution && (
        <>
          <h1 className="text-center display-1">{selectedInstitution.name}</h1>
          <div className="text-center">
            <span className="text-warning ml-1">
              {selectedInstitution.count
                ? `(${selectedInstitution.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedInstitution.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default InstitutionDetailPage;
