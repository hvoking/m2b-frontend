import { useState, useEffect } from 'react';

export const Arrow = ({ fill, item, setSortKey, setCurrentDirection }: any) => {
	const [ up, setUp ] = useState(false);

	const y1 = up ? "6" : "12";
	const y2 = up ? "12" : "6";

	const x = 5;

	useEffect(() => {
		up ? setCurrentDirection("up") : setCurrentDirection("down");
		setSortKey(item);
	}, [up])

	return (
		<div 
			onClick={() => setUp((prev: boolean) => !prev)}
			style={{
				width: "10px", 
				position: "absolute", 
				right: "0px", 
				top: "0px",
			}}
		>
			<svg viewBox="0 0 14 20">
				<line 
					x1="0" 
					y1={y1} 
					x2={x} 
					y2={y2} 
					stroke={fill}
					strokeWidth="2px"
				/>
  				<line 
  					x1={x} 
  					y1={y2} 
  					x2={2*x} 
  					y2={y1} 
  					stroke={fill}
					strokeWidth="2px"
  				/>
			</svg>
		</div>
	)
}

Arrow.displayName="Arrow";