export default function AuthenticationHeaderService() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 'authorization': 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}