// App imports
import './styles.scss';

export const Header = () => {
	const currentDate = new Date().toLocaleDateString('pt-BR');

	return (
		<div className="pdf-header-wrapper">
			<div>{currentDate}</div>
			<strong className="pdf-header-title">Relatório de Avaliação do Imóvel</strong>
		</div>
	)
}

Header.displayName="Header";