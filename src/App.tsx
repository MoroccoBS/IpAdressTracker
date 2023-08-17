import "./App.css";
import { useEffect, useRef, useState } from "react";
import InputField from "./components/InputField";
import Data from "./components/Data";
import axios from "axios";
import MapComponent from "./components/MapComponent";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

function App() {
  const API_KEY = import.meta.env.VITE_REACT_APP_AXIOS_KEY;
  const Input = useRef<HTMLInputElement>(null);
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const linkRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

  const [IpAddress, setIpAddress] = useState("");
  const [Location, setLocation] = useState(["", ""]);
  const [TimeZone, setTimeZone] = useState("");
  const [ISP, setISP] = useState("");
  const [Loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 32.69922,
    lng: -117.11281,
  });
  const [Error, setError] = useState(false);

  async function executeFunction(event: React.FormEvent) {
    await new Promise((resolve) => {
      event.preventDefault();
      setTimeout(() => {
        const updatedValue = Input.current?.value ?? "";
        resolve(renderData(updatedValue));
      }, 0);
    });
  }
  async function renderData(updatedValue: string) {
    if (!updatedValue) {
      return;
    }
    try {
      setLoading(true);
      if (ipRegex.test(updatedValue)) {
        const dataIpAddress = await axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${updatedValue}`
        );
        getData(dataIpAddress);
      } else if (linkRegex.test(updatedValue)) {
        const dataDomain = await axios.get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&domain=${updatedValue}`
        );
        getData(dataDomain);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getData = (ApiData: any) => {
    const ApiIpAddress = ApiData.data.ip;
    const ApiLocation = [
      ApiData.data.location.country,
      ApiData.data.location.region,
      ApiData.data.location.lat,
      ApiData.data.location.lng,
      ApiData.data.location.city,
    ];
    const ApiTimeZone = ApiData.data.location.timezone;
    const ApiISP = ApiData.data.isp;
    setIpAddress(ApiIpAddress);
    setLocation([ApiLocation[0], ApiLocation[1], ApiLocation[4]]);
    setCoordinates({ lat: ApiLocation[2], lng: ApiLocation[3] });
    setTimeZone(ApiTimeZone);
    setISP(ApiISP);
    setLoading(false);
  };

  useEffect(() => {
    axios.get("https://api.ipify.org/").then((res) => {
      renderData(res.data);
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {Error && (
          <motion.div
            initial={{ y: -200, opacity: 0, x: "-50%" }}
            animate={{ y: 100, opacity: 1, x: "-50%" }}
            exit={{ y: -200, opacity: 0, x: "-50%" }}
            className="top-0 left-1/2 rounded-xl p-6 z-50 absolute w-3/6 h-fit flex flex-col gap-3 justify-center items-center bg-white m-auto"
          >
            <h1 className="text-xl text-red-700 font-medium tracking-wider">
              Invalid IP Address or Domain
            </h1>
            <button onClick={() => setError(false)}>
              <AiOutlineClose size={30} fill="red" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <InputField
        InputRef={Input}
        onClick={executeFunction}
        Loading={Loading}
      />
      <Data
        ipAddress={IpAddress}
        Location={Location}
        TimeZone={TimeZone}
        ISP={ISP}
      />
      <MapComponent Lat={coordinates.lat} Lng={coordinates.lng} />
    </>
  );
}

export default App;
