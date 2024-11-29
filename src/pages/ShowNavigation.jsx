//import ShowDetail from "../components/dynamic/ShowDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ShowDetail from "../components/dynamic/ShowDetail";

const ShowNavigation = () => {
  const { id } = useParams(); 
  const [loading , setLoading] = useState(false);
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);

  console.log(id)

  useEffect(()=> {
    console.log(id)

    const fetchShowDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok){
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log(data)
        setShow(data);
      } catch (err){
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShowDetails();
  },[id])

if(loading) return <LoadingSpinner />
if(error) return  <p> {error} </p>

//console.log(show.title)

  return (
    <div className="show-navigation">
      <h1 className="navigation-title">Show Details</h1>
      
    </div>
  );
};

export default ShowNavigation;


