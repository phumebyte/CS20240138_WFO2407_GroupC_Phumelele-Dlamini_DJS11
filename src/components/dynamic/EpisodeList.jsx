import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPreviews } from "../../services/showsApi";
import "../../assets/styles/episodeList.css"; 
import LoadingSpinner from "../shared/LoadingSpinner";

const PodcastList = () => {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const  navigate = useNavigate();


  useEffect(() => {
    const loadPreviews = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const data = await fetchPreviews();
        //console.log(data)
        setPreviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPreviews();
  }, []);

  return (
    <div className="podcast-list-container">

      {/* Loading State */}
      {loading && <LoadingSpinner/>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Previews Grid */}
      {!loading && !error && (
        <div className="podcast-grid">
          {previews.map((preview) => (
            <div className="podcast-card" 
                 key={preview.id}
                 onClick={() => navigate(`/show/${preview.id}`)}
                 >
              <img
                src={preview.image}
                alt={preview.name}
                className="podcast-image"
              />
              <div className="podcast-info">
                <h3 className="podcast-title">{preview.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PodcastList;