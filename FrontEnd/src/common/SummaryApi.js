export const baseUrl = 'https://agenda-sable-xi.vercel.app';

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
    deleteAppointment: (id) => ({
        url: `/client/delete-appointment/${id}`,
        method: 'delete',
    }),
    updateAppointment: (id) => ({
        url: `/client/update-appointment/${id}`,
        method: 'put',
    }),
}

export default SummaryApi;