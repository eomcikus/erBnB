import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getUserReviews} from "../../store/reviews";
import RemoveReview from '../RemoveReview';
import EditReviewModal from '../EditReview.js'
import './currentuserreviews.css'


const CurrentUsersReviews = () => {
    const dispatch = useDispatch()
    // const [reviews, setReviews] = useState([])
    // console.log('get the reviews', reviews)
    const reviewz = useSelector(state => state.reviews.user)
    const sessionUser = useSelector(state => state.session.user)
    // console.log('======================', reviewz)
    // const finalArr = reviews.filter(review => +review.userId == +sessionUser.id)
    // console.log('final arr', finalArr)
    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch,])
    const [loading, setLoading] = useState(false)
    // useEffect(async () => {
    //     const userReviews = await dispatch(getUserReviews())
    //     setReviews(userReviews.filter(review => +review.userId == +sessionUser.id))

    // }, [dispatch, sessionUser, loading])
    // function loader(e){
    //     e.preventDefault()
    //     setLoading(!loading)
    // }
    return (
        <div className='review-cards-container'>
            <h1>Your Reviews</h1>
            {reviewz.map(review => (<div key={review.id} className='reviewCard'>
                <div className='spot-info-review'><h2>{review.Spot.name}</h2><img id='review-spot-img' src={review.Spot.previewImage} /></div>
                <div className='review-info-user'><div id='review-user-card'>{review.review}</div> <div>★{review.stars}</div></div>
           <div className='review-card-buttons'> <EditReviewModal review={review}/> <RemoveReview review={review}/> </div> </div>))}
            {reviewz.map(review => review.userId === sessionUser.id && (
                <>
                {/* <EditReview review={review}/> */}
                {/* <RemoveReview review={review}/> */}
                </>
            ))}

        </div>
    )
}

export default CurrentUsersReviews;
