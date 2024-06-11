// App imports
import './styles.scss';

// Context imports
import { useReverseGeocodingApi } from '../../../context/api/google/reverse';

export const Address = () => {
	const { currentAddress } = useReverseGeocodingApi();

	return (
		<div className="address-wrapper">
			<div>Address: {currentAddress}</div>
		</div>
	)
}

Address.displayName="Address";