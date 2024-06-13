// App imports
import { Selectors } from './selectors';

export const Header = () => {
  return (
    <div className="sidebar-header">
      <div className="sidebar-sub-title">
        Timeseries
      </div>
      <div></div>
      <Selectors/>
    </div>
  )
}