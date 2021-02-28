export default function authHeader() {
    const data = JSON.parse(localStorage.getItem('user-data'));

    if(data && data.token) {
        return {Authorization: 'Bearer ' + data.token}
    } else {
        return {};
    }
}

