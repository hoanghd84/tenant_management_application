import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPayments} from "../../_api/payment";

const Payment = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getPayments()
            .then(res => {
                setData(res.data)
            })

            .catch(err => console.log(err));
    }, [])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
            <div className="rounded p-4">
                <h1 className="text-center">Lịch sử thu tiền</h1>
                <div className="w-100 rounded bg-white border shadow p-4">
                    <div className="d-flex justify-content-end"><Link to="/" className="btn btn-secondary">Quay lại</Link></div>
                    <table className="table table-stipend">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Phòng</th>
                                <th>Tháng</th>
                                <th>Số điện đầu</th>
                                <th>Số điện cuối</th>
                                <th>Số nước đầu</th>
                                <th>Số nước cuối</th>
                                <th>Tiền điện</th>
                                <th>Tiền nước</th>
                                <th>Tiền dịch vụ</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [...data].map((d, index) => (
                                    <tr key={index}>
                                        {/* <td>{d.id}</td> */}
                                        <td>{d.room}</td>
                                        <td>{d.payment_month}</td>
                                        <td>{d.electric_index_start}</td>
                                        <td>{d.electric_index_end}</td>
                                        <td>{d.water_index_start}</td>
                                        <td>{d.water_index_end}</td>
                                        <td>{d.payment_electric}</td>
                                        <td>{d.payment_water}</td>
                                        <td>{d.payment_service}</td>
                                        <td>{d.payment_total}</td>
                                        <td>{d.is_paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
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

export default Payment