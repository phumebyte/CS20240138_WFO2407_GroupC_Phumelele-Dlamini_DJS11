export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Add an episode to favourites
  const addFavourite = (episode) => {
    if (!favourites.some((fav) => fav.id === episode.id)) {
      setFavourites([...favourites, episode]);
    }
  };

  // Remove an episode from favourites
  const removeFavourite = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

  return (
    <FavouriteContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

// Prop validation for FavouriteProvider
FavouriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Shape validation for episodes in favourites
export const episodeShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  seasonImage: PropTypes.string,
  file: PropTypes.string.isRequired,
  showName: PropTypes.string.isRequired,
});

// Validation for favourites and context functions
FavouriteContext.propTypes = {
  favourites: PropTypes.arrayOf(episodeShape).isRequired,
  addFavourite: PropTypes.func.isRequired,
  removeFavourite: PropTypes.func.isRequired,
};
