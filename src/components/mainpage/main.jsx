import "./main.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFire,
  faMusic,
  faGamepad,
  faNewspaper,
  faTrophy,
  faLightbulb,
  faShirt,
  faGear,
  faFlag,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { SiYoutubeshorts } from "react-icons/si";
import {
  MdOutlineSubscriptions,
  MdOutlinePlaylistPlay,
  MdOutlineWatchLater,
  MdOutlineFeedback,
} from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { LuSquarePlay } from "react-icons/lu";
import { AiOutlineLike } from "react-icons/ai";

const API_KEY = "AIzaSyCFqm9_X8K-DOpRBC9K1kHyhTwxGBuGW6M";

const Frontpage = () => {
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const categoryMap = {
    All: null,
    Trending: null,
    Music: "10",
    Gaming: "20",
    News: "25",
    Sports: "17",
    Learning: "27",
    "Fashion & Beauty": "26",
  };

  const formatViews = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M views";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K views";
    return num + " views";
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

  useEffect(() => {
    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=42&regionCode=IN&key=${API_KEY}`;

    if (categoryMap[activeCategory]) {
      url += `&videoCategoryId=${categoryMap[activeCategory]}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setVideos(data.items || []))
      .catch((error) => console.error("Error fetching videos:", error));
  }, [activeCategory]);

  return (
    <section id="front-view">
      <div id="sidebar" className="left-sec">
        <div className="row">
          <button>
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
        <div className="videos-grid">
          {videos.map((video) => (
            <Link
              to={`/watch?v=${video.id}`}
              key={video.id || video.etag}
              className="video-card"
              onClick={() => {document.title=`${video?.snippet?.title}`}}
            >
              <div className="img-sec">
                <img
                  src={video?.snippet?.thumbnails?.medium?.url || ""}
                  alt={video?.snippet?.title || "Video thumbnail"}
                />
              </div>
              <div className="text">
                <h4>{video?.snippet?.title || "Untitled"}</h4>
                <p>{video?.snippet?.channelTitle || "Unknown Channel"}</p>
                <span>
                  {formatViews(Number(video?.statistics?.viewCount) || 0)} •{" "}
                  {timeAgo(video?.snippet?.publishedAt || new Date())}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Frontpage;
