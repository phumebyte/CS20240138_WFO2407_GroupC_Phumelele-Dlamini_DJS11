import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ShowDetail from "../components/dynamic/ShowDetail"; 

const ShowNavigation = () => {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText); // Handle failed response
        }
        const data = await response.json();
        setShow([data]); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails(); // Call the API when 'id' changes
  }, [id]);

  
  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="show-navigation">
      <h1 className="navigation-title">Show Details</h1>
      {/* Pass the fetched 'show' data as an array to ShowDetail */}
      {show && show.length > 0 && <ShowDetail show={show[0]} />} {/* Only pass the first object in the array */}
    </div>
  );
};

export default ShowNavigation;
