const { default: appConfig } = require("@/appConfig");
const { WMSTileLayer } = require("react-leaflet")

const WMSLayer = () =>{
    const geoserver = appConfig.geoserver
    return(
        <>
        {geoserver.layers.map((obj, i) => {
            return (
              <WMSTileLayer
                key={i}
                url={geoserver.baseURL}
                version="1.1.0"
                layers={"revetment:" + obj.name}
                transparent="true"
                format="image/png"
                zIndex={99}
              />
            );
          })}
          </>
    )
}

export default WMSLayer;