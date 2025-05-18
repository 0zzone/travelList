import {Card, CardBody, CardHeader} from "@heroui/react";

const CardLocation = ({ location, mapRef, getBackgroundColor }) => {
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
                className="h-[200px] relative"
                style={{backgroundImage: `url(${location.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
            >
            </CardHeader>
            <CardBody className="p-5">
                <h2 className="text-3xl font-title flex items-center">{location.name}</h2>
                <p className="mt-2 text-gray-300">{location.description}</p>
            </CardBody>

        </Card>
    )
}

export default CardLocation;