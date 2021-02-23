export default function authHeader() {
    const data = localStorage.getItem('user-data');

    if(data && data.token) {
        return {Authorization: 'Bearer ' + data.token}
    } else {
        return {};
    }
}

