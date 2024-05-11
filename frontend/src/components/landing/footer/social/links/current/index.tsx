// App imports
import './styles.scss';

export const CurrentLink = ({ mediaLink, mediaImage }: any) => {
	return (
		<a 
			className="footer-social-media-link"
			href={mediaLink} 
			style={{display: "table-cell"}}
			target="_blank"
			rel="noopener noreferrer"
		>
			<img 
				src={mediaImage}
				className="footer-landing-image" 
				alt="whatsapp-logo"
			/>
		</a>
	)
}

CurrentLink.displayName="CurrentLink";