import ReviewsDAO  from "../dao/reviewsDAO.js";

export default class ReviewsController
{
    static async apiPostReview(req,res, next)
    {
        try{
            const restaurantId = req.body.restaurant_id
        const review = req.body.review
        const userInfo = {
            name : req.body.name,
            _id: req.body.id
        }
        const date = new Date();
        const ReviewResponse = async ReviewsDAO.addReview(
            restaurantId,
            review,
            userInfo,
            date
        )
         res.json({status:"success"})
        }
        catch(e)
        {
            res.json({error:e.message})
        }

    }



    static async apiUpdateReview(req,res, next)
    {
        try{
            const restaurantId = req.body.restaurant_id
        const review = req.body.review
        const userInfo = {
            name : req.body.name,
            _id: req.body.id
        }
        const date = new Date();
        const ReviewResponse = async ReviewsDAO.addReview(
            restaurantId,
            review,
            userInfo,
            date
        )
         res.json({status:"success"})
        }
        catch(e)
        {
            res.json({error:e.message})
        }

    }
}