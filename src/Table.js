import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('data');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const Table = () => {

  // main array of objects state || books state || books array of objects
  const [data, setData]=useState(getDatafromLS());

  // input field states
  const [firstname, setFirstName]=useState('');
  const [lastname, setLastName]=useState('');
  const [age, setAge]=useState('');

  // form submit event
  const handleAddDataSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let newdata={
      firstname,
      lastname,
      age
    }
    setData([...data,newdata]);
    setFirstName('');
    setLastName('');
    setAge('');
  }

  // delete book from LS
  const deleteData=(isbn)=>{
    const filteredData=data.filter((element,index)=>{
      return element.isbn !== isbn
    })
    setData(filteredData);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(data));
  },[data])

  return (
    <div className='wrapper'>
      <h1>Customer Details</h1>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddDataSubmit}>
            <label>Firstname</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setFirstName(e.target.value)} value={firstname}></input>
            <br></br>
            <label>Lastname</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setLastName(e.target.value)} value={lastname}></input>
            <br></br>
            <label>Age</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setAge(e.target.value)} value={age}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
          {data.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ISBN#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View data={data} deleteBook={deleteData}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setData([])}>Remove All</button>
          </>}
          {data.length < 1 && <div>No data are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default Table