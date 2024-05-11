// App imports
import './styles.scss';

// Context imports
import { useReverseGeocodingApi } from '../../../../context/api/google/reverse';

export const Address = () => {
	const { currentAddress } = useReverseGeocodingApi();

	return (
		<div className="address-wrapper">
			<div>Endereço</div>
			<div>{currentAddress && currentAddress.replace(", Brasil", "")}</div>
		</div>
	)
}

Address.displayName="Address";