import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms, updateRoom } from "../../_api/room";
import { addPayment } from "../../_api/payment";

const Home = () => {
    const [data, setData] = useState([])
    const [statistic, setStatistic] = useState({
        sum: 0,
        remaining: 0
    })

    useEffect(() => {
        getRooms()
            .then(res => {
                let sum = 0;
                let remaining = 0;
                for (let i = 0; i < res.data.length; i++) {
                    sum = sum + res.data[i].payment_total;
                    if (!res.data[i].is_paid) {
                        remaining = remaining + res.data[i].payment_total;
                    }
                }
                setStatistic({ sum, remaining })
                setData(res.data)
            })

            .catch(err => console.log(err));
    }, [])

    const handleConfirmPayment = (dataRoom) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xác nhận thanh toán không?");
        if (confirm) {
            const dataPayment = {
                electric_index_start: dataRoom.electric.electric_index_start,
                electric_index_end: dataRoom.electric.electric_index_end,
                water_index_start: dataRoom.water.water_index_start,
                water_index_end: dataRoom.water.water_index_end,
                payment_electric: dataRoom.electric.payment_electric,
                payment_water: dataRoom.water.payment_water,
                payment_service: dataRoom.payment_service,
                payment_month: dataRoom.payment_month,
                is_paid: true,
                room_id: dataRoom.room_id,
                room: dataRoom.room,
                payment_total: dataRoom.payment_total
            }
            console.log(dataPayment)

            addPayment(dataPayment)
                .then(res => {
                    console.log('add payment succeeded')
                })
                .catch(err => console.log(err));

            const newDataRoom = {
                ...dataRoom,
                is_paid: true
            }
            updateRoom(dataRoom.id, newDataRoom)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    }
    console.log(data);

    // const handleDelete = (id) => {
    //     const confirm = window.confirm("Are you sure to delete this room?");
    //     if (confirm) {
    //         deleteRoom(id)
    //             .then(res => {
    //                 window.location.reload();
    //             })
    //             .catch(err => console.log(err));
    //     }
    // }



    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
            <div className="rounded p-4">
                <h1 className="text-center">Danh sách phòng</h1>
                <div>
                    <ul>
                        <li>Tổng tiền thu: {statistic.sum}</li>
                        <li>Chưa thanh toán: {statistic.remaining}</li>
                    </ul>
                </div>
                <div className="w-100 rounded bg-white border shadow p-4">
                    <div className="d-flex justify-content-end">
                        <Link to="/payment" className="btn btn-success me-2">Lịch sử thu tiền</Link>
                        <Link to="/create" className="btn btn-primary">Thêm phòng mới</Link></div>
                    <table className="table table-stipend">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Phòng</th>
                                <th>Trưởng phòng</th>
                                <th>Điện thoại</th>
                                <th>Số người</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Giá phòng</th>
                                <th>Tiền cọc</th>
                                <th>Tháng</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [...data].map((d, index) => (
                                    <tr key={index}>
                                        {/* <td>{d.id}</td> */}
                                        <td>{d.room}</td>
                                        <td>{d.tenant_lead.name}</td>
                                        <td>{d.tenant_lead.phone}</td>
                                        <td>{d.tenant_number}</td>
                                        <td>{d.rent_from}</td>
                                        <td>{d.rent_to}</td>
                                        <td>{d.room_rate}</td>
                                        <td>{d.deposit}</td>
                                        <td>{d.payment_month}</td>
                                        <td>{d.payment_total}</td>
                                        <td>{d.is_paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                        <td>
                                            <Link to={`/view/${d.id}`} className="btn btn-sm btn-info me-2">Xem</Link>
                                            <Link to={`/update/${d.id}`} className="btn btn-sm btn-primary me-2">Sửa</Link>
                                            {/* <button onClick={e => handleDelete(d.id)} className="btn btn-sm btn-danger me-2">Delete</button> */}
                                            {(!d.is_paid && d.payment_total === 0) || (d.is_paid && d.payment_total > 0) ? <Link to={`/calculate/${d.id}`} className="btn btn-sm btn-secondary me-2" >Tính tiền</Link>
                                                : <button className="btn btn-sm btn-success me-2" onClick={(e) => handleConfirmPayment(d)} > Xác nhận TT</button>}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Home