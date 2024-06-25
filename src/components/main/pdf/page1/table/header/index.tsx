// React imports
import { useState } from 'react';

// App imports
import { Arrow } from './arrow';

export const Header = ({ orderBy, setOrderBy }: any) => {
	return (
		<thead> 
			<tr>
				<th>#</th>
				<th>Fotos</th>
				<th onClick={() => {setOrderBy("area")}}>
					<div style={{position: "relative"}}>
						<div>Área</div>
						<Arrow fill={orderBy === "area" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.4)"}/>
					</div>
				</th>
				<th onClick={() => {setOrderBy("price")}}>
					<div style={{position: "relative"}}>
						<div>Valor</div>
						<Arrow fill={orderBy === "price" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.4)"}/>
					</div>
				</th>
				<th onClick={() => {setOrderBy("unit_price")}}>
					<div style={{position: "relative"}}>
						<div>Valor m²</div>
						<Arrow fill={orderBy === "unit_price" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.4)"}/>
					</div>
				</th>
			</tr>
		</thead> 
	)
}

Header.displayName="Header";