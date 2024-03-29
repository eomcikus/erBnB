import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { editBooking, getUserBookings } from '../../store/bookings';
import { getSingleSpot } from '../../store/spots';
import './editbooking.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)
const EditBooking = ({booking, setShowModal}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const {bookingId} = useParams()
    const dayjs = require('dayjs')
    const tz = 'America/New_York'
    dayjs.tz.setDefault('America/New_York')
    const [startDate, setStartDate] = useState(booking?.startDate)
    const [endDate, setEndDate] = useState(booking?.endDate)
    const [submit, setSubmit] = useState(false)
    useEffect(() => {
        setStartDate(booking?.startDate)
        setEndDate(booking?.endDate)
    }, [dispatch])

    useEffect(() => {
        
    })
        const handleSubmit = async (e) => {
            e.preventDefault()
            let createdBooking;
            const payload = {
                spotId: booking?.spotId,
                userId: user.id,
                startDate: dayjs(startDate).utc().format("YYYY-MM-DD HH:mm:ss"),
                endDate: dayjs(endDate).utc().format("YYYY-MM-DD HH:mm:ss"),
            }
            setSubmit(true)
            // console.log('spotid', +spotId)
            createdBooking = await dispatch(editBooking(payload, +booking.id))
                setShowModal(false)
            // if (!createdBooking){
                
            // }
            window.alert('Booking successfully updated!')
            dispatch(getUserBookings())
    }
    
    // if (!booking) return null
    return (
        <>
        <section>
        <form className='booking-form' onSubmit={handleSubmit}>
            <div className='booking-object'>
                {/* <label>Start</label> */}
                <div className='booking-spot-info-cont'>
                    <div className='spot-price-cont'><div className='spot-price'>${booking.Spot?.price}   </div> <div>{'  '} night </div></div></div>

                <div className='calendar-cont'>
                    <input type='date' 
                    id='calendar-left'
                    value={dayjs(startDate).tz(tz).format('YYYY-MM-DD')} 
                    onChange={e => setStartDate(e.target.value)} />
                  
                    {/* <label>End</label> */}
                    <input type='date' 
                    id='calendar-right'
                    value={dayjs(endDate).tz(tz).format('YYYY-MM-DD')}
                    onChange={e => setEndDate(e.target.value)} />
                </div>
                <button className='reserve-button' type='submit'>Change Booking</button>
            </div>
            </form>
            </section>
            </>
    )
}


export default EditBooking;