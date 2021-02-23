import React, {useState} from 'react'
import { Checkbox} from 'antd';

const CheckboxFilter = ({
    list,
    handleFilters
}) => {


    const [Checked, setChecked] = useState([])

    const handleChecked = (id) =>{
        // console.log(Checked.indexOf(id) !== -1);
        return Checked.indexOf(id) !== -1;
    }

    const handleChange = (value) => {

        const currentIndex = Checked.indexOf(value);
        // const newChecked = [...Checked];

        // everytime the state of the checkbox is changed, 
        //if curr index returns -1, no match found in the checked state. Hence push it (new check). 
        // else uncheck it by removing from array.  
        if (currentIndex === -1) {
            // console.log('checked');
            Checked.push(value);
        } else {
            // console.log('unchecked');
            Checked.splice(currentIndex, 1);
        }

        // console.log(Checked);
        setChecked(Checked);
        handleFilters(Checked);
        
    }

    const resets= ()=>{
        setChecked([]);
        handleFilters([]); 
    }

    return (
        <>

    {list && list.map((categVal, i) => {
        return (
        <React.Fragment key={i}>
            <Checkbox
                onChange={() => {handleChange(categVal.id)}}
                checked={handleChecked(categVal.id)}>
                {categVal.name}
            </Checkbox>

        </React.Fragment>
        )
        }
        )
    }{Checked.length > 0 && <div className="reset-container"><a className="anchor-reset text-xxs" onClick={resets}>Clear</a></div>}
        </>
    )
}


export default CheckboxFilter;
