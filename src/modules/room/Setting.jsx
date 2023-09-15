import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getRoom } from "../../_api/room";

const Setting = () => {
    const [data, setData] = useState([])
    const { id } = useParams();
    useEffect(() => {
        getRoom(id)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                {console.log(data)};
                <h1>Common setting</h1>
                {/* Room	Tenant Lead	Phone	Start date	End date	Room rate	Deposit	Total */}
                <div className="mb-2">
                    <div>Service price: {data.room}</div>
                </div>
                <div className="mb-2">
                    <div>Electric price: {data?.tenant_lead?.name}</div>
                </div>
                <div className="mb-2">
                    <div>Water price: {data?.tenant_lead?.phone}</div>
                </div>                
                <Link to={`/update/${id}`} className="btn btn-success mt-3">Edit</Link>
                <Link to="/" className="btn btn-primary ms-3 mt-3">Back</Link>
            </div>
        </div>
    )
}

export default Setting