// App imports
import './styles.scss';

export const Clients = () => {
	return (
		<div className="clients-wrapper">
			<div className="clients-item">
				<img 
					className="clients-image"
					src="static/landing/clients/portal.png" 
					alt="portal-imoveis-logo"
				/>
			</div>
			<div className="clients-item">
				<img 
					className="clients-image"
					src="static/landing/clients/zelt.png" 
					alt="zelt-logo"
				/>
			</div>
			<div className="clients-item">
				<img 
					className="clients-image"
					src="static/landing/clients/jacinto.png" 
					alt="jacinto-imoveis-logo"
				/>
			</div>
			<div className="clients-item">
				<img 
					className="clients-image"
					src="static/landing/clients/estacao.png"
					alt="estacao-logo"
				/>
			</div>
			<div className="clients-item">
				<img 
					className="clients-image"
					src="static/landing/clients/abvale.png"
					alt="abvale-logo"
				/>
			</div>
			<div className="clients-item">
				<img 
					className="clients-image"
					src="static/landing/clients/alianca.png"
					alt="alianca-logo"
				/>
			</div>
			<div className="clients-item">
				<img 
					className="clients-image"
					src="static/landing/clients/orbi.png"
					alt="orbi-logo"
				/>
			</div>
			<div className="clients-item">
				<img 
					className="clients-image"
					src="static/landing/clients/kv.png"
					alt="kv-imoveis-logo"
				/>
			</div>
			<div className="clients-item">
				<img 
					className="clients-image"
					src="static/landing/clients/castelo.png"
					alt="castelo-logo"
				/>
			</div>
			<div className="clients-item">
				<img 
					style={{transform: "translate(-20%, 0)"}}
					className="clients-image"
					src="static/landing/clients/piacentini.png" 
					alt="piacentini-logo"
				/>
			</div>
		</div>
	)
}

Clients.displayName="Clients";