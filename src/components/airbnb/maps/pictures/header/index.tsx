// App imports
import { Symbols } from './symbols';
import './styles.scss';

// Third-party imports
import * as d3 from 'd3';

export const ImagesHeader = ({ propertyInfo, setActivePropertyInfo }: any) => {
	const siFormat = d3.format(",");

	const propertyStartDate = new Date(propertyInfo.start_date);
	const propertyFinalDate = propertyInfo.final_date ? new Date(propertyInfo.final_date) : new Date();

	let months = Math.floor((propertyFinalDate.getTime() - propertyStartDate.getTime()) / (1000 * 60 * 60 * 24) / 30);

	const onClick = () => {
		setActivePropertyInfo(false);
	}
	
	return (
		<div className="pictures-header">
			<Symbols item={propertyInfo}/>
			<div>
				{months > 0 &&
					<div style={{color: "rgba(126, 126, 132, 1)"}}>
						duration of stay {months} {months > 1 ? "months": "month"}
					</div>
				}
			</div>
			<div></div>
			<div>R$ {siFormat(Math.round(propertyInfo.price))}</div>
			<img
				className="ads-cancel-search-cross"
				src="static/logos/cancel_search.svg" 
				alt="search-icon"
				onClick={onClick}
			/>
		</div>
	)
}

ImagesHeader.displayName="ImagesHeader";