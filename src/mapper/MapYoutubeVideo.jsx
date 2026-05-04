import videoUrlMap from "../utils/VideoTitle.jsx";

const MapYoutubeVideo = ({ video }) => {
  if (!video || !video.data) {
    return (
      <div className="yt-loading">
        <div className="yt-spinner" />
        <p>Fetching videos...</p>
      </div>
    );
  }

  const videosArray = Array.isArray(video.data.data) ? video.data.data : [];

  if (videosArray.length === 0) {
    return (
      <div className="yt-loading">
        <p>No videos found.</p>
      </div>
    );
  }

  const formatCount = (num) => {
    if (!num) return "0";
    const n = parseInt(num, 10);
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return n.toString();
  };

  return (
    <div className="yt-grid-wrapper">
      <div className="yt-grid">
        {videosArray.map((videoItem, idx) => {
          const { id, snippet, statistics } = videoItem.items;

          const thumbnail =
            snippet?.thumbnails?.high?.url ||
            snippet?.thumbnails?.medium?.url ||
            snippet?.thumbnails?.default?.url;

          // Title se YouTube URL lookup karo
          const youtubeUrl = videoUrlMap[snippet?.title] || null;

          // Description se URLs strip karo
          const urlRegex = /https?:\/\/\S+/g;
          const cleanDesc = snippet?.description
            ? snippet.description
                .replace(urlRegex, "")
                .replace(/\s{2,}/g, " ")
                .trim()
            : "";

          const handleCardClick = () => {
            if (youtubeUrl) {
              window.open(youtubeUrl, "_blank", "noopener,noreferrer");
            }
          };

          return (
            <div
              className={`yt-card${youtubeUrl ? " yt-card--clickable" : ""}`}
              key={id ? `${id}-${idx}` : idx}
              onClick={handleCardClick}
              role={youtubeUrl ? "link" : undefined}
              aria-label={youtubeUrl ? `Watch: ${snippet?.title}` : undefined}
              tabIndex={youtubeUrl ? 0 : undefined}
              onKeyDown={(e) => {
                if (youtubeUrl && (e.key === "Enter" || e.key === " ")) {
                  handleCardClick();
                }
              }}
            >
              {/* Thumbnail */}
              <div className="yt-card__thumb">
                {thumbnail ? (
                  <img src={thumbnail} alt={snippet?.title} loading="lazy" />
                ) : (
                  <div className="yt-card__thumb-fallback">No Thumbnail</div>
                )}
                {/* Play overlay — sirf tab dikhao jab URL ho */}
                {youtubeUrl && (
                  <div className="yt-card__play">
                    <div className="yt-card__play-btn">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* YouTube badge */}
                {youtubeUrl && (
                  <span className="yt-card__yt-badge">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white">
                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
                    </svg>
                    Watch
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="yt-card__body">
                {/* Channel */}
                <div className="yt-card__channel">
                  <span className="yt-card__channel-dot" />
                  <span className="yt-card__channel-name">
                    {snippet?.channelTitle || "Unknown Channel"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="yt-card__title">{snippet?.title}</h3>

                {/* Clean Description */}
                {cleanDesc && (
                  <p className="yt-card__desc">{cleanDesc}</p>
                )}

                {/* Stats */}
                <div className="yt-card__stats">
                  <span className="yt-card__stat">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    </svg>
                    <strong>{formatCount(statistics?.viewCount)}</strong>
                  </span>

                  <span className="yt-card__stat">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                    </svg>
                    <strong>{formatCount(statistics?.likeCount)}</strong>
                  </span>

                  <span className="yt-card__stat">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 6.5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h11l4 4V6.5z" />
                    </svg>
                    <strong>{formatCount(statistics?.commentCount)}</strong>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapYoutubeVideo;
