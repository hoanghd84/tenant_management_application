import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getRoom, updateRoom } from "../../_api/room.js";


const Update = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        room: '',
        room_rate: 0,
        rent_from: '',
        rent_to: '',
        deposit: 0,
        tenant_lead: {
            name: '',
            phone: '',
            room: ''
        }
    })

    useEffect(() => {
        getRoom(id)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        updateRoom(id, values)
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Sửa thông tin phòng</h1>
                <form onSubmit={handleUpdate}>
                    <div className="mb-2">
                        <label htmlFor="room">Phòng:</label>
                        <input type="text" name="room" className="form-control" placeholder="Enter Room number" value={values.room}
                            onChange={e => setValues({ ...values, room: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tenantName">Trưởng phòng:</label>
                        <input type="text" name="tenantName" className="form-control" placeholder="Enter Tenant Name" value={values.tenant_lead.name}
                            onChange={e => setValues((prevState) => ({
                                ...prevState,
                                tenant_lead: {
                                    ...prevState.tenant_lead,
                                    name: e.target.value
                                },
                            }))}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tenantPhone">Điện thoại:</label>
                        <input type="text" name="phone" className="form-control" placeholder="Ex: 03856510xx" value={values.tenant_lead.phone}
                            onChange={e => setValues((prevState) => ({
                                ...prevState,
                                tenant_lead: {
                                    ...prevState.tenant_lead,
                                    phone: e.target.value
                                },
                            }))}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tenantNumber">Số người:</label>
                        <input type="number" name="tenantNumber" className="form-control" placeholder="nhập số người thuê" value={values.tenant_number}
                            onChange={e => setValues({ ...values, tenant_number: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="startDate">Ngày bắt đầu:</label>
                        <input type="date" name="startDate" className="form-control" placeholder="Ex: 2023/9/1" value={values.rent_from}
                            onChange={e => setValues({ ...values, rent_from: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="endDate">Ngày kết thúc:</label>
                        <input type="date" name="endDate" className="form-control" placeholder="Ex: 2024/9/1" value={values.rent_to}
                            onChange={e => setValues({ ...values, rent_to: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="roomRate">Giá phòng:</label>
                        <input type="number" name="roomRate" className="form-control" placeholder="Enter room rate" value={values.room_rate}
                            onChange={e => setValues({ ...values, room_rate: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="deposit">Tiền cọc:</label>
                        <input type="number" name="deposit" className="form-control" placeholder="Enter room deposit" value={values.deposit}
                            onChange={e => setValues({ ...values, deposit: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-success">Cập nhật</button>
                    <Link to="/" className="btn btn-secondary ms-3">Quay lại</Link>
                </form>
            </div>
        </div>
    )
}

export default Update