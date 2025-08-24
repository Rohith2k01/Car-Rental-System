import { basicRequest } from "../Axios/AxiosCreate";

// Admin login api
export const AdminLoginApi = async(data) => {
    try{
        var response = await basicRequest.post('/Admin/Login',data)
        return response

    }catch (error) {
        console.log("Error fron Admin login", error);
        
    }
}

// Call all car Details
export const GetAllCars = async () => {
    try {
        const response = await basicRequest.get('/Admin/all-cars');
        return response;
    } catch (error) {
        console.log("Error from  admin all cars API", error);
    }
};



// Toggle Car Approval api
export const ApproveCar  = async (id, status) => {
  try {
    const response = await basicRequest.put(`/Admin/approve/${id}`, {
      isApproved: status,
    });
    return response;
  } catch (error) {
    console.log("Error toggling car approval", error);
  }
};


// call all booking details
export const GetAllBooking = async ()=>{
    try{
        var response = await basicRequest.get(`/Admin/customer-booking`)
        return response

    }catch(error){
        console.log("Error from all customer booking api",error);
        
    }
}



