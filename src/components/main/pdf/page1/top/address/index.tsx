// App imports
import './styles.scss';

// Context imports
import { useReverseGeocodingApi } from '../../../../context/api/google/reverse';

export const Address = () => {
	const { currentAddress } = useReverseGeocodingApi();
	if (!currentAddress) return <></>
		
	const addressNumber = currentAddress[0].long_name;
	const addressStreet = currentAddress[1].long_name;
	const addressName = addressStreet + ", " + addressNumber;

	return (
		<div className="address-wrapper">
			<div>
				<div style={{display: "flex", gap: "5px"}}>
					<img 
						src="static/components/maps/marker.svg" 
						alt="marker" 
						width="10px"
					/>
					<strong>Endereço:</strong>
				</div>
			</div>
			<div>{addressName}</div>
		</div>
	)
}

Address.displayName="Address";