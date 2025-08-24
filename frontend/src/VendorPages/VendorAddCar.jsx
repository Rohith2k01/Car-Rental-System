import React from 'react'
import './VendorAddCar.css'
import { AddCarVendor } from '../Api/VendorApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function VendorAddCar() {
    const [preview, setPreview] = useState()
    const [carImage, setCarImage] = useState()
    const [Car, setCar] = useState({
        carname: '',
        carseat: '',
        carmileage: '',
        carprice: '',
        cardis: ''
    })
    var navigate = useNavigate()


    function handleImageChanges(e) {
        const file = e.target.files[0]
        setCarImage(file)
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    function addData(e) {
        const { name, value } = e.target
        setCar((preview) => ({
            ...preview,
            [name]: value
        }))
    }

    async function postProduct() {
        const formdata = new FormData()
        formdata.append('carImage', carImage)
        formdata.append('carName', Car.carname)
        formdata.append('carSeat', Car.carseat)
        formdata.append('carMileage', Car.carmileage)
        formdata.append('carPrice', Car.carprice)
        formdata.append('carDis', Car.cardis)
        try {
            await AddCarVendor(formdata)
            navigate('/VendorHome')

        } catch (error) {
            console.log("Error from product adding", error);


        }

    }
    return (
        <div>
            <section className="add-car-form">
                <div className="image-upload-section">
                    {preview && <img src={preview} alt="Preview" className="image-preview" />}
                    <input type="file" className="input-add-file" onChange={handleImageChanges} />
                </div>

                <div className="form-group">
                    <label htmlFor="carname">Car Name:</label>
                    <input type="text" name="carname" placeholder="Enter car name" className="input-add" onChange={addData} />
                </div>

                <div className="form-group">
                    <label htmlFor="carseat">Car Seat:</label>
                    <input type="text" name="carseat" placeholder="Enter car seat" className="input-add" onChange={addData} />
                </div>

                <div className="form-group">
                    <label htmlFor="carmileage">Car Mileage:</label>
                    <input type="number" name="carmileage" placeholder="Enter car mileage" className="input-add" onChange={addData} />
                </div>

                <div className="form-group">
                    <label htmlFor="carprice">Car Price:</label>
                    <input type="text" name="carprice" placeholder="Enter car price" className="input-add" onChange={addData} />
                </div>

                <div className="form-group">
                    <label htmlFor="cardis">Rental company:</label>
                    <input type="text" name="cardis" placeholder="Enter car description" className="input-add" onChange={addData} />
                </div>

                <button className="add-car-btn" onClick={postProduct}>Add Car</button>
            </section>
        </div>

    )
}

export default VendorAddCar