// App imports
import './styles.scss';

// Context imports
import { useReverseGeocodingApi } from '../../../context/api/google/reverse';

export const Address = () => {
	const { currentAddress } = useReverseGeocodingApi();

	return (
		<div className="address-wrapper">
			<div>
				<div style={{display: "flex", gap: "5px"}}>
					<img 
						src="static/components/maps/marker.svg" 
						alt="marker" 
						width="10px"
					/>
					<div>Endereço</div>
				</div>
			</div>
			<div>{currentAddress && currentAddress.replace(", Brasil", "")}</div>
		</div>
	)
}

Address.displayName="Address";