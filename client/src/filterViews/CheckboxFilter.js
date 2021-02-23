<<<<<<< HEAD
// import React, {useState} from 'react'
// import { Checkbox} from 'antd';
// import {useSelector, useDispatch} from 'react-redux'
// import { toggleFilter,removePath, updateURL, clearFilters, clearAllQuery} from '../actions';


// const CheckboxFilter = ({
//     list,
//     field,
//     handleFilters
// }) => {

//     const dispatch = useDispatch()
//     const state = useSelector(state => state)
//     console.log('state seen in checkFilt comp: ',state);
    
//     const handleChange = (value) => {

//         dispatch(toggleFilter(value.id, field))

//         if (!value.active){
//             // console.log('url updated');
//             dispatch(updateURL(value.id, field))
//         }else{
//             // console.log("path removed");
//             dispatch(removePath(value.id, field))
//         }
//         handleFilters(value.id)
//     }



//     return (
//         <>

//     {list.map((value, i) => {
//         return (
//         <React.Fragment key={i}>
//             <Checkbox.Group >
//             <Checkbox
//                 onChange={() => {handleChange(value, field)}}
//                 checked={value.active}
//                 >
//                 {value.name}
//             </Checkbox>
//             </Checkbox.Group>
//         </React.Fragment>
//         )
//         }
//         )
//     }
//         </>
//     )
// }


// export default CheckboxFilter;
=======
// import React, {useState} from 'react'
// import { Checkbox} from 'antd';
// import {useSelector, useDispatch} from 'react-redux'
// import { toggleFilter,removePath, updateURL, clearFilters, clearAllQuery} from '../actions';


// const CheckboxFilter = ({
//     list,
//     field,
//     handleFilters
// }) => {

//     const dispatch = useDispatch()
//     const state = useSelector(state => state)
//     console.log('state seen in checkFilt comp: ',state);
    
//     const handleChange = (value) => {

//         dispatch(toggleFilter(value.id, field))

//         if (!value.active){
//             // console.log('url updated');
//             dispatch(updateURL(value.id, field))
//         }else{
//             // console.log("path removed");
//             dispatch(removePath(value.id, field))
//         }
//         handleFilters(value.id)
//     }



//     return (
//         <>

//     {list.map((value, i) => {
//         return (
//         <React.Fragment key={i}>
//             <Checkbox.Group >
//             <Checkbox
//                 onChange={() => {handleChange(value, field)}}
//                 checked={value.active}
//                 >
//                 {value.name}
//             </Checkbox>
//             </Checkbox.Group>
//         </React.Fragment>
//         )
//         }
//         )
//     }
//         </>
//     )
// }


// export default CheckboxFilter;
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
