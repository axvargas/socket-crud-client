import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import BandList from "./components/BandList";
import AddBand from "./components/AddBand";

const connectSocketServer = () => {
  const socket = io("http://localhost:8080", {
    transports: ["websocket"]
  })
  return socket;
}

function App() {
  const [socket, setSocket] = useState(null)
  const [online, setOnline] = useState(false)
  const [data, setData] = useState([]);

  console.log("App rendered", socket);
  useEffect(() => {
    setSocket(connectSocketServer());
  }, [])

  useEffect(() => {
    console.log("useEffect of socket")
    if (socket) {
      console.log("on connect")
      socket.on("connect", () => {
        console.log("Connected to server")
        setOnline(true)
      })

    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      console.log("on disconnect")
      socket.on("disconnect", () => {
        console.log("Disconnected from server")
        setOnline(false)
      })
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      console.log("on on current bands")
      socket.on("current-bands", (data) => {
        console.log(data)
        setData(data)
      })
    }
  }, [socket]);

  const addBand = (name) => {
    socket.emit("add-band", { name })
  }

  const vote = (id, delta) => {
    socket.emit("vote", { id, delta })
  }

  const deleteBand = (id) => {
    socket.emit("delete-band", { id })
  }

  const changeBandName = (id, name) => {
    socket.emit("change-band-name", { id, name })
  }

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

      <div className="row">
        <div className="col-8">
          <BandList
            data={data}
            vote={vote}
            deleteBand={deleteBand}
            changeBandName={changeBandName}
          />
        </div>
        <div className="col-4">
          <AddBand
            addBand={addBand}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
