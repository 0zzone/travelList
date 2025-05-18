import {Card, CardBody, CardHeader} from "@heroui/react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useState } from "react";

const CardLocation = ({ location, mapRef, getBackgroundColor, isOnMap = false }) => {

    const [isFavorite, setIsFavorite] = useState(
        (JSON.parse(window.localStorage.getItem('favoriteLocations')) || []).some(loc => loc.name === location.name)
    );

    const addToFavorites = () => {
        window.localStorage.setItem(
            'favoriteLocations',
            JSON.stringify([...JSON.parse(window.localStorage.getItem('favoriteLocations') || '[]'), location])
        );
        setIsFavorite(true);
    }

    const removeFromFavorites = () => {
        const updatedFavorites = JSON.parse(window.localStorage.getItem('favoriteLocations') || '[]').filter(loc => loc.name !== location.name);
        window.localStorage.setItem('favoriteLocations', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
    }

    return(
        <Card
            className="min-w-[30%] flex-1 rounded-lg text-white text-left"
            style={{ backgroundColor: getBackgroundColor(location.type) }}
            isPressable
            onPress={() => {
                mapRef.current.flyTo({
                    center: location.coordinates,
                    zoom: 8,
                    speed: 1.2,
                    curve: 1.42
                });
            }}
        >
            <CardHeader
                className={`${!isOnMap ? 'h-[200px]' : 'h-[130px]'} relative`}
                style={{backgroundImage: `url(${location.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
            >
                {isFavorite ? 
                    <MdFavorite className="absolute top-0 right-0 m-2 w-7 h-7 fill-red-500 hover:scale-110" onClick={removeFromFavorites} />
                : <MdFavoriteBorder className="absolute top-0 right-0 m-2 w-7 h-7 hover:scale-110" onClick={addToFavorites} />}

            </CardHeader>
            <CardBody className="p-5">
                <h2 className="text-3xl font-title flex items-center">{location.name}</h2>
                <p className="mt-2 text-gray-300">{location.description}</p>
            </CardBody>

        </Card>
    )
}

export default CardLocation;