// App imports
import './styles.scss';

// Context imports
import { useEquipment } from '../../../../context/filters/equipment';

const roomsColors: any = {
	1: 'rgba(109, 86, 166, 1)',
	2: 'rgba(84, 181, 103, 1)',
	3: 'rgba(65, 145, 198, 1)',
	4: 'rgba(254, 162, 90, 1)',
	5: 'rgba(254, 0, 23, 1)',
}

export const Legend = ({ roomsData, dsvData }: any) => {
	const { rooms, setRooms, setSuites, setGarages } = useEquipment();

	const onClick = (item: any) => {
		item && setRooms(item);
		const obj = dsvData[`d${item}`].counts;
		const maxRooms = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b).split(',');

		setRooms(parseInt(maxRooms[0]))
		setSuites(null)
		setGarages(null)
	}

	const sortedRooms = Object.keys(roomsData);
		
	return (
		<div className="rooms-legend-wrapper" style={{display: "flex", justifyContent: "space-around", paddingLeft: "20px", paddingRight: "20px"}}>
			{
				sortedRooms.map((item: any, index: number) => {
					const currentPercent = roomsData[item] ? roomsData[item] : 0
					return (
						<div key={index} style={{display: "flex"}}>
						{currentPercent > 1 && 
							<div className="pdf-rooms-legend-item-wrapper" onClick={() => onClick(item)}>
								<div
									className="rooms-legend-text"
									style={{
										color: 
											String(rooms) === item || rooms === null ? 
											"rgba(0, 0, 0, 1)" : 
											"rgba(126, 126, 132, 1)",
									}}
								>
									{Math.round(currentPercent)}%
								</div>
								<div
									className="rooms-legend-item"
									style={{
										backgroundColor: 
											roomsData && String(rooms) === item ?
											roomsColors[item] :
											rooms === null ?
											String(roomsColors[item]) :
											String(roomsColors[item]).replace('1)', '0.4)')
									}}
								>
								</div>
								<div
									className="rooms-legend-text"
									style={{
										color: 
											String(rooms) === item || rooms === null ? 
											"rgba(0, 0, 0, 1)" : 
											"rgba(126, 126, 132, 1)",
									}}
								>
									{item} dorm
								</div>
							</div>
						}
					</div>
				)
			})}
		</div>
	)
}

Legend.displayName="Legend";