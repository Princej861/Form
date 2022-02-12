import React,{useState, useEffect} from 'react'
import { View } from './View';

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

 const App = () => {

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
  const deleteData=(firstname)=>{
    const filteredData=data.filter((element,index)=>{
      return element.firstname !== firstname
    })
    setData(filteredData);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(data));
  },[data])

  return (
    <div >
      <h1>Customer Details</h1>
      <div >

        <div >
          <form autoComplete="off"  onSubmit={handleAddDataSubmit}>
            <label>Firstname</label>
            <input type="text"  required onChange={(e)=>setFirstName(e.target.value)} value={firstname}></input>
            <br></br>
            <label>Lastname</label>
            <input type="text"  required onChange={(e)=>setLastName(e.target.value)} value={lastname}></input>
            <br></br>
            <label>Age</label>
            <input type="text"  required onChange={(e)=>setAge(e.target.value)} value={age}></input>
            <br></br>
            <button type="submit" > ADD </button>
          </form>
        </div>

        <div >
          {data.length>0&&<>
           <View data={data} deleteBook={deleteData}/>
            <button  onClick={()=>setData([])}>Remove All</button>
             </>}
          {data.length < 1 && <div>Please Enter some Data</div>}
        </div>

      </div>
    </div>
  )
}

export default App