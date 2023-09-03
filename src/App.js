import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import Swal from "sweetalert2";
import { IconButton, InputBase } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import Paper from "@mui/material/Paper";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [bgImage, setBgImage] = useState("/1000.jpg");
  const [temp, setTemp] = useState();
  const [active, setActive] = useState("1");

  const handleClick = (event) => {
    setActive(event.target.id);
    if (active === "1") {
      setTemp((prev) => !prev);
    }
    if (active === "2") {
      setTemp((prev) => !prev);
    }
  };

  const API_URL = `http://api.weatherapi.com/v1/current.json?key=eae9ffb4de7c47bd838110831233108&q=${
    !city ? "tbilisi" : city
  }&aqi=no`;

  const searchCity = () => {
    axios
      .get(API_URL)
      .then((res) => {
        setData(res.data);
        setBgImage(`/${res.data.current.condition.code}.jpg`);
      })
      .catch((err) => {
        Swal.fire("Location not found, Try different one");
      });

    setCity("");
  };

  useEffect(() => {
    searchCity();
  }, []);

  return (
    <div className="main">
      <div
        className="lashas_teoria"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>
      <div className="search">
        <Paper className="input">
          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Enter Location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                searchCity();
              }
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px", color: "white" }}
            aria-label="search"
            onClick={(e) => searchCity(e)}
          >
            <AiOutlineSearch />
          </IconButton>
        </Paper>
      </div>
      <div className="change">
        <p
          onClick={handleClick}
          id="1"
          className={active === "1" ? "active" : "change_text"}
        >
          C
        </p>
        <p className="change_text_1">/</p>
        <p
          onClick={handleClick}
          id="2"
          className={active === "2" ? "active" : "change_text"}
        >
          F
        </p>
      </div>
      <div className="container">
        <div className="description">
          {data.current ? (
            <h1>
              {temp === true
                ? data?.current.temp_f + " F"
                : data?.current.temp_c + " C"}
            </h1>
          ) : null}
          {data.current ? <h2>{data?.location.name}</h2> : null}
          {data.current ? (
            <p className="bgInfo">{data?.current.condition.text}</p>
          ) : null}
          <div className="minmax_container">
            {data.current ? (
              <p className="bgInfo">
                Feels Like:{" "}
                {temp === true
                  ? data?.current.feelslike_f + " F"
                  : data?.current.feelslike_c + " C"}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="details">
        <div className="details_inner">
          <p>Wind Speed</p>
          {data.current ? (
            <p>
              {temp === true
                ? data.current.wind_mph + "mph"
                : data.current.wind_kph + "km/h"}
            </p>
          ) : null}
        </div>
        <div className="details_inner">
          <p>Visibility</p>
          {data.current ? (
            <p>
              {temp === true
                ? data.current.vis_miles + " miles"
                : data.current.vis_km + " km"}
            </p>
          ) : null}
        </div>
        <div className="details_inner">
          <p>Perciption</p>
          {data.current ? <p>{data.current.precip_mm} mm</p> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
