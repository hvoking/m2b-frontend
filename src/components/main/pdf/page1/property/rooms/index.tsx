// App imports
import { useEquipment } from '../../../../context/filters/equipment';
import './styles.scss';

export const Rooms = () => {
	const { rooms, suites, garages } = useEquipment();

	return (
		<div className="property-parameter">
			<div className="input-group" style={{justifyContent: "space-between"}}>
				<div>Quartos</div>
				<div style={{paddingRight: "20px"}}>
					<input className="input-group" type="number" min="0" value={rooms}/>
				</div>
			</div>
			<div 
				className="input-group" 
				style={{
					borderRight: "1px solid rgba(0, 0, 0, 1)",
					borderLeft: "1px solid rgba(0, 0, 0, 1)",
					height: "100%"
				}}>
				<div style={{paddingLeft: "10px"}}>Suítes</div>
				<input className="input-group" type="number" min="0" value={suites}/>
			</div>
			<div className="input-group">
				<div style={{paddingLeft: "10px"}}>Garagens</div>
				<input className="input-group" type="number" min="0" value={garages}/>
			</div>
		</div>
	)
}

Rooms.displayName="Rooms";