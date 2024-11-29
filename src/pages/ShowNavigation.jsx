import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPreviews } from "../services/showsApi";
import "../assets/styles/ShowNavigation.css"

const ShowNavigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadShow = async () => {
    console.log('Fetching data successful')
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPreviews(id);
        console.log(data)
        setShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadShow();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="show-navigation-container">
      <button className="close-button" onClick={() => navigate("/")}>
        X
      </button>

      {show && (
        <div className="show-grid">
          {/* Left Column */}
          <div className="show-details">
            <img src={show.image} alt={show.title} className="show-image" />
            <h1 className="show-title">{show.title}</h1>
            <p className="show-description">{show.description}</p>
            <div className="genres">
              {show.genres.map((genre, index) => (
                <button key={index} className="genre-button">
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="episode-list">
            <h2>Episodes</h2>
            <div className="episodes-grid">
              {show.episodes.map((episode) => (
                <div className="episode-card" key={episode.id}>
                  <h3 className="episode-title">{episode.name}</h3>
                  <p className="episode-season">Season: {episode.season}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowNavigation;
