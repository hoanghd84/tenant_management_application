import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoom } from "../../_api/room";

const View = () => {
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
                <h1>Xem chi tiết phòng</h1>
                {/* Room	Tenant Lead	Phone	Start date	End date	Room rate	Deposit	Total */}
                <div className="mb-2">
                    <div>Phòng: {data.room}</div>
                </div>
                <div className="mb-2">
                    <div>Trưởng phòng: {data?.tenant_lead?.name}</div>
                </div>
                <div className="mb-2">
                    <div>Điện thoại: {data?.tenant_lead?.phone}</div>
                </div>
                <div className="mb-2">
                    <div>Số người: {data?.tenant_number}</div>
                </div>
                <div className="mb-2">
                    <div>Ngày bắt đầu: {data.rent_from}</div>
                </div>
                <div className="mb-2">
                    <div>Ngày kết thúc: {data.rent_to}</div>
                </div>
                <div className="mb-2">
                    <div>Tiền phòng: {data.room_rate}</div>
                </div>
                <div className="mb-2">
                    <div>Tiền cọc: {data.deposit}</div>
                </div>
                <div className="mb-2">
                    <div>Tổng tiền: {data.payment_total}</div>
                </div>
                <div className="mb-2">
                    <div>Trạng thái: {(data.is_paid > 0) ? "Đã thanh toán" : "Chưa thanh toán"}</div>
                </div>
                <Link to={`/update/${id}`} className="btn btn-primary mt-3">Sửa</Link>
                <Link to="/" className="btn btn-secondary ms-3 mt-3">Quay lại</Link>
            </div>
        </div>
    )
}

export default View