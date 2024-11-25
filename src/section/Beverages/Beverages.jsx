import { useState, useEffect } from "react";
import axios from "axios";
import "./Beverages.css";
import icon_wel from "../../assets/icons/Color Overlay2.png";
import { FiDollarSign } from "react-icons/fi";


export default function Beverages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Stored Token:", token);
    if (token) {
      fetchData(token, 1, false);
    } else {
      fetchTokenAndData(1, false);
    }
  }, []);

  const fetchTokenAndData = async (page, loadAll) => {
    setLoading(true);
    try {
      const authResponse = await axios.post("https://calamardoalicante.com/api/login", {
        name: "developer",
        password: "devloperadmin",
      });

      if (!authResponse.data || !authResponse.data.access_token) {
        throw new Error("Token not found in the response");
      }

      const token = authResponse.data.access_token;
      console.log("Received Token:", token);
      localStorage.setItem("token", token);
      fetchData(token, page, loadAll);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchData = async (token, page, loadAll) => {
    setLoading(true);
    try {
      let allData = [];
      let hasMoreData = true;

      if (loadAll) {
        while (hasMoreData) {
          console.log(`Fetching data from page ${page}...`);
          const response = await axios.get(
            `https://calamardoalicante.com/api/drinks?page=${page}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Data Response:", response);
          if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // if (response.headers["content-type"] !== "application/json") {
          //   throw new Error("Response is not JSON");
          // }

          if (!response.data || !Array.isArray(response.data.data)) {
            throw new Error("Unexpected response structure");
          }

          allData = [...allData, ...response.data.data];
          hasMoreData = response.data.data.length > 0;
          page += 1;
        }
      } else {
        console.log(`Fetching data from page ${page}...`);
        const response = await axios.get(
          `https://api.calamardoalicante.com/api/drinks?page=${page}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Data Response:", response);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.headers["content-type"] !== "application/json") {
          throw new Error("Response is not JSON");
        }

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error("Unexpected response structure");
        }

        allData = response.data.data;
        hasMoreData = response.data.data.length > 0;
      }

      console.log("All Data:", allData);
      setData((prevData) => (loadAll ? [...prevData, ...allData] : allData));
      setHasMoreData(!loadAll);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const loadMoreData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData(token, currentPage + 1, true);
    } else {
      fetchTokenAndData(currentPage + 1, true);
    }
  };

  return (
    <div className="Beverages container" id="services">

      <h1>Beverages</h1>
      <p>WHAT WE DO</p>
      <p className="img_Mes mb-5">
        <img src={icon_wel} alt="Icon" />
      </p>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="cards mb-4">
        {data.map((card) => (
          <div key={card.id} className="Card">
            <img src= {`https://api.calamardoalicante.com/api/image/${card.photo}`} alt={card.name}/>
            <h3 className="BreName">{card.name}
               </h3>
               <p className="BevPrice">{card.price}<FiDollarSign /></p>
           
          </div>
        ))}
      </div>

      
      {!loading && hasMoreData && (
        <button onClick={loadMoreData} className="load-more bg-white mb-5">
              VIEW FULL MENU   
           </button>
      )}
    </div>
      );
}
