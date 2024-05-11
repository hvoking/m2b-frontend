// App imports
import './styles.scss';

// Context imports
import { useReverseGeocodingApi } from '../../context/api/google/reverse';

export const Location = () => {
	const { currentAddress } = useReverseGeocodingApi();

	if (!currentAddress) return <div className="location-wrapper">
		* Exclusivamente para municipios de SC, Brasil
	</div>

	const addressInfo = currentAddress.replace(" - SC", "").split(",").slice(0, -2);

	return (
		<div className="location-wrapper">
				<img 
					style={{width: "12px", height: "17px"}} 
					src="static/components/maps/marker.svg" 
					alt="pin-location"
			     />
				<div>{addressInfo.join(",")}</div>
		</div>
	)
}

Location.displayName="Location";