const { BookingRepository } = require('../repository/index');
const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/serverconfig');
const { ServiceError} = require('../utils/errors')

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            const getFlightRequestPath = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestPath);
            // console.log('from booking service', flight.data)
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('someting went wrong in the booking process', 'insufficient seats for booking')
 
            }

            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload  = {...data , totalCost}
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL , {totalSeats : flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id , {status: 'Booked'})
            return finalBooking;
        } catch (error) {
            console.log(error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();  
        }
    }
}

module.exports = BookingService;