import React, {useState} from "react";
import { connect } from "react-redux";
import { addRider, fetchRider, updateRider, deleteRider, reset } from "./Redux/action_creators";
import RidersList from './RidersList'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FaAddressBook } from 'react-icons/fa';
//import { faArrowUp } from 'react-icons'//"@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AddRidersForm = ({updatedRider, searchedRider, addRider, fetchRider, updateRider, deleteRider, reset}) => {

    const [rider, setRider] = useState({id:0, name:''})
    const [riderId, setRiderId] = useState(0)
    

    const handleChange = (e) => {
        const { name, value }  = e.target
        setRider({...rider, [name]: value})
        
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        addRider(rider)
    }

    const handleSearch = () => {
        fetchRider(rider.id.toString())
        console.log(updatedRider)
        setRiderId(rider.id)
    }

    const handleUpdate = () => {
        //updateRider(rider.id, rider)
        console.log(updatedRider)
        axiosUpdate()
        
    }

    const axiosUpdate = async() => {
        try{
            console.log(rider)
            const response = await(axios.put(`http://localhost:7000/riders/${rider.id}`, rider, {withCredentials: true}))
            console.log(response.data)
        }
        catch(err){
            console.error(err)
        }
    }

    const axiosDelete = async() => {
        try{
            console.log(rider)
            const response = await(axios.delete(`http://localhost:7000/riders/${rider.id}`, {withCredentials: true}))
            console.log(response.data)
        }
        catch(err){
            console.error(err)
        }
    }

    const handleDelete = () => {
        deleteRider(rider.id)
        axiosDelete();
        setRider({id:"", name: ""})
    }

    const handleSave = async() => {

        try{
            const response = await(axios.post('http://localhost:7000/riders', updatedRider, {withCredentials:true}))
            console.log(response.data)
            console.log(updatedRider)
        }
        catch(err){
            console.error(err.response.data)
        }
        reset()
       }
    
    ;

    return (
        <div className="my-8 w-auto ">
            <header className="border border-b-4 bg-slate-600 p-4 sticky top-0 z-5">
                <nav className="flex justify-between align-middle items-center px-4">
                    <FaAddressBook size={'50px'}/>
                    <ul className="flex items-center justify-end text-white text-xl">
                        <li className="mx-4"><a href="/">Home</a></li>
                        <li className="mx-4"><a href="/">Riders</a></li>
                        <li className="mx-4"><a href="/">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <h1 className="text-3xl mb-4">Riders Form</h1>
            <form className='p-4 border border-blue-500 w-max mx-auto rounded-md'
             method='POST' onSubmit={handleSubmit}>

                <div className="text-2xl flex align-middle justify-between mt-2">
                    <label className="w-4 text-left" htmlFor="id">ID:</label>
                    <input 
                     type={"number"}
                     className='px-2 border border-blue-500'
                     placeholder="Enter ID"
                     name='id' 
                     required={true}
                     value={rider.id} 
                     onChange={handleChange}/>
                </div>
                <div className="text-2xl flex align-middle justify-between mt-2">
                    <label className='w-4 text-left' htmlFor="name">Name:</label>
                    <input className='px-2 border border-blue-500' 
                    type="text" 
                    name='name'
                    placeholder="Enter Name"
                    required
                    value={rider.name} 
                    onChange={handleChange}/>
                </div>
                    <button className='text-xl border rounded-lg border-b-slate-800 bg-slate-500 p-4 text-white mt-2 mr-2'
                    type="submit">Add</button>
                    <button className='text-xl border rounded-lg border-b-slate-800 bg-slate-500 p-4 text-white mt-2 mr-2'
                    type="button" onClick={handleSearch}>Search</button>
                    <button className='text-xl border rounded-lg border-b-slate-800 bg-slate-500 p-4 text-white mt-2 mr-2'
                    type="button" onClick={handleUpdate}>Update</button>
                    <button className='text-xl border rounded-lg border-b-slate-800 bg-slate-500 p-4 text-white mt-2 mr-2'
                    type="button" onClick={handleDelete}>Delete</button>
                    <button className={`text-xl border rounded-lg border-b-slate-800 ${updatedRider.length<=0? 'bg-slate-100' : 'bg-slate-500'} p-4 text-white mt-2 mr-2`}
                    type="button" disabled={updatedRider.length<=0} onClick={handleSave}>Save</button>
            </form>

            {searchedRider.map((rider) => {
                return <p key={rider.id}>{`Found ${rider.name}`}</p>
            })}

            {updatedRider.map((rider) => {
                return <li key={rider.id}>{rider.name}</li>
            })}

            <RidersList riders={updatedRider || rider} searchedRiderID={riderId}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {updatedRider: state.riders, searchedRider: state.searchedrider}
}

export default connect(mapStateToProps, {addRider, fetchRider, updateRider, deleteRider, reset})(AddRidersForm);