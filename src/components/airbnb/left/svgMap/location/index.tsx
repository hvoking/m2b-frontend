// App imports
import './styles.scss';

export const Location = ({ currentAddress }: any) => {
	return (
		<div className="airbnb-location-wrapper">
			<img 
				className="location-pin" 
				src="static/components/maps/marker.svg" 
				alt="pin-location"
		     />
			<div>{currentAddress}</div>
			<div></div>
		</div>
	)
}
Location.displayName="Location"