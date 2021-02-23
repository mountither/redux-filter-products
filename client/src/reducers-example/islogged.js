<<<<<<< HEAD
const logReducer = (state=false, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return !state;
        default:
            return false;
    }
}

=======
const logReducer = (state=false, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return !state;
        default:
            return false;
    }
}

>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
export default logReducer;