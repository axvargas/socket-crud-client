import { useContext } from 'react';

import BandList from "../components/BandList";
import AddBand from "../components/AddBand";
import { SocketContext } from '../context/SocketContext';
import BarChart from '../components/BarChart';
function HomePage() {

  const { online } =  useContext(SocketContext); 

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {
            online ?
              <span className="text-success">
                <strong> Online</strong>
              </span> :
              <span className="text-danger">
                <strong> Offline</strong>
              </span>
          }
        </p>
      </div>
      <h1>Band names</h1>
      <hr />
      <div className='row'>
        <div className="col">
          <BarChart />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <AddBand />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
