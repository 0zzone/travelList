import { useEffect, useState, useRef } from "react"
import { types, locations } from "./data"
import { Input, Select, SelectItem } from "@heroui/react"
import GlobeMap from "./components/GlobeMap"
import CardLocation from "./components/CardLocation"
import { IoSearch } from "react-icons/io5";

const App = () => {

  const mapRef = useRef(null);

  const [filters, setFilters] = useState([])
  const [locationsFiltered, setLocationsFiltered] = useState(locations.reduce((acc, item) => {
    const key = item.type;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }
  , {}));



  useEffect(() => {
    if (filters.length === 0) {
      const locs = locations.reduce((acc, item) => {
        const key = item.type;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});
      
      setLocationsFiltered(locs);

    } else {
      setLocationsFiltered(locations.filter((location) => {
        const isTypeSelected = filters.includes(location.type)
        return isTypeSelected
      }).reduce((acc, item) => {
        const key = item.type;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {}));
    }
  }, [filters])

  const selectFilter = (type) => {
    if (filters.includes(type)) {
      setFilters(filters.filter((filter) => filter !== type))
    } else {
      setFilters([...filters, type])
    }
  }

  const getBackgroundColor = (type) => {
    const typeFound = types.find(t => t.key === type)
    return typeFound.backgroundColor
  }


  return (
    <div className="flex justify-center items-center bg-dark">
      <div className="w-[60dvw] h-[100dvh] overflow-scroll scrollbar-none p-14 bg-dark">
        <h1 className="text-white text-5xl font-title">Travel Finder</h1>

        <div className="flex justify-start flex-wrap gap-3 mt-5">
          {types.map((type, index) => (
            <p
              key={index}
              className={`text-white bg-[#f1f1f1]/10 backdrop-blur-sm max-w-max p-2 rounded-lg cursor-pointer`}
              style={{ backgroundColor: filters.includes(type.key) ? type.backgroundColor : '' }}
              onClick={() => selectFilter(type.key)}
            >
              {type.label}
            </p>
          ))}
          <p className="text-gray-500 italic">Click to select the types you want to filter by 👆</p>
        </div>

        <div>
          {Object.keys(locationsFiltered).map((key, index) => (
            <div key={index}>
              <h2 className="text-2xl text-white mt-10 font-title">{types.find(type => type.key === key)?.label}</h2>
              <div className="flex justify-start flex-wrap gap-3 mt-5">
                {locationsFiltered[key].map((location, index2) => (
                  <CardLocation
                    key={index2}
                    location={location}
                    mapRef={mapRef}
                    getBackgroundColor={getBackgroundColor}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
      <GlobeMap mapRef={mapRef}  getBackgroundColor={getBackgroundColor} />
    </div>
  )
}

export default App
