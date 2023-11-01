import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const Bookings = () => {

    const { user } = useContext(AuthContext);
    console.log('gjh',user.email);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = UseAxiosSecure();
    // const url = `http://localhost:5000/checkouts?email=${user.email}`;
    const url = `/checkouts?email=${user.email}`;
    useEffect(() => {
        // fetch(url,{credentials: 'include'})
        //     .then(res => res.json())
        //     .then(data => setBookings(data))

        axiosSecure.get(url)
        .then(res => setBookings(res.data))
    }, [url,axiosSecure])

    const handleDelete = id => {
        const proceed = confirm("Are you sure you want to delete it?")
        if (proceed) {
            fetch(`http://localhost:5000/checkouts/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('deleted Successful')
                    const remaining = bookings.filter(booking => booking._id !== id )
                    setBookings(remaining)
                }
            })
           
        }
    }
    
    const handleConfirm = id => {
        fetch(`http://localhost:5000/checkouts/${id}`,{
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            }, 
            body: JSON.stringify({
                status: 'confirm'
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                const remaining = bookings.filter(booking => booking._id !== id)
                const updated = bookings.find(booking => booking._id === id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining]
                setBookings(newBookings);
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Service Name</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map( booking => <BookingRow 
                            key={booking._id} 
                            booking = {booking}
                            handleDelete = {handleDelete}
                            handleConfirm = {handleConfirm}
                            ></BookingRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default Bookings;