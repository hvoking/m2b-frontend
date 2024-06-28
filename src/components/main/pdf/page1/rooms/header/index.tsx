// App imports
import './styles.scss';

export const Header = ({ onClick, rooms}: any) => {
	return (
			<div style={{paddingLeft: "20px", paddingTop: "10px"}}>
				Anúncios por Número de Quartos
			</div>
	)
}

Header.displayName="Header";