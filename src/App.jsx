import './App.css'
import { useEffect , useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import ClockLoader from "react-spinners/ClockLoader";
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import { Home  , Admin, Dash} from './pages/index'
import ProtectedRoute from './components/ProtectedRoute'
import { FaTurnUp } from "react-icons/fa6";

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  ////////////////////////////////

  useEffect(() => {
    const up = document.querySelectorAll(".up");

    const handleScroll = () => {
      window.scrollY >= 120
        ? up.forEach((item) => item.classList.add("look"))
        : up.forEach((item) => item.classList.remove("look"));
    };

    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("scroll", handleScroll);
    up.forEach((item) => item.addEventListener("click", handleScrollToTop));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      up.forEach((item) =>
        item.removeEventListener("click", handleScrollToTop)
      );
    };
  }, []);


////////////////////////////////
useEffect(() => {
  setInterval(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

  
    const elements = document.querySelectorAll(".left , .right , .hidden , .top")

    elements.forEach((el)=>{observer.observe(el)})

    return () => {
      elements.forEach((el) =>{observer.unobserve(el)})
 
    };
  });
}, []);

//////////////////////////////

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');
  }, []);
  return (
    <>
    <button className='up'><FaTurnUp /></button>
    {loading ? (
      <ClockLoader className='loading' color="#f39c12" />
       ) : ( 
        <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Login' element={<Admin />}/>
        <Route 
            path="/Dash" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
              {<Dash />}
              </ProtectedRoute>
            } 
          />
      </Routes>
    </Router>
    </>
   ) }
{} 
</>
  )
}

export default App
