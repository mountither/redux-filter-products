import React, {useState, useEffect} from "react";
import { Collapse, Spin, Button} from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import { Checkbox} from 'antd';
import { toggleFilter,browserChange,clearFilters} from '../actions';
import { Link} from 'react-router-dom'
import 'antd/dist/antd.dark.css'
import { LoadingOutlined } from '@ant-design/icons';
import {pageInit, limitInit} from '../initialisation'


const { Panel } = Collapse;

const FilterCollection = () =>{

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  
  const {outcome} = state
  const {isFetching, filters, data, meta} = outcome 

    //  using saga instead
    useEffect(() => {

    dispatch({type:"INIT_PRODUCTS"});

    window.onpopstate = (e) => {
      console.log('pop');
          if(e.state !== null){
            dispatch(browserChange(e.state.state))
          }
    }

    }, []);

  const onLoadMore = () => {
    
    // WATCHED AND MANIPULATED IN REDUX SAGA BEFORE REDUCER
    dispatch({type:'GET_PRODUCTS', 
      config: {
                  skip: meta.skip + meta.limit,
                  limit: limitInit,
                  page: meta.page + 1,
                  loadMore: true
                }
          });

  }
  
const handleChange = (value, field) => {
  
  dispatch(toggleFilter(value.id, field,
  value.active ? true : false,));

  dispatch({type:'GET_PRODUCTS', 
    config: {skip: 0, limit: limitInit, page: pageInit,}});

}


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const [activeParams, setActiveParams] = useState([]);
console.log('active params', activeParams);
useEffect(() => {

  setActiveParams(
    Object.keys(meta.params).filter(field =>
      meta.params[field].length > 0)
  )
}, [meta.params])


return (
       <>
        <Link to="/">Home</Link>

        <Button onClick={()=>dispatch(clearFilters())}>Clear All</Button>
        <Collapse

        >
        { filters &&
          filters.map((type, i)=> {
            
              return (
                      <Panel 
                        header={type.title}
                        className={activeParams.includes(type.field_name) ? 'highlight-border': ''}
                        // isActive={activeParams.includes(type.field_name) ? true : false}
                        key={type.field_name}
                        >

                        {type.input.map((value, i) => {
                        return (
                          <Checkbox
                            key={i}
                            onChange={() => handleChange(value, type.field_name)}
                            checked={value.active}>
                            {value.name}
                          </Checkbox>
                          )
                        })
                        }
                      </Panel>
            )
          })
        }
        </Collapse>

        <Spin indicator={antIcon} spinning={isFetching} delay={500} tip={"Fetching Products"}/>
            {!isFetching && meta.count > 0 && <div style={{position: 'absolute', margin: '0 auto', width: '50%'}}>Amount of products {meta.count}</div>}
            {meta.count === 0  && <div>No products to show</div>}
            { data &&
            data.map(
                (p,i) => { return (
                  
                    <div className="tiles-item" key={i}>
                        <div className="tiles-item-inner center-content">
                        <img 
                            // src={p.image}
                            alt={p.name}
                            style={{width: "300px", height:'300px',}}
                            />
                        <div className="products-item-content">
                        {p.name} <br/>
                        { p.fragrance ? <p className="text-xxs mt-16">
                        Smells Like: {p.fragrance}</p> : ''}
                        <p className="text-xs mt-4">{p.description}</p>
                        </div>
                        </div>
                    </div>
                        )
                    }
                )
            }
        {data && !data[meta.count - 1] && !isFetching && meta.count > 0 &&
          <div className="center-content mt-32"><button onClick={onLoadMore}>Load More</button></div>
        }   
      
      
</> 

    )
}

export default FilterCollection
