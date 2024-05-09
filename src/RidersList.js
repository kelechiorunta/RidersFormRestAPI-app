import React, {useState, useEffect} from "react";
import axios from "axios";

const RidersList = ({riders, searchedRiderID}) =>{
    
    const [riderslist, setRidersList] = useState([])

    useEffect(() => {
        const fetchdata = async() => {
            try{
                const response = await(axios.get('http://localhost:7000/riders'))
                const sortlist = response.data.rider.sort((a, b) => a.id - b.id);
                setRidersList(sortlist)
            }
            catch(err){
                console.error(err)
            }
        }
        fetchdata()
    }, []);

    return (
        <div className="text-3xl my-8 w-auto">
            <h1 className="my-4">Riders List</h1>
            <ul className="text-2xl flex align-middle justify-center flex-col w-13 mx-auto">
                <table className="border border-collapse w-auto p-8 mx-16 h-8 overflow-scroll">
                    <thead className="border border-collapse">
                        <th className="border border-collapse mx-auto w-auto text-center">ID</th>
                        <th className="border border-collapse mx-auto w-auto text-left">Name</th>
                    </thead>
                    <tbody>
                        
                {(riderslist) && riderslist.map(rider=> (
                    <tr key={rider.id} className={`border border-collapse mx-auto w-auto 
                    ${rider.id===searchedRiderID? 'bg-blue-500': 'bg-none'}`}>
                    {/* // <li className="flex align-middle justify-between mx-auto" key={rider.id}> */}
                        <td><span className="text-left border-l-4 border-b-4 mx-auto w-3">{rider.id}</span></td>
                        <td><p className="text-left mx-auto">{rider.name}</p></td>
                    {/* // </li> */}
                    </tr>
                ))}
                        
                    </tbody>
                    {console.log(searchedRiderID)}
                </table>
            </ul>
        </div>
    )
};

export default RidersList;