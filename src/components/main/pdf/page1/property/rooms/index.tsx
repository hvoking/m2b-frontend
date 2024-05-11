// App imports
import { useEquipment } from '../../../../context/filters/equipment';

export const Rooms = () => {
	const { rooms, suites, garages } = useEquipment();

	return (
		<div className="property-parameter">
			<div className="property-dsv">
				<div>dórmitorios</div>
				<div>{rooms}</div>
			</div>
			<div 
				className="property-dsv" 
				style={{
					borderRight: "1px solid rgba(0, 0, 0, 1)",
					borderLeft: "1px solid rgba(0, 0, 0, 1)",
					paddingLeft: "10px",
					paddingRight: "10px",
					height: "100%",
				}}
			>
				<div style={{alignSelf: "center"}}>suítes</div>
				<div style={{alignSelf: "center"}}>{suites ? suites : "-"}</div>
			</div>
			<div className="property-dsv">
				<div style={{paddingLeft: "10px"}}>vagas</div>
				<div>{garages ? garages : "-"}</div>
			</div>
		</div>
	)
}

Rooms.displayName="Rooms";