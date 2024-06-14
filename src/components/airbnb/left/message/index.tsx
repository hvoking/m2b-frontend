// App imports
import './styles.scss';

export const UserMessage = () => {
	return (
		<div className="sidebar-item-wrapper">
			<div className="sidebar-sub-title">
				Drag the marker or search for a place
			</div>
			<img 
				className="m2b-starting-gif" 
				src="static/components/sidebar/marker_move.gif" 
				alt="marker_move"
			/>
		</div>
	)
}

UserMessage.displayName="UserMessage";