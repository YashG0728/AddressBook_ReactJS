import logo from '../../assets/images/logo.png'
import React from 'react';
import "./payroll-form.css"
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom'
import Stack from '@mui/material/Stack';
function AddressBookApp() {
  //Declare variable and set values into it
  const [startValue, setStartValue] = 
  useState({fname : "",lname : "",email : "",
  phoneNumber : "",city:"",state:"", zipcode:""})

  const onChangeHandler = (e) => {
    const {name,value} = e.target;
    setStartValue(prevstate => ({
    ...prevstate,
    [name]:value
  }))
  }
  //Submit handler to access Submit button
  const submitHandler = () => {
    console.log(startValue)
    axios.post("http://localhost:4025/postData", startValue)
    .then((res)=>{console.log(res.data.data)
      toast.success(res.data.message)})
    .catch((err)=>{console.log(err)})
    }
    //ResetHanddler to access reset button
    const resetHandler = () => {
      setStartValue({fname : "",lname : "",email : "",
      phoneNumber : "",city:"",state:"", zipcode:""})
    }

    //update
    useEffect(()  =>  {
      loadHandler();
    },[])

    const {id} = useParams();

    const loadHandler = () => {
      axios.get(`http://localhost:4025/get/${id}`)
      .then((res) => {console.log(res.data);
        setStartValue(res.data);
    })
      .catch((err) => {console.log(err)})
      }

      const updateHandler = () => {
        axios.put(`http://localhost:4025/updateUsingToken/${id}`, startValue)
        .then((res)=>{console.log(res.data.data)
          toast.success(res.data.message)})
        .catch((err)=>{console.log(err)})
        }
   
    // -----------------------------------------
  // const onNameChange = (event) => {
  //   console.log("value is : ",event.target.value);
  //   const nameRegex = RegExp('[A-Z]{1}[a-zA-Z\\s]{2,}$');
  //   this.setStartValue({fname: event.target.value})
  //   if(nameRegex.test(event.target.value)){
  //     this.setStartValue({ nameError: '' })
  //   }else {
  //     this.setState({ nameError: 'Name is incorrect' })
  //   }
  // }
    
    // &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; for blank space
  return (
    <div className="payroll-main">
    <header className='header center'>
        <div className="logo">
            <img src={logo} alt="" />
            <div>
                <span className="emp-text">ADDRESS</span> <br />
                <span className="emp-text emp-payroll">BOOK</span>
            </div> 
        </div>
    </header>
    <div className="content">
    <form className='form'>
    <div className="form-head">
  <div className='clheader'>PERSON ADDRESS FORM</div>
  <div className='clbutton'>
  <NavLink exact to="/submit"><button onclick ="/submit" className='buttons'><CloseIcon/></button></NavLink></div>
  </div>
        <div className="row-content">
        <div>
          <label className="labeltext1" htmlFor="name">FIRST NAME</label>
          <input    onChange={onChangeHandler} value={startValue.fname} className="textbox1" type="text" id="Name" name="fname"></input>
          </div>
          <div>
          <label className="labeltext2" htmlFor="name">LAST NAME</label>
          <input onChange={onChangeHandler} value={startValue.lname} className="textbox2" type="text" id="Name" name="lname"></input>
          </div>
      </div>
        <div className="row">
          <label className="labeltext" htmlFor="name">PHONE NUMBER</label>
          <input onChange={onChangeHandler} value={startValue.phoneNumber} className="textbox" type="text" id="Name" name="phoneNumber"></input>
      </div>
      <div className="row">
          <label className="labeltext" htmlFor="name">EMAIL ID</label>
          <input onChange={onChangeHandler} value={startValue.email} className="textbox" type="text" id="Name" name="email"></input>
      </div>
      <div className="row-content1">
                        <div>
                            <label className="labeltexts" htmlFor="city">CITY</label>
                            <select onChange={onChangeHandler} value={startValue.city} className="input1" id="city" name="city">
                                <option value="" disabled selected hidden>Select City</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="Cochin">Cochin</option>
                            </select>
                        </div>
                        <div className="state-row">
                            <label className="labeltexts2" htmlFor="state">STATE</label>
                            <select onChange={onChangeHandler} value={startValue.state} className="input2" id="state" name="state">
                                <option value="" disabled selected hidden>Select State</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Maharastra">Maharastra</option>
                                <option value="Kerala">Kerala</option>
                            </select>
                        </div>
                        <div>
                            <label className="labeltextss" htmlFor="name">ZIP CODE</label>
                            <input className="inputs" onChange={onChangeHandler} value={startValue.zipcode} type="text" id="Name" name="zipcode"></input>
                        </div>
                    </div>
        <div className="buttonParent">
        <Stack spacing={2} direction="row" className="submit-reset">
        {
          id && 
         <Button onClick={updateHandler} variant="contained" type="button">Update</Button>
        }
        {
          !id &&
          <Button onClick={submitHandler} variant="contained" type="button">Add</Button>
        }  
        <Button onClick={resetHandler} variant="contained" type="button">Reset</Button>
        </Stack>
        </div>
      </form>
    </div>
    <ToastContainer autoClose={1000}/>
    </div>
  );
}

export default AddressBookApp;
// {formValue.isUpdate ? 'Update' : 'Add'}