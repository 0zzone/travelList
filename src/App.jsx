import { useEffect, useState } from "react"
import { types, locations } from "./data"
import { Card, CardBody } from "@heroui/react"
import GlobeMap from "./components/GlobeMap"

const App = () => {

  const [filters, setFilters] = useState([])
  const [locationsFiltered, setLocationsFiltered] = useState(locations)

  useEffect(() => {
    if (filters.length === 0) {
      setLocationsFiltered(locations)
    } else {
      setLocationsFiltered(locations.filter((location) => {
        console.log(location.name, location.type)
        const isTypeSelected = filters.includes(location.type)
        return isTypeSelected
      }))
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
      <div className="w-[60dvw] h-[100dvh] overflow-scroll p-14 bg-dark">
        <h1 className="text-white text-5xl font-bold">Travel Finder</h1>

        <div className="flex justify-start flex-wrap gap-3 mt-5">
          {types.map((type, index) => (
            <p
              key={index}
              className={`text-white bg-[#f1f1f1]/10 backdrop-blur-sm max-w-max p-2 rounded-lg cursor-pointer ${filters.includes(type.key) ? 'bg-primary' : ''}`}
              onClick={() => selectFilter(type.key)}
            >
              {type.label}
            </p>
          ))}
        </div>

        <div className="flex justify-start flex-wrap gap-3 mt-5">
          {locationsFiltered.map((location, index) => (
            <Card
              key={index}
              className={`min-w-[30%] flex-1 p-5 rounded-lg text-white`}
              style={{ backgroundColor: getBackgroundColor(location.type) }}
            >
              <h2 className="text-xl font-bold">{location.type} {location.name}</h2>
              <p>{location.description}</p>
            </Card>
          ))}
        </div>

      </div>
      <GlobeMap />
    </div>
  )
}

export default App
