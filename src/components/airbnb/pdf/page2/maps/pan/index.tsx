// App imports
import './styles.scss';

export const PanSelector = ({ setActivePan }: any) => {
	return (
		<div className="pdf-basemaps-parent-wrapper">
			<img 
				className="pdf-basemaps-image"
				src="static/components/pdf/maps/panIcon.png"
				alt="dark"
				onClick={() => setActivePan((prev: boolean) => !prev)}
			/>
		</div>
	)
}

PanSelector.displayName="PanSelector";