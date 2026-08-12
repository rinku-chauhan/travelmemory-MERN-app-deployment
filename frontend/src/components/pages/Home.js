import React, { useEffect, useState } from "react";
import Card from "../UIC/Card";
import FeaturedCard from "../UIC/FeaturedCard";
import axios from "axios";
import { baseUrl } from "../../url";

export default function Home() {
  // Store API response
  const [data, setData] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    axios
      .get(`${baseUrl}/trip`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Show loading while API request is in progress
  if (loading) {
    return (
      <div style={{ margin: "2%" }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Show message if database has no trips
  if (data.length === 0) {
    return (
      <div style={{ margin: "2%" }}>
        <h4>No trips found.</h4>
        <p>Add your first travel experience using the "Add Experience" page.</p>
      </div>
    );
  }

  return (
    <div style={{ margin: "2%" }}>
      {/* Featured Trips */}
      {data
        .filter((e) => e.featured)
        .map((e) => (
          <FeaturedCard
            key={e._id}
            title={e.tripName}
            tripType={e.tripType}
            description={e.shortDescription}
            id={e._id}
          />
        ))}

      {/* Normal Trips */}
      {data
        .filter((e) => !e.featured)
        .map((e) => (
          <Card
            key={e._id}
            title={e.tripName}
            tripType={e.tripType}
            description={e.shortDescription}
            id={e._id}
          />
        ))}
    </div>
  );
}
