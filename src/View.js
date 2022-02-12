import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({data,deleteData}) => {

    
    return data.map(newdata=>(
         <div >
              <table >
                <thead>
                  <tr>
                    
                    <th>firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                     <tr key={newdata.firstname}>
            <td>{newdata.firstname}</td>
            <td>{newdata.lastname}</td>
            <td>{newdata.age}</td>
            <td  onClick={()=>deleteData(newdata.firstname)}>
                <Icon icon={trash}/>
            </td>           
        </tr> 
                  
                </tbody>
              </table>
            </div>
        
       
                   
    
))
}