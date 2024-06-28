// App imports
import { useEquipment } from '../../../../context/filters/equipment';
import './styles.scss';

export const Rooms = () => {
	const { rooms, setRooms, suites, setSuites, garages, setGarages } = useEquipment();

	return (
		<div className="property-parameter">
			<div className="input-group" style={{justifyContent: "space-between"}}>
				<div>Dormitórios</div>
				<div style={{paddingRight: "20px"}}>
					<input 
						className="input-group" 
						type="number" 
						min="0" 
						max="4" 
						value={rooms ? rooms : ""} 
						onChange={(e: any)=> e.target.value > 0 ? setRooms(e.target.value) : setRooms(null)}
					/>
				</div>
			</div>
			<div 
				className="input-group" 
				style={{
					borderRight: "1px solid rgba(0, 0, 0, 0.4)",
					borderLeft: "1px solid rgba(0, 0, 0, 0.4)",
					height: "100%"
				}}>
				<div style={{paddingLeft: "10px"}}>Suítes</div>
				<input 
					className="input-group" 
					type="number" 
					min="-1" 
					max="4" 
					value={suites ? suites : ''}
					onChange={(e: any)=> e.target.value > -1 ? setSuites(e.target.value) : setSuites(null)}
				/>
			</div>
			<div className="input-group">
				<div style={{paddingLeft: "10px"}}>Vagas</div>
				<input 
					className="input-group" 
					type="number" 
					min="-1" 
					max="4" 
					value={garages ? garages : ''}
					onChange={(e: any)=> e.target.value > -1 ? setGarages(e.target.value) : setGarages(null)}

				/>
			</div>
		</div>
	)
}

Rooms.displayName="Rooms";