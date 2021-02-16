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
