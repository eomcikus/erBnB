import './ReviewCard.css';
import { useSelector, useDispatch } from 'react-redux';
import RemoveReview from '../RemoveReview';

const ReviewCard = ({ review }) => {
    // console.log('reviews in reviewcard', review)
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const newReview = useSelector(state => state.reviews.User)
    // console.log('newReview', newReview)
    // console.log('sessionUser', sessionUser)
    // const review = useSelector(state => state.review.)
    // if (!newReview) return null;
     return (

        <div className='review-container'>
            <div className='review-card-layout'>
                <div className='review-userName'>
                    {review.User ? review.User.firstName : sessionUser.firstName}</div>
                    <div className='review-content'>
                        {review.review}
                        {sessionUser && sessionUser.id === review.userId && (
                            <RemoveReview />)}
                    </div>
                </div>
            </div>
     

    )
}

export default ReviewCard;