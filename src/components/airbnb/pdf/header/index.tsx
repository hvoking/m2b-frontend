// App imports
import './styles.scss';

// Context imports
import { useDates } from '../../context/filters/dates';

export const PdfHeader = () => {
	const { startDate, finalDate } = useDates();
	const convertToDate = (str: any) =>	{
			const dateArr = str.split("-");
			return new Date(dateArr[2], dateArr[1], dateArr[0])
		}

	const date1 = convertToDate(startDate);
	const date2 = convertToDate(finalDate);

	let months = Math.floor((date2.getTime() - date1.getTime())/ (1000*60*60*24) / 30);

	return (
		<div className="pdf-header-wrapper">
			<div className="pdf-header-title">Inside Airbnb Metrics</div>
			<div className="property-data-subtitle">
				Market study based on registered properties.
			</div>
		</div>
	)
}

PdfHeader.displayName="PdfHeader";