// App imports
import './styles.scss';

export const CTA = ({ printDocument, meanPrice }: any) => {
	return (
		<div className="pdf-cta">
			<div>Valor de avaliação sugerido R$ {meanPrice}</div>
			<div className="pdf-button" onClick={printDocument}>Gerar relatório</div>
		</div>
	)
}

CTA.displayName="CTA";