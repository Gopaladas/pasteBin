import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { pasteBinURI } from "../mainApi";
import "./ViewPaste.css";

const ViewPaste = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await axios.get(`${pasteBinURI}/pastes/${id}`);
        setContent(res.data.content);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Paste not found or expired");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;

  if (error) {
    return (
      <div className="not-found">
        <h2>404 - Not Found</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="view-container">
      <h2>Paste Content</h2>
      <pre className="paste-content">{content}</pre>
    </div>
  );
};

export default ViewPaste;
