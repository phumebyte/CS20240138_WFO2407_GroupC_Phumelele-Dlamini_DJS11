import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPreviews } from "../../services/showsApi";
import "../../assets/styles/episodeList.css";
import LoadingSpinner from "../shared/LoadingSpinner";
import HomePageFilter from "../dynamic/HomePageFilter";

const PodcastList = () => {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPreviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPreviews();

        const sortedData = data.sort((a, b) => 
            a.title.localeCompare(b.title)
          );

        console.log(data)
        setPreviews(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPreviews();
  }, []);

  const handleSort = (type) => {
    let sortedPreviews;
    switch (type) {
      case "a-z":
        sortedPreviews = [...previews].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "z-a":
        sortedPreviews = [...previews].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "oldest":
        sortedPreviews = [...previews].sort(
          (a, b) => new Date(a.updated) - new Date(b.updated)
        );
        break;
      case "newest":
        sortedPreviews = [...previews].sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
        break;
      default:
        sortedPreviews = previews;
    }
    setPreviews(sortedPreviews);
  };

  const handelCardClick = (id) => {
    navigate(`/shows/:${id}`);
  }


  return (
    <div className="podcast-list-container">
      <HomePageFilter onSort={handleSort} />

      {loading && <LoadingSpinner />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <div className="podcast-grid">
          {previews.map((preview) => (
            <div className="podcast-card" key={preview.id} onClick={() => handelCardClick(preview.id)}>
              <img
                src={preview.image}
                alt={preview.title}
                className="podcast-image"
              />
              <div className="podcast-info">
                <div className="podcast-title">
                    <h6>{preview.title}</h6>
                </div>
                <div className="seasonsCounter">
                    <p className="seasonsTitle">SEASONS</p>
                    <p> {preview.seasons}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PodcastList;
