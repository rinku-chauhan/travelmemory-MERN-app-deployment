import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../url";
import axios from "axios";

export default function AddExperience() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    tripName: "",
    startDateOfJourney: "",
    endDateOfJourney: "",
    nameOfHotels: "",
    placesVisited: "",
    totalCost: 0,
    experience: "",
    image: "",
    tripType: "",
    featured: false,
    shortDescription: "",
  });

  const submitForm = async () => {
    console.log("========== BUTTON CLICKED ==========");
    console.log(formdata);

    try {
      setLoading(true);

      console.log("Sending POST request to:");
      console.log(`${baseUrl}/trip`);

      const response = await axios.post(`${baseUrl}/trip`, formdata);

      console.log("========== SUCCESS ==========");
      console.log(response);

      alert("Trip added successfully");

      // Reset form
      setFormdata({
        tripName: "",
        startDateOfJourney: "",
        endDateOfJourney: "",
        nameOfHotels: "",
        placesVisited: "",
        totalCost: 0,
        experience: "",
        image: "",
        tripType: "",
        featured: false,
        shortDescription: "",
      });

      // Go back to Home page
      navigate("/");

    } catch (err) {
      console.log("========== AXIOS ERROR ==========");

      console.log(err);
      console.log("Message:", err.message);
      console.log("Response:", err.response);
      console.log("Request:", err.request);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
      }

      alert("Request Failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: "2%" }}>
      <div className="mb-3">
        <label htmlFor="tripName" className="form-label">
          Trip Name
        </label>
        <input
          type="text"
          className="form-control"
          id="tripName"
          placeholder="Add your Trip Name"
          value={formdata.tripName}
          onChange={(e) =>
            setFormdata({ ...formdata, tripName: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tripDate" className="form-label">
          Trip Date
        </label>

        <div className="row">
          <div className="col-6">
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={formdata.startDateOfJourney}
              onChange={(e) =>
                setFormdata({
                  ...formdata,
                  startDateOfJourney: e.target.value,
                })
              }
            />
          </div>

          <div className="col-6">
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={formdata.endDateOfJourney}
              onChange={(e) =>
                setFormdata({
                  ...formdata,
                  endDateOfJourney: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="nameOfHotels" className="form-label">
          Name of Hotels
        </label>

        <input
          type="text"
          className="form-control"
          id="nameOfHotels"
          placeholder="Add your Hotel Name"
          value={formdata.nameOfHotels}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              nameOfHotels: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-3">
        <div className="row">
          <div className="col-6">
            <label htmlFor="tripType" className="form-label">
              Trip Type
            </label>

            <select
              className="form-select"
              id="tripType"
              value={formdata.tripType}
              onChange={(e) =>
                setFormdata({
                  ...formdata,
                  tripType: e.target.value,
                })
              }
            >
              <option value="">Select One</option>
              <option value="backpacking">Backpacking</option>
              <option value="leisure">Leisure</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div className="col-6">
            <label htmlFor="totalCost" className="form-label">
              Total Cost
            </label>

            <input
              type="number"
              className="form-control"
              id="totalCost"
              placeholder="99999"
              value={formdata.totalCost}
              onChange={(e) =>
                setFormdata({
                  ...formdata,
                  totalCost: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="placesVisited" className="form-label">
          Places Visited
        </label>

        <input
          type="text"
          className="form-control"
          id="placesVisited"
          placeholder="Delhi, Paris, London, etc."
          value={formdata.placesVisited}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              placesVisited: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Featured Trip?</label>

        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="featuredTrue"
            name="featured"
            value="true"
            checked={formdata.featured === true}
            onChange={(e) =>
              setFormdata({
                ...formdata,
                featured: JSON.parse(e.target.value),
              })
            }
          />
          <label htmlFor="featuredTrue">True</label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="featuredFalse"
            name="featured"
            value="false"
            checked={formdata.featured === false}
            onChange={(e) =>
              setFormdata({
                ...formdata,
                featured: JSON.parse(e.target.value),
              })
            }
          />
          <label htmlFor="featuredFalse">False</label>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image Link
        </label>

        <input
          type="text"
          className="form-control"
          id="image"
          placeholder="https://example.com/image.jpg"
          value={formdata.image}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              image: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="shortDescription" className="form-label">
          Short Description
        </label>

        <textarea
          className="form-control"
          id="shortDescription"
          rows="2"
          placeholder="Write Short Description"
          value={formdata.shortDescription}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              shortDescription: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="experience" className="form-label">
          Experience
        </label>

        <textarea
          className="form-control"
          id="experience"
          rows="5"
          placeholder="Write Complete Details about your experience in the trip."
          value={formdata.experience}
          onChange={(e) =>
            setFormdata({
              ...formdata,
              experience: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-3" style={{ textAlign: "center" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={submitForm}
        >
          Submit
        </button>
      </div>
    </div>
  );
}