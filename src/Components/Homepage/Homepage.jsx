import logo from "../../assets/images/logo.png";
import "../Homepage/Homepage.css"
import { NavLink } from "react-router-dom";
import { useEffect,useState } from "react";
import {DataTransfer} from '../DataTransfer'
import axios from 'axios'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Link } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


export default function Homepage() {
  useEffect  (() => {
    DataTransfer().then((res) => {
      console.log(res.data)
      setList(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  const [list,setList] = useState([]);


  const deleteHandler = (id) => {
    axios.delete(`http://localhost:4025/delete/${id}`)
    .then((res)=>{console.log(res.data.data)})
    .catch((err)=>{console.log(err)})
    }
  return (
    <div>
      <>
      <header className="header-content header">
        <div className="logo-content">
          <img src={logo} alt="" />
          <div>
            <span className="emp-text">ADDRESS</span>
            <br />
            <span className="emp-payroll">BOOK</span>
            <br />
          </div>
        </div>
      </header>
      <div className="form-content">
        <form className="container">
          <div className="pageHeader">
            <label className="form-heads">Person Details</label>
            <input
              type="text"
              class="search-field"
              placeholder="Search …"
              name="s"
              title="Search for:"
            />
            <NavLink exact to="/">
              <button className="b"> + Add User</button>
            </NavLink>
          </div>
          <br />
          <br />
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>fname</th>
                  <th>lname</th>
                  <th>email</th>
                  <th>city</th>
                  <th>state</th>
                  <th>zip</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((emp)=>{
                  return (
                  <>
                  <tr key={emp.id}>
                  <td className="td1">{emp.fname}</td>
                  <td className="td2">{emp.lname}</td>
                  <td className="td3">{emp.email}</td>
                  <td className="td4">{emp.city}</td>
                  <td className="td5">{emp.state}</td>
                  <td className="tdzip">{emp.zipcode}</td>
                  <td className="td6"><button className="deletebtn" onClick={() => {deleteHandler(emp.id)}}><DeleteRoundedIcon/></button>
                  <Link to={`/update/${emp.id}`}><button><EditOutlinedIcon/></button></Link>
                  </td>
                  </tr>
                  </>
                  )
                })}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
    </div>
  )
}
