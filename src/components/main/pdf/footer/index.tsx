// App imports
import './styles.scss';

export const Footer = () => {
	return (
		<div className="pdf-footer">
			<div className="m2b-letters">m²b</div>
			<div></div>
			<div className="data-provider-logo">
				<div>Provedor de dados: </div>
				<a 
					href="https://www.imoveis-sc.com.br/"
					style={{display: "table-cell"}}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						className="imoveis-sc-logo"
						src='static/components/pdf/isc_logo.svg'
						alt="imoveis-sc-logo"
					/>
				</a>
			</div>
		</div>
	)
}

Footer.displayName="Footer";