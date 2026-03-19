export const baseUrl = 'http://localhost:3000';

const SummaryApi = {
    register: {
        url: '/user/register',
        method: 'post',
    },
    login: {
        url: '/user/login',
        method: 'post',
    },
    createAppointment: {
        url: '/client/create-appointment',
        method: 'post',
    },
    getAppointments: {
        url: '/client/my-appointments',
        method: 'get',
    },
}

export default SummaryApi;