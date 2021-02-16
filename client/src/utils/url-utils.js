
export function getFilterPath(filters) {
    const params = new URLSearchParams();
    filters.map(m =>{
        params.append(m.field, m.id)
    })

    // console.log('item path', params.toString())
    return params.toString();
}

// deleting and appending id/fields is the viable solution , since
// URLSearchParams takes only 'name'(field) to delete.
export function removeFilterInPath(filters) {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    // returns an array of ids from the inputted field
    const getFilterIDs = params.getAll(filters.field);
    // delete all queries with the inputted field name
    params.delete(filters.field);

    // append back all the ids with filter_name, except for the inputted

    getFilterIDs.map((id) => 
        {
            if(filters.id != id){
                console.log('appended:', id);
                params.append(filters.field, id);
            }
        }
    )

    return params.toString();


}
