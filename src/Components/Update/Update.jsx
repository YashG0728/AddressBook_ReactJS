import {useState,useEffect} from 'react'
import './Updates.css'
import { NavLink, useParams } from 'react-router-dom'
import logo from '../logo.png'
import profile1 from '../../assets/profile-images/Ellipse -1.png'
import profile2 from '../../assets/profile-images/Ellipse -2.png'
import profile3 from '../../assets/profile-images/Ellipse -3.png'
import profile4 from '../../assets/profile-images/Ellipse -4.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
  const {emplyeeId} = useParams(); // path parameter acesss
  
  console.log(emplyeeId)
  const [startValue, setStartValue] = 
  useState({name : "",profilePic : "",gender : "",
  department : "",salary:"",startDate:"", note:""})
  
  const onChangeHandler = (e) => {
    const {name,value} = e.target;
    setStartValue(prevstate => ({
    ...prevstate,
    [name]:value
  }))
  }

  const updateHandler = () => {
    axios.put(`http://localhost:9096/update/${emplyeeId}`, startValue)
    .then((res)=>{console.log(res.data.data)
      toast.success(res.data.message)})
    .catch((err)=>{console.log(err)})
    }

  useEffect(()  =>  {
    loadHandler();
  },[])

  const loadHandler = () => {
  axios.get(`http://localhost:9096/GetEmployeeById/${emplyeeId}`)
  .then((res) => {console.log(res.data.data);
    setStartValue(res.data.data);
})
  .catch((err) => {console.log(err)})
  }


  const resetHandler = () => {
    setStartValue({name : "",profilePic : "",gender : "",
    department : "",salary : "",startDate : "", note : ""})
  }

  return (
    <div className="payroll-main">
    <header className='header center'>
        <div className="logo">
            <img src={logo} alt="" />
            <div>
                <span className="emp-text">EMPLOYEE</span> <br />
                <span className="emp-text emp-payroll">PAYROLL</span>
            </div> 
        </div>
    </header>

    <div className="content">
    <form className='form'>
      <div className="form-head">Employee Payroll form</div>
        <div className="row">
          <label className="labeltext" htmlFor="name">Name</label>
          <input onChange={onChangeHandler} className="textbox" type="text" id="Name" name="name" value={startValue.name}></input>
      </div>
       
      <div className="row">
          <label className="profileImage" htmlFor="profilePic">Profile image</label>
          <input onChange={onChangeHandler} className="first" type="radio" id="Name" name="profilePic" checked={startValue.profilePic === "profile1"} value="profile1"></input> 
          <img src={profile1} alt=""/>
          <input onChange={onChangeHandler} className="first" type="radio" id="Name" name="profilePic" checked={startValue.profilePic === "profile2"} value="profile2"></input>
          <img src={profile2}  alt=""/>
          <input onChange={onChangeHandler} className="first" type="radio" id="Name" name="profilePic" checked={startValue.profilePic === "profile3"} value="profile3"></input>
          <img src={profile3}  alt=""/>
          <input onChange={onChangeHandler} className="first" type="radio" id="Name" name="profilePic" checked={startValue.profilePic === "profile4"} value="profile4"></input>
          <img src={profile4}  alt=""/>
        </div>
        <div className="row">
          <label className="label" htmlFor="gender">Gender</label>
          <input onChange={onChangeHandler} className="first" type="radio" id="Name" name="gender" checked={startValue.gender === "male"} value="male"></input>
          <lable>Male</lable>
          <input onChange={onChangeHandler} className="first" type="radio" id="Name" name="gender" checked={startValue.gender === "female"} value="female"></input>
          <lable>Female</lable>
        </div>
        <div className="row">
          <label className="label text" htmlFor="department">Department</label>
          <input onChange={onChangeHandler}  className="second" type="checkbox" id="Name" name="department" checked={startValue.department === "HR"} value="HR"></input>
          <lable>HR</lable>
          <input  onChange={onChangeHandler} className="first" type="checkbox" id="Name" name="department" checked={startValue.department === "Sales"} value="Sales"></input>
          <lable>Sales</lable>
          <input onChange={onChangeHandler} className="first" type="checkbox" id="Name" name="department" checked={startValue.department === "Finance"} value="Finance"></input>
          <lable>Finance</lable>
          <input onChange={onChangeHandler} className="first" type="checkbox" id="Name" name="department" checked={startValue.department === "Engineer"} value="Engineer"></input>
          <lable>Engineer</lable>
          <input onChange={onChangeHandler} className="first" type="checkbox" id="Name" name="department" checked={startValue.department === "Other"} value="Other"></input>
          <lable>Other</lable>
        </div>
        <div className="row">
          <label className="label text" htmlFor="salary">Salary</label>
          <select onChange={onChangeHandler} className="third" type="text" id="Name" name="salary" value={startValue.salary}>
          <option  value="">Select Salary</option>
          <option value="10000">10000</option>
          <option value="20000">20000</option>
          <option value="30000">30000</option>
          <option value="40000">40000</option>
          <option value="50000">50000</option>
          <option value="60000">60000</option>
          <option value="70000">70000</option>
          <option value="80000">80000</option>
          </select>
        </div>
        <div className="row">
          <label className="label text" htmlFor="startdate">Start Date</label>
          <input onChange={onChangeHandler} className="day" type="date" id='startDate' name='startDate' value={startValue.startDate}/>
          {/* <select onChange={onChangeHandler} className="day" type="text" id="Name" name="startDate">
          <option value="">Day</option>
          </select>
          <select onChange={onChangeHandler} className="day" type="text" id="Name" name="startdate">
          <option value="">Month</option>
          </select>
          <select onChange={onChangeHandler} className="day" type="text" id="Name" name="startDate">
          <option value="">Year</option>
          </select> */}
        </div>
        <div className="row">
          <label className="label text" htmlFor="notes">Notes</label>
          <textarea onChange={onChangeHandler} className="textareas" type="text" id="Name" name="note" value={startValue.note}></textarea>
        </div>
       
      <div className="buttonParent">
        <div className="submit-reset">
            <NavLink exact to = "/Submit" >
            <button type="button" className="resetButton" >Cancel</button> 
            </NavLink>
            <button onClick={updateHandler} type="button" className="resetButton">Update</button> 
            <button onClick={resetHandler} type="button" className="resetButton">Reset</button>
          </div>
        </div>
        </form>
      </div>
      <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default Update;