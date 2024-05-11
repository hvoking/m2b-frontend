// App imports
import './styles.scss';

export const ImagesFooter = ({propertyInfo, imagesLength}: any) => {
	const area = propertyInfo.processed_area;
	const rooms = propertyInfo.rooms;
	const suites = propertyInfo.suites;
	const garages = propertyInfo.garages;
	
	return (
		<div className="pictures-footer">
			<div className="pictures-footer-item">
				<img width="30px" height="20px" src="static/components/maps/pictures/bed.svg" alt="bed"/>
				<div>{rooms} dorm</div>
			</div>
			<div className="pictures-footer-item">
				<img width="30px" height="20px" src="static/components/maps/pictures/shower.svg" alt="shower"/>
				<div>{suites} {suites === 1 ? "suite" : "suites"}</div>
			</div>
			<div className="pictures-footer-item">
				<img width="30px" height="20px" src="static/components/maps/pictures/car.svg" alt="car"/>
				<div>{garages} {garages === 1 ? "vaga" : "vagas"}</div>
			</div>
			<div className="pictures-footer-item">
				<img width="30px" height="15px" src="static/components/maps/pictures/arrow.svg" alt="arrow"/>
				<div>{area} m² (útil)</div>
			</div>
		</div>
	)
}

ImagesFooter.displayName="ImagesFooter";