import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings } from "../../store/bookings";
import { NavLink } from "react-router-dom";
import DeleteTheBook from "../DeleteBooking/DeleteBooking";
import EditBooking from "../EditBooking/EditBooking";
import EditBookingModal from "../EditBooking";


import './userbookings.css'
const UserBookings = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const dayjs = require('dayjs')
    let bookings = useSelector(state => state.bookings)
    // console.log('bookings', bookings)
    let bookingsArr = Object.values(bookings)

    // console.log('bookingsarr', bookingsArr)
    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])
    // console.log('bookings', bookingsArr)
    if (!bookings) return null; 
   
    return (
        <>
        <div className='bookings-layout'>
            {bookingsArr && (
                bookingsArr.map(booking => ( 
                <div className='booking-card'>
               <div key={booking.id}>

                <img src={booking?.Spot?.previewImage} className='img-card' />
                <div className='booking-card-info'><div id='spot-name'>{booking?.Spot?.name} </div>
                <br></br>Check-in: {new Date(booking.startDate).toLocaleDateString()}
                <br></br>Check-out: {new Date(booking.endDate).toLocaleDateString()}</div>
             <div className='button-container'>  <DeleteTheBook booking={booking} />
               {/* <NavLink to={`/bookings/${booking.id}`}><EditBooking booking={booking.id}/></NavLink> */}
               <EditBookingModal booking={booking}/> </div>
</div>

            </div>
            )))}
            
            {!bookingsArr.length && (
                <h1>No trips booked... yet!</h1>
                
            )}
            

        </div>
    </>
    )
}


export default UserBookings