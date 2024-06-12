// Context imports
import { useEquipment } from '../../../context/filters/equipment';

const roomsColors: any = {
	0: 'rgba(255, 255, 255, 0.4)',
	1: 'rgba(109, 86, 166, 1)',
	2: 'rgba(84, 181, 103, 1)',
	3: 'rgba(65, 145, 198, 1)',
	4: 'rgba(254, 162, 90, 1)',
	5: 'rgba(254, 0, 23, 1)',
}

export const RoomsLegend = ({ roomsData }: any) => {
	const { rooms, setRooms } = useEquipment();

	const onClick = (item: any) => {
		item && setRooms(item);
	}

	const sortedRooms = Object.keys(roomsData).sort((a, b) => roomsData[b] - roomsData[a]);
		
	return (
		<div className="rooms-legend-wrapper">
			{
				sortedRooms.map((item: any, index: number) => {
					const currentPercent = roomsData[item] ? roomsData[item] : 0

					return (
						<div key={index}>
						{currentPercent > 1 && 
							<div className="rooms-legend-item-wrapper">
								<div
									className="rooms-legend-text"
									style={{
										color: 
											String(rooms) === item || rooms === null? 
											"rgba(255, 255, 255, 1)" : 
											"rgba(126, 126, 132, 1)",
									}}
									onClick={() => onClick(item)}
								>
									{item} dorm
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
									onClick={() => onClick(item)}
								>
								</div>
								<div
									className="rooms-legend-text"
									style={{
										color: 
											String(rooms) === item || rooms === null? 
											"rgba(255, 255, 255, 1)" : 
											"rgba(126, 126, 132, 1)",
									}}
									onClick={() => onClick(item)}
								>
									{Math.round(currentPercent)}%
								</div>
							</div>
						}
					</div>
				)
			})}
		</div>
	)
}

RoomsLegend.displayName="RoomsLegend";