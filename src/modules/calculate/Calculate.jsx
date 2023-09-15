import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRoom, updateRoom } from "../../_api/room";

const Calculate = () => {
    const { id } = useParams();
    const [values, setValues] = useState(null);

    const [payment, setPayment] = useState({
        electric_index_start: 0,
        electric_index_end: 0,
        water_index_start: 0,
        water_index_end: 0,
        payment_electric: 0,
        payment_water: 0,
        payment_service: 0,
        payment_month: '',
        is_paid: 'false',
        room_id: 0,
        room_number: 0
    });

    const [paymentTotal, setPaymentTotal] = useState(0);

    // const [electricIndexEnd, setElectricIndexEnd] = useState();
    // const [waterIndexStart, setwaterIndexStart] = useState();
    // const [waterIndexEnd, setwaterIndexEnd] = useState();
    // const [waterIndexEnd, setwaterIndexEnd] = useState();


    useEffect(() => {
        getRoom(id)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    const navigate = useNavigate();

    const handleCalculate = (e) => {
        e.preventDefault();
        const Total = ((parseInt(payment.electric_index_end) - parseInt(payment.electric_index_start)) * 3500 + (parseInt(payment.water_index_end) - parseInt(payment.water_index_start)) * 20000 + parseInt(values.tenant_number) * 120000 + parseInt(values.room_rate));
        setPaymentTotal(Total);
    }

    console.log(paymentTotal)

    const handleConfirmCalculation = (e) => {
        e.preventDefault();
        // const dataPayment = {
        //     ...payment,
        //     payment_electric: ((payment.electric_index_end - payment.electric_index_start) * 3500),
        //     payment_water: ((payment.water_index_end - payment.water_index_start) * 20000),
        //     payment_service: (values.tenant_number * 120000),
        //     room_id: values.id,
        //     room_number: values.room,
        //     payment_month: payment.payment_month
        // }

        // setPayment(dataPayment)

        // addPayment(dataPayment)
        //     .then(res => {
        //         console.log(res);
        //         navigate('/')
        //     })
        //     .catch(err => console.log(err));

        const newRoom = {
            ...values,
            payment_month: payment.payment_month,
            payment_total: paymentTotal,
            is_paid: false,
            electric: {
                electric_index_start: payment.electric_index_start,
                electric_index_end: payment.electric_index_end,
                payment_electric: ((payment.electric_index_end - payment.electric_index_start) * 3500)
            },
            water: {
                water_index_start: payment.water_index_start,
                water_index_end: payment.water_index_end,
                payment_water: ((payment.water_index_end - payment.water_index_start) * 20000)
            },
            payment_service: (values.tenant_number * 120000)
        }

        updateRoom(id, newRoom)
            .then(res => {
                console.log(res);
                navigate('/')
            })
            .catch(err => console.log(err));

        // const handleSubmit = (e) => {
        //     e.preventDefault();
        //     addRoom(values)
        //         .then(res => {
        //             console.log(res);
        //             navigate('/')
        //         })
        //         .catch(err => console.log(err));
        // }
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>{`Tính tiền phòng ${values?.room}`}</h1>
                <h3> {`Số người thuê: ${values?.tenant_number}`} </h3>

                {/* Room	Year	Month	Electric_start	Electric_end	Water_start	Water_end	Calculate_button */}
                <form>
                    <div className="mb-2">
                        <label htmlFor="month">Tháng </label>
                        <input type="month" name="month" className="form-control "
                            onChange={e => setPayment({ ...payment, payment_month: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="electric_index_start">Số điện đầu tháng</label>
                        <input type="number" name="electric_index_start" className="form-control "
                            onChange={e => setPayment({ ...payment, electric_index_start: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="electric_index_end">Số điện cuối tháng</label>
                        <input type="number" name="electric_index_end" className="form-control"
                            onChange={e => setPayment({ ...payment, electric_index_end: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="water_index_start">Số nước đầu tháng</label>
                        <input type="number" name="water_index_start" className="form-control"
                            onChange={e => setPayment({ ...payment, water_index_start: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="water_index_end">Số nước cuối tháng</label>
                        <input type="number" name="water_index_end" className="form-control"
                            onChange={e => setPayment({ ...payment, water_index_end: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="payment_total">Tổng tiền phòng </label>
                        <input type="number" name="payment_total" className="form-control" disabled value={paymentTotal}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleCalculate}>Tính tiền</button>
                    <button className="btn btn-success ms-3" onClick={handleConfirmCalculation}>Xác nhận tính tiền</button>

                    <Link to="/" className="btn btn-secondary ms-3">Quay lại</Link>
                </form>
            </div>
        </div>
    )
}

export default Calculate