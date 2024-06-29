// App imports
import './styles.scss';

export const Header = ({ onClick, rooms}: any) => {
	return (
			<div style={{paddingLeft: "20px", paddingTop: "10px"}}>
				Anúncios por Número de Dormitórios
			</div>
	)
}

Header.displayName="Header";