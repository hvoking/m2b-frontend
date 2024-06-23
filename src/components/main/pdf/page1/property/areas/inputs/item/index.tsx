// App imports
import './styles.scss';

export const AreaItem = ({ title, value, onChange }: any) => {
	

	return (
		<div className="areas-title-item">
			<div>{title}</div>
			<input className="pdf-areas-input" type="text" value={value} onChange={onChange}/>
		</div>
	)
}

AreaItem.displayName="AreaItem";