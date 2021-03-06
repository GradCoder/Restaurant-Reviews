import { query } from "express"

let restaurants

export default class RestaurantsDAO
{
    static async injectDB(conn)
    {
        if(restaurants)
        {
            return
        }
        try{
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch(e)
        {
            error(
            `unable to establish a collection handle in restaurantsDAO :${e}`,
                )
        }
    }
    static async getRestaurants({
        filters = null,
        page =0,
        restaurantsPerPage=20,
    } = {}) {
        let query
        if(filters)
        {
            if('name' in filters)
            {
                query ={$text:{$search:filters["name"]}}
            }
            else if("cuisine" in filters)
            {
                query = { "cuisine":{ $eq: filters["cuisine"]}}
            }
            else if("zipcode" in filters)
            {
                query = { "address.zipcode": {$eq: filters["zipcode"]}}
            }
        }
    let cursor 

    try{
        cursor = await restaurants
        .find(query)
    } 
    catch(err)
    {
        console.error(`unable to find the command,${e}`)
        return {restaurantsList:[], totalNumRestaurants:0}
    }

    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
    try{
        const restaurantsList = await displayCursor.toArray()
        const totalNumRestaurants = await restaurants.countDocuments(query)
        return { restaurantsList,totalNumRestaurants}
    } 
    catch(err)
    {
        console.error(`unable to convert cursor to array ,${e}`)
        return {restaurantsList:[], totalNumRestaurants:0}
    }
    
    }
}