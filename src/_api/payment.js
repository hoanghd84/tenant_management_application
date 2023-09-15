import axiosInstance from "./config";

const addPayment = (payment) => {
    return axiosInstance.post('/payments', payment);
};

const updatePayment = (id, payment) => {
    return axiosInstance.put(`/payments/${id}`, payment);
}

const getPayments = () => {
    return axiosInstance.get('/payments?_sort=id&_order=asc');
}

export { addPayment, updatePayment, getPayments };