// App imports
import './styles.scss';

// Context imports
import { usePdf } from '../../../context/filters/pdf';
 
export const SaveFile = ({ inputRef }: any) => {
	const { printDocument, activePdf, setActivePdf } = usePdf();

	return (
		<>
		{!activePdf ? 
			<div className="pdf-letters" onClick={ setActivePdf }>
				PDF
			</div> : 
			<svg 
				className="printer-logo"
				width="24"
				height="24"
				onClick={printDocument}
			>
				<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
			</svg>}
		</>
	)
}

SaveFile.displayName="SaveFile"