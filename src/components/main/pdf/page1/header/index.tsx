// App imports
import './styles.scss';

// Context imports
import { useDates } from '../../../context/filters/dates';

export const Header = () => {
	const { startDate, finalDate } = useDates();
	const convertToDate = (str: any) =>	{
			const dateArr = str.split("-");
			return new Date(dateArr[2], dateArr[1], dateArr[0])
		}

	const date1 = convertToDate(startDate);
	const date2 = convertToDate(finalDate);

	let months = Math.floor((date2.getTime() - date1.getTime())/ (1000*60*60*24) / 30);

	const currentDate = new Date().toLocaleDateString('pt-BR');

	return (
		<div className="pdf-header-wrapper">
			<div>{currentDate}</div>
			<div className="header-items-wrapper">
				<img 
					src="static/logos/logoGenerativa.svg" 
					alt="white-label-logo"
					width="50px"
				/>
				<div>
					<strong style={{fontSize: "1.2em", letterSpacing: "1px"}}>Generativa</strong>
					<div>Rua Sete de Setembro</div>
					<div>gus@ugeom.com</div>
				</div>
				<div style={{textAlign: "end"}}>
					<strong style={{fontSize: "1.2em", letterSpacing: "1px"}}>Gustavo González</strong>
					<div>(+595) 986 514-207</div>
					<div>gus@ugeom.com</div>
				</div>
			</div>
			{/*<div className="pdf-header-title">Avaliação Mercadológica</div>
			<div className="property-data-subtitle">
				<div>Estudo de mercado com base em imóveis cadastrados</div>
				<div>num período de</div> 
				{months}
				<div>meses.</div>
			</div>*/}
		</div>
	)
}

Header.displayName="Header";