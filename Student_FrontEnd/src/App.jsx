import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  
  const [Students, setStudents] = useState([]);
  const [filterStudents, setfilterStudents] = useState([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [StudentData, setStudentData] = useState({name:"",major:"",email:""});
  const [ErrorMsg, setErrorMsg] = useState("");

  const AddPopup = ()=>{
    setisModalOpen(true);
  }
  const ClosePopup = ()=>{
    setisModalOpen(false);
    setStudentData({ name: "", major: "", email: "" });
    setErrorMsg("");
    console.log("dasufhgasdobou ousadhf osahdfgojk ouh");
  }
  const getAllStudents = () => {
    axios.get("http://localhost:3000/students").then((res) =>{
      setStudents(res.data)
      setfilterStudents(res.data);
    })
   
  }
  
  useEffect(()=>{getAllStudents()}, [])

  const ObtainStudents = (e) => {
    const SearchValue = e.target.value.toLowerCase();
    const filterterdData = Students.filter(student=>student.name.toLowerCase().includes(SearchValue) ||
                    student.major.toLowerCase().includes(SearchValue) ||
                    student.email.toLowerCase().includes(SearchValue));
    setfilterStudents(filterterdData);
  }

  const HandleStudentData = (e) => {
    setStudentData({...StudentData, [e.target.name]: e.target.value});
  }
  const HandleUpdate = (student) => {
    setStudentData(student);
    setisModalOpen(true);
  }
  const HandleDelete = (studentid) => {
    axios.delete(`http://localhost:3000/students/${studentid}`).then((res) =>{
      console.log(res.data);
      getAllStudents();
    })
  }

  const AddingStudents = async(e) => {
    // Stopping it from reloading until I am done
    e.preventDefault();

    if(!StudentData.name || !StudentData.major || !StudentData.email){
      setErrorMsg("All Values were not filled");
      return
    }

    if((ErrorMsg.length == 0)  && StudentData.studentid){
      await axios.patch(`http://localhost:3000/students/${StudentData.studentid}`, StudentData).then((res) =>{
      console.log(res.data);
      getAllStudents();
    })
    }
    else if ((ErrorMsg.length == 0)  && !StudentData.studentid){
    await axios.post("http://localhost:3000/students", StudentData).then((res) =>{
      console.log(res.data);
      getAllStudents();
    })
    }
    if(ErrorMsg.length == 0){
      ClosePopup();
    }


    
    
  }


  return (
    <>
     <div className="MainBox">
      <h3>
        Simple Student Managment System
      </h3>
      <div className='SearchBox'>
          
          <input className = "search-input" onChange={ObtainStudents} type="search" name="searchinput" placeholder="Search Student" />
          <button className='addBtn' onClick={AddPopup}> Add</button>
          
      </div>
      <div className='DisplayBox'>
        {isModalOpen && (
  <div className="AddModalOverlay">
    <div className="AddModalPopup">
      <div className="AddModalPopupContent">
        {ErrorMsg? "All Values not Filled":"Student Information"}
      </div>

      <div className="AddModalPopupContent">
        <input className="search-input" type="text" value={StudentData.name} onChange={HandleStudentData} name="name" id ="Name" placeholder="Name" />
      </div>
      <div className="AddModalPopupContent">
        <input className="search-input" type="text" value={StudentData.major} onChange={HandleStudentData} name="major" id ="Major" placeholder="Major" />
      </div>
      <div className="AddModalPopupContent">
        <input className="search-input" type="text" value={StudentData.email} onChange={HandleStudentData} name="email" id ="Email" placeholder="Email" />
      </div>
      <div>
        <button className="Addbtn" onClick={AddingStudents} >{StudentData.studentid? "Update" : "Add"}</button>
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
            {Students && filterStudents.map(student => {
              return (<tr key={student.studentid}>
                <td>{student.studentid}</td>
                <td>{student.name}</td>
                <td>{student.major}</td>
                <td>{student.email}</td>
                <td><button className='editBtn' onClick={() => HandleUpdate(student)}> Edit</button></td>
                <td><button className='delBtn'  onClick={() => HandleDelete(student.studentid)}> Del</button></td>
              </tr>)

            })}

          </tbody>
        </table>
      </div>

     </div>
    </>
  )
}

export default App

            /* <tr>
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
            </tr> */