import { useState } from 'react'

import './App.css'

function App() {
  
  const [isModalOpen, setisModalOpen] = useState(false);
  const AddPopup = ()=>{
    setisModalOpen(true);
  }
  const ClosePopup = ()=>{
    setisModalOpen(false);
  }
  return (
    <>
     <div className="MainBox">
      <h3>
        Simple Student Managment System
      </h3>
      <div className='SearchBox'>
          
          <input className = "search-input" type="search" name="searchinput" placeholder="Student ID" />
          <button className='addBtn' onClick={AddPopup}> Add</button>
          
      </div>
      <div className='DisplayBox'>
        {isModalOpen && (
  <div className="AddModalOverlay">
    <div className="AddModalPopup">
      <div className="AddModalPopupContent">Student Information</div>
      <div className="AddModalPopupContent">
        <input className="search-input" type="text" name="InputName" placeholder="Name" />
      </div>
      <div className="AddModalPopupContent">
        <input className="search-input" type="text" name="InputMajor" placeholder="Major" />
      </div>
      <div className="AddModalPopupContent">
        <input className="search-input" type="text" name="InputEmail" placeholder="Email" />
      </div>
      <div>
        <button className="Addbtn">Add</button>
        <button className="closebtn" onClick={ClosePopup}>Close</button>
      </div>
    </div>
  </div>
)}


        <table className='studentTable'>
          <tr>
            <th>studentID</th>
          <th>Name</th>
          <th>Major</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
          </tr>
          <tbody>
            <tr>
              <td>16</td>
              <td>Steve</td>
              <td>P.E.</td>
              <td>steve.pe@schoolsEmail.com</td>
              <td><button className='editBtn'> Edit</button></td>
              <td><button className='delBtn'> Del</button></td>

            </tr>
            <tr>
              <td>17</td>
              <td>Yanis</td>
              <td>Biology</td>
              <td>Yanise.bio@schoolsEmail.com</td>
              <td><button className='editBtn'> Edit</button></td>
              <td><button className='delBtn'> Del</button></td>

            </tr>
          </tbody>
        </table>
      </div>

     </div>
    </>
  )
}

export default App
