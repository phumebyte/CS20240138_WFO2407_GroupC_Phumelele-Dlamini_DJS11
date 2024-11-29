// This component will display the details of the specific show

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPreviews } from "../../services/showsApi"; 
import "../../assets/styles/showDetail.css";
import LoadingSpinner from "../shared/LoadingSpinner";

const ShowDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadShowDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await fetchPreviews(id); 
        console.log(details)
        setShowDetails(details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadShowDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!showDetails) return <p>No details found for this show.</p>;

  return (
    <div className="show-detail-container">
      <h1>{showDetails.title}</h1>
      <img src={showDetails.image} alt={showDetails.title} className="show-image" />
      <p>{showDetails.description}</p>
      <p>Seasons: {showDetails.seasons}</p>
    </div>
  );
};

export default ShowDetail;
