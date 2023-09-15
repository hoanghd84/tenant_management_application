import axiosInstance from "./config";

const getRooms = () => {
    return axiosInstance.get('/rooms?_sort=room&_order=asc');
};

const getRoom = (id) => {
    return axiosInstance.get(`/rooms/${id}`);
};

const addRoom = (room) => {
    return axiosInstance.post('/rooms', room);
};

const updateRoom = (id, room) => {
    return axiosInstance.put(`/rooms/${id}`, room);
}

const deleteRoom = (id) => {
    return axiosInstance.delete('/rooms/' + id)
}



export { getRooms, getRoom, addRoom, updateRoom, deleteRoom };