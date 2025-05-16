import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";

const VideoUpload = () => {
  const [url, setUrl] = useState("");

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center gap-2 mb-2">
        <FaYoutube className="text-red-600 text-xl" />
        <h3 className="text-lg font-semibold">Reference Video</h3>
      </div>
      <input
        type="text"
        className="w-full border p-2 rounded mb-2"
        placeholder="Paste YouTube video URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      {url && (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${url.split("v=")[1]}`}
            title="YouTube Video"
            allowFullScreen
            className="w-full h-full rounded"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
