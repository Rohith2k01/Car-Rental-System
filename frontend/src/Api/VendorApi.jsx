import { basicRequest, VendorRequest } from "../Axios/AxiosCreate";
import Swal from 'sweetalert2';

export const vendorSignup = async (data, navigate) => {
    console.log(data);

    try {
        const response = await basicRequest.post('/Vendor/signup', data);
        console.log(response.data);

        // Show success alert
        Swal.fire({
            icon: 'success',
            title: 'Signup Successful!',
            text: response.data.message,
            confirmButtonText: 'Go to Login',
            confirmButtonColor: '#3085d6',
        }).then(() => {
            navigate('/VendorLogin');
        });

    } catch (error) {
        console.log("Error from vendor signup", error);

        // Show error alert
        Swal.fire({
            icon: 'error',
            title: 'Signup Failed',
            text: error.response?.data?.message || 'Something went wrong. Please try again.',
            confirmButtonColor: '#d33',
        });
    }
};


export const Vendorlogin = async (data) => {
    console.log(data);


    try {
        var response = await basicRequest.post('/Vendor/Login', data)
        console.log(response.data);
        return response


    } catch (error) {
        console.log("Error from vendor login", error);

    }
}



export const AddCarVendor = async (formdata) => {
  try {
    const response = await VendorRequest.post("/Car/Add-Car-Token", formdata, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    // ✅ SweetAlert for success
    Swal.fire({
      icon: 'success',
      title: 'Car Added Successfully!',
      text: 'Your car has been added to the list.',
      confirmButtonColor: '#28a745'
    });

    return response;

  } catch (error) {
    console.log("Error from Vendor Add Car", error);

    // ❌ SweetAlert for error
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error?.response?.data?.message || 'Something went wrong while adding the car.',
      confirmButtonColor: '#d33'
    });

    throw error;
  }
};


// call cars with vendor id
export const GetCar = async (userid)=>{
    try{
        var response = await VendorRequest.get(`/Vendor/vendor-cars/${userid}`)
        return response

    }catch(error){
        console.log("Error from user order api",error);
        
    }
}


// update availability of vendor car 
export const ToggleAvailability = async (id, isAvailable) => {
  try {
    const response = await VendorRequest.put(`/Vendor/update-availability/${id}`, {
      isAvailable,
    });
    return response;
  } catch (error) {
    console.log("Error toggling availability", error);
  }
};


// call booking with vendor id
export const GetBooking = async (vendorId)=>{
    try{
        var response = await VendorRequest.get(`/Vendor/customer-booking/${vendorId}`)
        return response

    }catch(error){
        console.log("Error from user order api",error);
        
    }
}

