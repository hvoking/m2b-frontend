// App imports
import './styles.scss';

export const AreaItem = ({ title, value, onChange }: any) => {
	return (
		<div className="areas-title-item">
			<div>{title}</div>
			<div className="pdf-areas-input">{value}</div>
		</div>
	)
}

AreaItem.displayName="AreaItem";