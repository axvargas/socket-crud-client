import { useEffect, useState } from 'react'

const BandList = (props) => {
  const { 
    data,
    vote,
    deleteBand,
    changeBandName
  } = props


  const [bands, setBands] = useState([])
  
  useEffect(() => {
    setBands(data)
  }, [data])

  const handleChangeBandName = (event, id) => {
    const name = event.target.value
    const newBands = bands.map(band => band.id === id ? { ...band, name } : band)
    setBands(newBands)
  }

  const onBlurBandName = (event, id) => {
    const name = event.target.value
    // emit event to server to change name
    changeBandName(id, name)
  }

  const createRows = () => {
    return (
      bands.map((band) => (
        <tr key={band.id} >
          <td>
            <button 
              className='btn btn-secondary btn-sm'
              disabled={!band.votes}
              onClick={() => vote(band.id, -1)}
            >
              - 1
            </button>
          </td>
          <td>
            <input 
              id="band-name"
              type="text" 
              className='form-control form-control-sm' 
              value={band.name}
              onChange={(e) => handleChangeBandName(e, band.id)}
              onBlur={(e) => onBlurBandName(e, band.id)}
            />
          </td>
          <td>
            <button 
              className='btn btn-primary btn-sm'
              onClick={() => vote(band.id, 1)}
            >
              + 1
            </button>
          </td>
          <td>{band.votes}</td>
          <td>
            <button 
              className='btn btn-danger btn-sm'
              onClick={() => deleteBand(band.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    ))
  }

    return (
      <>
        <h3>Band List</h3>
        <table className='table table-stripped'>
          <thead>
            <tr>
              <th>-1 vote</th>
              <th>Name</th>
              <th>+1 vote</th>
              <th>Votes</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              (bands.length > 0) &&
                createRows()
            }
          </tbody>
        </table>
      </>
    )
  }

  export default BandList
