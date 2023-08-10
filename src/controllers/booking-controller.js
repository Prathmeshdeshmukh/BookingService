const { BookingService }= require('../services/index');
const { StatusCodes} = require('http-status-codes');

const bookingService = new BookingService();
const { createChannel , publishMessage } = require('../utils/messageQueue')
const { REMINDER_BINDING_KEY } = require('../config/serverconfig')

class BookingController{
    constructor(){
        // this.channel = channel;
    }

    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const payload = {
            data : {
                subject : 'this is the noti from queue',
                content : 'some queue will subsc this',
                recepientEmail : 'prathmeshd60@gmail.com',
                notificationTime :  '2023-08-10T09:56:00'
            },
            service : 'CREATE_TICKET' 
        }
        publishMessage(channel , REMINDER_BINDING_KEY , JSON.stringify(payload));
        return res.status(200).json({
            message : 'successfully published the event'
        })
    }

    async create (req, res){
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
}



module.exports = BookingController