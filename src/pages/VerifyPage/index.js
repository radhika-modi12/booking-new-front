import React from "react";
import { useLocation } from 'react-router-dom';
import api from '../../../src/axiosConfig';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
const VerifyPage =() =>{
    const location = useLocation();
    const getQueryParams = (search) => {
        const params = new URLSearchParams(search);
        return params.get('id')?.trim(); // Extract the 'id' query parameter
    };
    const id = getQueryParams(location.search);
    console.log({id})


    const handleVerify = async() =>{
        const response = await api.get(`/auth/verify?id=35`);
        if(response){
            toastr.success('Email verify successfully!', 'Success');
        }
    }
    return (
        <div className="container">
            <button type ="button" name="btn-primary" onClick={handleVerify} >verify</button>
            </div>
    )

}
export default VerifyPage;