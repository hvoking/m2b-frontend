// App imports
import './styles.scss';

export const PdfObs = () => {
	return (
		<div className="pdf-obs-wrapper">
			<div style={{fontSize: "1.2em", fontWeight: "600", paddingLeft: "20px"}}>Observações</div>
			<div className="pdf-obs-input-wrapper">
				<div contentEditable="true" className="pdf-obs"/>
			</div>
			<div className="pdf-obs-info">
				<div className="pdf-footer-input-wrapper">
					<div>Nome:</div>
					<textarea className="pdf-footer-input"/>
				</div>
				<div className="pdf-footer-input-wrapper">
					<div>Creci:</div>
					<textarea className="pdf-footer-input"/>
				</div>
				<div className="pdf-footer-input-wrapper" style={{paddingTop: "2px"}}>
					<div style={{alignSelf: "baseline", paddingTop: "5px"}}>Endereço:</div>
					<div className="pdf-address-input" contentEditable="true"/>
				</div>
				<div className="pdf-footer-input-wrapper">
					<div>Data:</div>
					<textarea className="pdf-footer-input"/>
				</div>
				<div className="pdf-footer-input-wrapper">
					<div>Email:</div>
					<textarea className="pdf-footer-input"/>
				</div>
			</div>
		</div>
	)
}

PdfObs.displayName="PdfObs";