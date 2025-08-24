
import { basicRequest, UserRequest } from "../Axios/AxiosCreate";
import Swal from 'sweetalert2';




export const userSignup = async (data, navigate) => {
    console.log(data);

    try {
        const response = await basicRequest.post('/Customer/signup', data);
        console.log(response.data);

        // SweetAlert2 for success
        Swal.fire({
            icon: 'success',
            title: 'Signup Successful!',
            text: response.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Proceed to Login',
        }).then(() => {
            navigate('/CustomerLogin');
        });

    } catch (error) {
        console.log("Error from customer signup", error);

        // SweetAlert2 for error
        Swal.fire({
            icon: 'error',
            title: 'Signup Failed',
            text: error.response?.data?.message || 'Something went wrong. Please try again.',
            confirmButtonColor: '#d33',
        });
    }
};


export const Userlogin = async (data) => {
    console.log(data);


    try {
        var response = await basicRequest.post('/Customer/Login', data)
        console.log(response.data);
        return response


    } catch (error) {
        console.log("Error from customer login", error);

    }
}


// Customer Approved car api
export const GetApprovedCars = async () => {
    try {
        const response = await UserRequest.get('/Customer/approved-cars');
        return response;
    } catch (error) {
        console.log("Error from  Customer approved car API", error);
    }
};


// adding car rental api
export const AddCarRental = async (data) => {
    try {
        const response = await UserRequest.post('/Rental/Add-Rental', data);

        Swal.fire({
            icon: 'success',
            title: 'Car Added!',
            text: response.data.message,
            confirmButtonColor: '#28a745',
        });

    } catch (error) {
        console.log("Error from user adding car rental", error);

        Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Could not add car rental.',
            confirmButtonColor: '#d33',
        });
    }
}


// collect rental cars api
export const CollectRentalCar = async (ID) => {
    try {

        var response = await UserRequest.get(`/Rental/collect-rental-data/${ID}`)
        return response;

    }catch(error){
        console.log("error from user rental car collecting", error);
        
    }
    

}


// call booking with user id
export const GetBooking = async (userid)=>{
    try{
        var response = await UserRequest.get(`/Booking/customer-booking/${userid}`)
        return response

    }catch(error){
        console.log("Error from user order api",error);
        
    }
}


// Update booking status cutomer
export const UpdateBookingStatus = async (bookingId, status) => {
  try {
    const response = await UserRequest.put(`/Booking/update-status/${bookingId}`, { status });
    return response;
  } catch (error) {
    console.error("Error updating booking status", error);
  }
};
