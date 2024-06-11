// App imports
import './styles.scss';

export const Symbols = ({ item }: any) => {
	const imagePath = "static/components/prices/header/";

	return (
		<div className="pdf-pictures-symbols">
			{item.status === 1 && 
				<img 
					src={imagePath + "statusPdfActive.svg"} 
					alt="status-active"
					style={{height: "12px"}}
				/>
			}
			{item.new === 1 && 
				<img 
					src={imagePath + "newPdfActive.svg"} 
					alt="new-active"
					style={{height: "12px"}}
				/>
			}
			{item.pool === 1 && 
				<img 
					src={imagePath + "poolPdfActive.svg"} 
					alt="pool-active"
					style={{height: "12px"}}
				/>
			}
			{item.furnished === 1 && 
				<img 
					src={imagePath + "furniturePdfActive.svg"} 
					alt="furnished-active"
					style={{height: "12px"}}
				/>
			}
		</div>
	)
}

Symbols.displayName="Symbols";