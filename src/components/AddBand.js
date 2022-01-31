import { useState, useContext } from 'react'
import { SocketContext } from '../context/SocketContext';

const AddBand = () => {
  const {socket} = useContext(SocketContext)

  const [name, setName] = useState("")

  const addBand = (name) => {
    socket.emit("add-band", { name })
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    addBand(name);
    setName("");
  }
  
  return (
    <>
      <h3>Add a band</h3>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="Band name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </>
  )
}

export default AddBand
