import "./Menu.css";
import { useState, useEffect } from "react";
import axios from "axios";
import icon_wel from "../../assets/icons/Color Overlay2.png";
import { FiDollarSign } from "react-icons/fi";


export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);
    if (token) {
      fetchFoods(token, 1, false);
    } else {
      fetchTokenAndFoods(1, false);
    }
  }, []);

  const fetchTokenAndFoods = async (page, loadAll) => {
    setLoading(true);
    try {
      const authResponse = await axios.post("https://api.calamardoalicante.com/api/login");

      if (!authResponse.data || !authResponse.data.access_token) {
        throw new Error("Token not found in the response");
      }

      const token = authResponse.data.access_token;
      console.log("Received Token:", token);
      localStorage.setItem('token', token);
      fetchFoods(token, page, loadAll);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchFoods = async (token, page, loadAll) => {
    setLoading(true);
    try {
      let allFoods = [];
      let hasMoreData = true;

      if (loadAll) {
        while (hasMoreData) {
          console.log(`Fetching foods from page ${page}...`);
          const response = await axios.get(
            `https://api.calamardoalicante.com/api/foods?page=${page}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Foods Response:", response);
          if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          if (response.headers["content-type"] !== "application/json") {
            throw new Error("Response is not JSON");
          }

          if (!response.data || !Array.isArray(response.data.data)) {
            throw new Error("Unexpected response structure");
          }

          allFoods = [...allFoods, ...response.data.data];
          hasMoreData = response.data.data.length > 0;
          page += 1;
        }
      } else {
        console.log(`Fetching foods from page ${page}...`);
        const response = await axios.get(
          `https://api.calamardoalicante.com/api/foods?page=${page}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Foods Response:", response);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.headers["content-type"] !== "application/json") {
          throw new Error("Response is not JSON");
        }

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error("Unexpected response structure");
        }

        allFoods = response.data.data;
        hasMoreData = response.data.data.length > 0;
      }

      console.log("All Foods Data:", allFoods);
      setFoods((prevFoods) => loadAll ? [...prevFoods, ...allFoods] : allFoods);
      setHasMoreData(!loadAll);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const loadMoreFoods = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchFoods(token, currentPage + 1, true);
    } else {
      fetchTokenAndFoods(currentPage + 1, true);
    }
  };

  return (
    <div className="menu-container" id="menu">
      <div className="MenuContent Beverages">
        <h1>Browse</h1>
        <p>OUR MENU</p>
        <p className="img_Mes mb-5">
          <img src={icon_wel} alt="Icon" />
        </p>
      </div>
      <div className="backColor container" style={{ display: "flex", flexWrap: "wrap" }}>
        {foods.map((food) => (
          <div key={food.id} className="food-item">
            <img className="imgCard" src={`https://api.calamardoalicante.com/api/image/${food.photo}`} alt={food.name} />
           <hr />
            <h2 className="nameCard">{food.name} <span>{food.price}<FiDollarSign /></span></h2>
            <p className="desCard">{food.description}</p>
          </div>
        ))}
        </div>
      {error && <p className="error">Error: {error}</p>}
      {loading && <p className="loading">Loading...</p>}
      {!loading && hasMoreData && (
        <button onClick={loadMoreFoods} className="load-more">
          VIEW FULL MENU
        </button>
      )}
    </div>
  );
}
