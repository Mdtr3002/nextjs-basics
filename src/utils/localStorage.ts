export const getAuthenState = () => {
    const currentState = localStorage.getItem("isConnected");
    if(currentState) {
        return currentState
    } else {
        return false
    }
}