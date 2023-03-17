const { BookingService }= require('../services/index');
const { StatusCodes} = require('http-status-codes');

const bookingService = new BookingService();



// class BookingController{
//     constructor(){}
// }
const create = async (req, res) =>{
    try {
        const response = await bookingService.createBooking(req.body);
        console.log("FROM BOOKING CONTROLLER", response);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully completed booking',
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
}

const update = async (req, res) =>{
    try {
        const response = await bookingService.update(req.body);
        console.log("FROM BOOKING CONTROLLER", response);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully completed booking',
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
}

module.exports = { create ,
update
};