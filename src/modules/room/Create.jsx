import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addRoom } from "../../_api/room";

const Edit = () => {
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
        },
        tenant_number: 0,
        payment_total: 0,
        is_paid: false,
        payment_date: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addRoom(values)
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Thêm phòng mới</h1>
                {/* Room	Tenant Lead	Phone	Start date	End date	Room rate	Deposit	Total	Action */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="room">Số phòng:</label>
                        <input type="text" name="room" className="form-control" placeholder="nhập số phòng"
                            onChange={e => setValues({ ...values, room: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tenantName">Tên trưởng phòng:</label>
                        <input type="text" name="tenantName" className="form-control" placeholder="nhập tên trưởng phòng"
                            onChange={e => setValues((prevState) => ({
                                ...prevState,
                                tenant_lead: {
                                    ...prevState.tenant_lead,
                                    name: e.target.value
                                },
                            }))} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phone">Điện thoại:</label>
                        <input type="text" name="phone" className="form-control" placeholder="ex: 03856510xx"
                            onChange={e => setValues((prevState) => ({
                                ...prevState,
                                tenant_lead: {
                                    ...prevState.tenant_lead,
                                    phone: e.target.value
                                },
                            }))} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tenantNumber">Số người thuê:</label>
                        <input type="number" name="tenantNumber" className="form-control" placeholder="nhập số người thuê"
                            onChange={e => setValues({ ...values, tenant_number: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="startDate">Ngày bắt đầu:</label>
                        <input type="date" name="startDate" className="form-control" placeholder="Ex: 2023/9/1"
                            onChange={e => setValues({ ...values, rent_from: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="endDate">Ngày kết thúc:</label>
                        <input type="date" name="endDate" className="form-control" placeholder="Ex: 2024/9/1"
                            onChange={e => setValues({ ...values, rent_to: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="roomRate">Giá phòng:</label>
                        <input type="number" name="roomRate" className="form-control" placeholder="nhập giá phòng"
                            onChange={e => setValues({ ...values, room_rate: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="deposit">Tiền cọc:</label>
                        <input type="number" name="deposit" className="form-control" placeholder="nhập số tiền cọc"
                            onChange={e => setValues({ ...values, deposit: e.target.value })} />
                    </div>
                    <button className="btn btn-success">Thêm phòng</button>
                    <Link to="/" className="btn btn-primary ms-3">Quay lại</Link>
                </form>
            </div>
        </div>
    )
}

export default Edit