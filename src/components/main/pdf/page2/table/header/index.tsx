// React imports
import { useState } from 'react';

// App imports
import { Arrow } from './arrow';

export const Header = ({ setSortKey, setCurrentDirection }: any) => {
	return (
		<thead> 
			<tr>
				<th>#</th>
				<th>Fotos</th>
				<th>
					<div style={{position: "relative"}}>
						<div>Distância</div>
						<Arrow 
							fill={"rgba(0, 0, 0, 0.4)"} 
							item="distance" 
							setSortKey={setSortKey} 
							setCurrentDirection={setCurrentDirection}
						/>
					</div>
				</th>
				<th>
					<div style={{position: "relative"}}>
						<div>Área</div>
						<Arrow 
							fill={"rgba(0, 0, 0, 0.4)"} 
							item="processed_area" 
							setSortKey={setSortKey} 
							setCurrentDirection={setCurrentDirection}
						/>
					</div>
				</th>
				<th>
					<div style={{position: "relative"}}>
						<div>Valor</div>
						<Arrow 
							fill={"rgba(0, 0, 0, 0.4)"} 
							item="price" 
							setSortKey={setSortKey} 
							setCurrentDirection={setCurrentDirection}
						/>
					</div>
				</th>
				<th>
					<div style={{position: "relative"}}>
						<div>Valor m²</div>
						<Arrow 
							fill={"rgba(0, 0, 0, 0.4)"} 
							item="unit_price" 
							setSortKey={setSortKey} 
							setCurrentDirection={setCurrentDirection}
						/>
					</div>
				</th>
			</tr>
		</thead> 
	)
}

Header.displayName="Header";