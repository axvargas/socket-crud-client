import { useState } from 'react'

const AddBand = (props) => {
  const {
    addBand
  } = props;

  const [name, setName] = useState("");

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
