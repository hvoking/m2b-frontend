// App imports
import { Rooms } from './rooms';
import { Search } from './search';
import { Location } from './location';
import './styles.scss';

// Context imports
import { useIsoPolygonApi } from '../context/api/isoPolygon';
import { UserMessage } from './message';

export const Left = () => {
	const { initialMarker } = useIsoPolygonApi();

	return (
		<div className="left">
			<div className="user-message-wrapper">
				<Search/>
				<Location/>
				{!initialMarker ? 
					<div className="sidebar-items">
						<Rooms/>
					</div> : 
					<UserMessage/>
				}
			</div>
		</div>
	)
}

Left.displayName="Left";