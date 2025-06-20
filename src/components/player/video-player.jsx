import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import './video-player.css';

const API_KEY = "AIzaSyCFqm9_X8K-DOpRBC9K1kHyhTwxGBuGW6M";  //Api key

//views dikhane k liye function

const formatViews = (views) => {
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M views";
  if (views >= 1_000) return (views / 1_000).toFixed(1) + "K views";
  return views + " views";
};

//kitne time phle upload kiya h 

const timeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 7) return `${diff} days ago`;
  const weeks = Math.floor(diff / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
};

//video player 

const VideoPlayer = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videos, setVideos] = useState([]);
  const [videoDetails, setVideoDetails] = useState(null);
  const [comments, setComments] = useState([]);

  //datafetching aur dom manipuation k liye use kiya h use effect

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=20&regionCode=IN&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data.items || []))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  // video ki details k liye

  useEffect(() => {
    if (!videoId) return;
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setVideoDetails(data.items?.[0] || null))
      .catch((error) => console.error("Error fetching video details:", error));
  }, [videoId]);

  //comments ke liye code

  useEffect(() => {
    if (!videoId) return;
    fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=14&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setComments(data.items || []))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [videoId]);

  if (!videoId) return <h2 style={{ color: "white", padding: "20px" }}>Video not found</h2>;

  //to tell react the state is changed

  const [showMore, setShowMore] = useState(false);
  const MAX_DESC_LENGTH = 200;

  return (
    <section id="plat">
      <div className="vid">
  
          <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube Video Player"
            style={{ border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="details">
          {videoDetails && videoDetails.snippet && (
            <>
              <h2>{videoDetails.snippet?.title}</h2>
              <p>
                <strong>{videoDetails.snippet?.channelTitle}</strong> {" "} <br />
                {formatViews(Number(videoDetails.statistics?.viewCount) || 0)} •{" "}
                {timeAgo(videoDetails.snippet?.publishedAt)}
              </p>
              <p>
                {showMore || (videoDetails.snippet?.description?.length ?? 0) <= MAX_DESC_LENGTH
                  ? videoDetails.snippet?.description
                  : videoDetails.snippet?.description?.slice(0, MAX_DESC_LENGTH) + "..."}
                {(videoDetails.snippet?.description?.length ?? 0) > MAX_DESC_LENGTH && (
                  
                  <button
                    className="show-more-btn"
                    onClick={() => setShowMore((prev) => !prev)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#3ea6ff",
                      cursor: "pointer",
                      marginLeft: "4px",
                      fontSize: "12px",
                      padding: 0,
                    }}
                  >
                    {showMore ? "Show less" : "Show more"}
                  </button>
                )}
              </p>
            </>
          )}
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          {comments.length === 0 && <p>No comments found.</p>}
          <ul>
            {comments.map((comment) => {
              const c = comment.snippet.topLevelComment.snippet;
              return (
                <li key={comment.id} className="comment">
                  <div className="comment-author">
                    <img src={c.authorProfileImageUrl} alt={c.authorDisplayName} width={32} height={32} />
                    <span>{c.authorDisplayName}</span>
                  </div>
                  <div className="comment-text">{c.textDisplay}</div>
                  <div className="comment-date">{timeAgo(c.publishedAt)}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="suggestion">
        <h3>Suggested Videos</h3>
        <div className="page-sugg-videos">
          {videos.map((video) => (
            <Link to={`/watch?v=${video.id}`} key={video.id} className="page-video-card"
            onClick={() => {document.title=`${video?.snippet?.title}`}}>
              <div className="page-img-sec" >
                <img
                  src={video?.snippet?.thumbnails?.medium?.url || ""}
                  alt={video?.snippet?.title || "Video thumbnail"}
                />
              </div>
              <div className="page-text">
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

export default VideoPlayer;