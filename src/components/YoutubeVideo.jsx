import { useState, useEffect } from "react";
import MapYoutubeVideo from "../mapper/MapYoutubeVideo.jsx";

const YoutubeVideo = () => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function youtube() {
      const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
      const options = { method: "GET", headers: { accept: "application/json" } };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data)
        setVideo(data);
      } catch (error) {
        console.error(error);
      }
    }
    youtube();
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="yt-header">
        <div className="yt-header__brand">
          <div className="yt-header__logo">
            {/* YouTube-style play icon */}
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div>
            <a
              href="https://www.youtube.com/@chaiaurcode"
              target="_blank"
              rel="noopener noreferrer"
              className="yt-header__title"
            >
              ChaiCode Youtube
            </a>
            <div className="yt-header__subtitle">Educational Content</div>
          </div>
        </div>
        <span className="yt-header__badge">Free API</span>
      </header>

      {/* Hero */}
      <section className="yt-hero">
        <span className="yt-hero__eyebrow">Curated for you</span>
        <h1 className="yt-hero__heading">
          Learn Something <span>New</span> Today
        </h1>
        <p className="yt-hero__desc">
          Hand-picked educational videos to help you grow your skills, one lesson at a time.
        </p>
      </section>

      {/* Video Grid */}
      <MapYoutubeVideo video={video} />

      {/* Footer */}
      <footer className="yt-footer">
        Powered by FreeAPI &nbsp;·&nbsp; Built with React
      </footer>
    </div>
  );
};

export default YoutubeVideo;
