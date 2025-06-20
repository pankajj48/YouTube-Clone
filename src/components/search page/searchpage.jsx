import './searchpage.css'
import '../mainpage/main.jsx';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFire, faMusic, faGamepad, faNewspaper, faTrophy, faLightbulb, faShirt, faGear, faFlag, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { SiYoutubeshorts } from 'react-icons/si';
import { MdOutlineSubscriptions, MdOutlinePlaylistPlay, MdOutlineWatchLater, MdOutlineFeedback } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';
import { LuSquarePlay } from 'react-icons/lu';
import { AiOutlineLike } from 'react-icons/ai';
import { useState } from 'react';

const categoryMap = {
  "Trending": faFire,
  "Music": faMusic,
  "Gaming": faGamepad,
  "News": faNewspaper,
  "Sports": faTrophy,
  "Learning": faLightbulb,
  "Fashion & Beauty": faShirt
};


  const timeAgo = (date) => {
    const now = new Date();
    const publishedDate = new Date(date);
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count > 0)
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

const Searchpage = ({ results }) => {
  const [activeCategory, setActiveCategory] = useState("Trending");
  const navigate = useNavigate();

  return (
    <>
      <section id="front-view">
        <div id="sidebar" className="left-sec">
          <div className="row">

            <button onClick={() => navigate('/')}>
              <FontAwesomeIcon className="main-icon" icon={faHouse} />{" "}
              <span>Home</span>
            </button>
            <button>
              <SiYoutubeshorts className="main-icon" /> <span>Shorts</span>{" "}
            </button>

            <button>
              <MdOutlineSubscriptions className="main-icon" />{" "}
              <span>Subscriptions</span>
            </button>

          </div>

        <hr className="hide" />

        <div className="row hide">
          <button>You &gt;</button>
          <button>
            <FaHistory className="main-icon" /> History
          </button>
          <button>
            <MdOutlinePlaylistPlay className="main-icon" /> Playlists
          </button>
          <button>
            <LuSquarePlay className="main-icon" /> Your Videos
          </button>
          <button>
            <MdOutlineWatchLater className="main-icon" /> Watch later
          </button>
          <button>
            <AiOutlineLike className="main-icon" /> Liked Videos
          </button>
        </div>
        <hr className="hide" />
        <div className="row hide">
          <button>Explore</button>
          {Object.keys(categoryMap).map((name) => (
            <button
              key={name}
              className={activeCategory === name ? "active" : ""}
              onClick={() => setActiveCategory(name)}
            >
              <FontAwesomeIcon
                className="main-icon"
                icon={
                  name === "Trending"
                    ? faFire
                    : name === "Music"
                    ? faMusic
                    : name === "Gaming"
                    ? faGamepad
                    : name === "News"
                    ? faNewspaper
                    : name === "Sports"
                    ? faTrophy
                    : name === "Learning"
                    ? faLightbulb
                    : name === "Fashion & Beauty"
                    ? faShirt
                    : faFire // fallback
                }
              />{" "}
              {name}
            </button>
          ))}
        </div>
        <hr className="hide" />
        <div className="row hide">
          <button>
            <FontAwesomeIcon className="main-icon" icon={faGear} /> Settings
          </button>
          <button>
            <FontAwesomeIcon className="main-icon" icon={faFlag} /> Report
            history
          </button>
          <button>
            <FontAwesomeIcon className="main-icon" icon={faCircleQuestion} />{" "}
            Help
          </button>
          <button>
            <MdOutlineFeedback className="main-icon" /> Send feedback
          </button>
        </div>
        <hr className="hide" />
        <div className="row foot hide">
          <div className="foot-row">
            <a href="#">About</a>
            <a href="#">Press</a>
            <a href="#">Copyright</a>
            <a href="#">Contact us</a>
            <a href="#">Creators</a>
            <a href="#">Advertise</a>
            <a href="#">Developer</a>
          </div>
          <div className="foot-row">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Policy & Safety</a>
            <a href="#">How YouTube works</a>
            <a href="#">Test new features</a>
          </div>
          <div className="foot-row">
            <span> &copy; 2025 Pankaj</span>
          </div>
        </div>
      </div>

      <div className="right-sec">
        <div className="search-results">

          {results.length > 0 ? (

            <div className="results-container">

              {results.map((item) => (

                <div key={item.id.videoId || item.etag} className="result-card" 
                onClick={() => navigate(`/watch?v=${item.id.videoId}`)}
                style={{ cursor: "pointer" }} >
                  <img src={item.snippet.thumbnails.medium.url} alt="video thumbnail" 
                  onClick={() => {document.title=`${item?.snippet?.title}`}}/>
                  <div>
                      <h4>{item.snippet.title}</h4>
                      <p>{item.snippet.channelTitle}</p>
                      <span>{timeAgo(item?.snippet?.publishedAt || new Date())}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
      </section>
    </>
  );
};

export default Searchpage;
