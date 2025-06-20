import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import navlogo from "../../assets/favicon_32x32.png";
import './navbar.css';
import '../mainpage/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faMagnifyingGlass,
  faPlus,
  faBell,
  faBars
} from '@fortawesome/free-solid-svg-icons';

const API_KEY = "AIzaSyCFqm9_X8K-DOpRBC9K1kHyhTwxGBuGW6M"; 

const toggleSidebar = () => {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.classList.toggle("collapsed");
  }
};


const Navbar = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); 

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchTerm)}&key=${API_KEY}&maxResults=20&type=video`
      );
      const data = await response.json();

      setSearchResults(data.items || []); 
      navigate("/search"); 

    } catch (error) {
      console.error("Error fetching YouTube search results:", error);
    }
  };

  return (
    <section id="nav">
      <div className="navbar">
        <div className="first-sec">
          <div className="menu">

            <button id="menu-sec" onClick={toggleSidebar}>
              <FontAwesomeIcon className="icon" icon={faBars} />
            </button>

          </div>

          <div className="logo" 
          onClick={() => navigate('/')}>
            <img src={navlogo} alt="nav-logo" />
            <span onClick={() => {document.title="YouTube"}}>Pankaj<sup>IN</sup></span>
          </div>

        </div>

        <div className="sec-2">
          <form className="search" onSubmit={handleSearch}>
            <input
              type="search"
              name="search"
              id="search-inp"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="sea-logo" type="submit">
              <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
            </button>
          </form>
          <div className="mike">
            <button>
              <FontAwesomeIcon className="icon" icon={faMicrophone} />
            </button>
          </div>
        </div>

        <div className="sec-3">
          <div>
            <button className="create">
              <FontAwesomeIcon className="icon" icon={faPlus} /> Create
            </button>
          </div>
          <div>
            <button className="bell">
              <FontAwesomeIcon icon={faBell} />
            </button>
          </div>
          <div className="email-section">
            <div className="email">
              <a href="#">P</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
