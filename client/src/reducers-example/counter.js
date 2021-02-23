<<<<<<< HEAD
const counter = (state = 0, action ) => {

  switch(action.type){
      case "INCREASE":
          return state + 1;
      case "DECREASE":
          return state - 1;
      default:
          return 0;
    
   }
 
}

export default counter;
=======
const counter = (state = 0, action ) => {

  switch(action.type){
      case "INCREASE":
          return state + 1;
      case "DECREASE":
          return state - 1;
      default:
          return 0;
    
   }
 
}

export default counter;
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
