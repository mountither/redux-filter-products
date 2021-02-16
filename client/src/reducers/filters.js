import {filterInfo} from '../filters/productFilters'

const filters = (state = filterInfo, action) => {
  
  // const filt = state.filter(filtType => {return filtType.field_name === action.field})

  switch (action.type) {
    case 'TOGGLE_FILTER':
      return [...state.map((filter) =>{
        if(filter.field_name === action.payload.field){
          return {
            ...filter,
            data: filter.data.map((dataInput) => {
              if(dataInput.id === action.payload.id){
                return {
                  ...dataInput,
                  active: dataInput.active ? false : true,
                }
              }
              return dataInput
            }),
            filter_triggered: true
          }
        }
        return filter;
      },
      ),
    ]
    case 'CLEAR_FILTERS':

      return [...state.map((filter) =>{
          return {
              ...filter,
              data: filter.data.map((dataInput) => {
                  return {
                    ...dataInput,
                    active: false
                  }
                }
              )}
          })
        ]
    default:
      return state
  }
};


export default filters;