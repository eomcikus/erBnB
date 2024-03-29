import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SpotActions from "../../store/spots";
import EditSpot from '../EditSpotModal';
import DeleteSpot from '../DeleteSpotModal';
import CreateReviewModal from '../CreateReviewModal'
import ReviewsForSpot from '../ReviewsForSpot';
import reviewReducer from '../../store/reviews';
import { getUserReviews, getReviews } from '../../store/reviews';
import { clear, getSingleSpot } from '../../store/spots';
import './SingleSpot.css'
import CreateBooking from '../CreateBooking/CreateBooking';
import MapContainer from '../Maps';
const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.singleSpot)

    const sessionUser = useSelector(state => state.session.user)
    const reviewsObj = useSelector(state => state.reviews)
    const avgStarRating = useSelector(state => state.spots.singleSpot.avgStarRating)
    const newestRating = avgStarRating
    const reviewsArr = Object.values(reviewsObj)
    let finalArr = Object.values(reviewsArr[0])
    // console.log('reviewsarray', finalArr)
    const reviewLength = finalArr.length
    // console.log('review length----', reviewLength)
    let reviewBoo;
    if (sessionUser) {
        reviewBoo = finalArr.find(review => sessionUser.id === review.userId)
    }
    useEffect(() => {
        dispatch(getSingleSpot(spotId))
        dispatch(getReviews(spotId))

    }, [dispatch, spotId, avgStarRating])
    // useEffect(() => {
    //     dispatch(getReviews(spotId))
    // }, [reviewLength])

    // useEffect(() => {

    // }, [reviewLength])
    // useEffect(() => {
    //     reviewLength = reviewsArr.length
    // }, [reviewsArr])
    // useEffect(() => {
    //     let reviewfound; 
    //     if (sessionUser) reviewfound = reviewsArr?.find(review => sessionUser.id === review.userId)
    //     if (reviewfound) setReviewBoo(true)
    // },[reviewsArr])
    // useEffect(() => {
    //     dispatch(getSingleSpot(spotId))
    //     return(() => {
    //         dispatch(clear())
    //     })
    // })
    //   console.log('spot', spot)
    if (!spot) return null;
    return (
        <div className="single-spot-container" key={spot.id}>
            <div className="singleSpot-card-details">
                <div className='singleSpot-name'>{spot?.name}</div><p></p>
                <div className='single-spot-stars'>★ {spot.avgStarRating ? parseFloat(newestRating).toFixed(2) : 'none'}  ·   {spot?.city}, {spot?.state}, {spot.country} · {finalArr ? reviewLength : 'No'} reviews</div>
                {/* <div>{spot?.city}, {spot?.state}</div> */}<p></p>
                {spot?.SpotImages?.map(image => <img className='ss-preview-img' src={image.url} />)}
                <div className='hosted-by-content'><div className='spot-host-sent'>Spot hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}  <div><img className='single-spot-owner-pic' src={spot?.Owner?.userPhoto} /></div></div>
                    <div className='booking'>
                        <CreateBooking spot={spot} />
                    </div>
                </div>


                <div className='singleSpot-description'>{spot?.description}</div>
            </div>

            {sessionUser && spot.ownerId === sessionUser.id && (
                <>
                    <div className='edit-delete-buttons'>
                        <EditSpot className='edit' />
                        <DeleteSpot />
                    </div>
                </>
            )}
            {sessionUser &&
                !reviewBoo &&
                spot.ownerId !== sessionUser.id && (
                    <div className='create-review-div'>
                        <CreateReviewModal />
                    </div>
                )}

            <ReviewsForSpot />
            <div className='map-container'>


                <h2>Where you'll be</h2>


                <MapContainer />
            </div>
        </div>
    )
}

export default SingleSpot;