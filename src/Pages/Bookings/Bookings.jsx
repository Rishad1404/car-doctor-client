import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Booking from "./Booking";
import axios from "axios";

const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])


    const url = `http://localhost:5000/bookings?email=${user?.email}`
    useEffect(() => {
        axios.get(url,{withCredentials:true})
        .then(res=>{
            setBookings(res.data)
        })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data))
    }, [url])

    const handleDelete=id=>{
        const proceed=confirm('Are you sure')

        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method:"DELETE"
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.deletedCount>0){
                    alert('Successfully Deleted')
                    const remaining=bookings.filter(booking=>booking._id!==id)
                    setBookings(remaining)
                }
            })
        }

    }

    const handleBookingConfirm=id=>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:"PATCH",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status:"Confirm"})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount>0){
                const remaining=bookings.filter(booking=>booking._id!==id)
                const updated=bookings.find(booking=>booking._id===id)
                updated.status='confirm'
                const newBookings=[updated,...remaining]
                setBookings(newBookings)
            }
        })
    }
    return (
        <div>
            <h2 className="text-5xl">Your Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-300">
                        <tr>
                            <th>
                                
                            </th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Service Name</th>
                            <th>Date</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking=><Booking key={booking._id} booking={booking} handleDelete={handleDelete} handleBookingConfirm={handleBookingConfirm}></Booking>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;