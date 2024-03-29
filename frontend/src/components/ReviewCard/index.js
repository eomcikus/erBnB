import './ReviewCard.css';
import { useSelector, useDispatch } from 'react-redux';
import RemoveReview from '../RemoveReview';
import EditReviewModal from '../EditReview.js';

const ReviewCard = ({ review }) => {
    // console.log('reviews in reviewcard', review)
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch()
    const reviews = useSelector(state => Object.values(state.reviews))
    // console.log('card', review)
    const sessionUser = useSelector(state => state.session.user)
    const newReview = useSelector(state => state.reviews.User)
    // console.log('newReview', newReview)
    // let reviews = useSelector(state => Object.values(state.reviews.spot));
    // console.log('reviews', reviews)
    // console.log('sessionUser', sessionUser)
    // const review = useSelector(state => state.review.)
    // if (!newReview) return null;
    if (!reviews) return null
    return (
        <>
            <div className='review-container'>
                <div className='review-card-layout'>
                    <div className='photo-container'>
                        <img className='user-photo' src={review.User.userPhoto} />
                        <div className='review-userName'>
                            {review.User ? review.User.firstName : sessionUser.firstName}</div></div>
                    <div className='review-content'>
                        <div className='review-review'>{review.review}</div>
                        {sessionUser && sessionUser.id === review.userId && (

                            // <EditReview review={review} />
                            <RemoveReview review={review} />)}
                        {sessionUser && sessionUser.id === review.userId && (

                            // <EditReview review={review} />
                            <EditReviewModal review={review} />)}
                    </div>
                </div>
            </div>
        </>

    )
}

export default ReviewCard;