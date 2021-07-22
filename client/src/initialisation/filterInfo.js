export const filterInfo = [{
    id:1,
    title: 'Category',
    field_name: 'category',
    filter_triggered: false,
    input: [{
            id: 1,
            value:'hair_styling',
            name: 'Hair Styling',
            active: false
        },
        {
            id: 2,
            value:'beard',
            name: 'Beard',
            active: false
        }
    ]
}, {
    id:2,
    title: "Brand",
    field_name: "brand",
    filter_triggered: false,
    input: [{
            id: 1,
            value:'uppercut',
            name: 'Uppercut',
            active: false
        },
        {
            id: 2,
            value:'muk',
            name: 'Muk',
            active: false
        }
    ]
}, 
{
    id:3,
    title: 'Finish',
    field_name: 'finish',
    filter_triggered: false,
    input: [{
            id: 1,
            value:'matte',
            name: 'Natural Shine (Matte)',
            active: false
        },
        {
            id: 2,
            value:'low_shine',
            name: 'Low Shine',
            active: false
        },
        {
            id: 3,
            value:'med_shine',
            name: 'Medium Shine',
            active: false
        },
        {
            id: 4,
            value:'high_shine',
            name: 'High shine',
            active: false
        }
    ]
},
{
    id:4,
    title: 'Hold',
    field_name: 'hold',
    filter_triggered: false,
    input: [{
            id: 1,
            value:'flexible',
            name: 'Flexible',
            active: false
        },
        {
            id: 2,
            value:'light',
            name: 'Light',
            active: false
        },
        {
            id: 3,
            value:'medium',
            name: 'Medium',
            active: false
        },
        {
            id: 4,
            value:'firm',
            name: 'Firm',
            active: false
        },
        {
            id: 5,
            value:'strong',
            name: 'Strong',
            active: false
        },
        {
            id: 6,
            value:'heavy',
            name: 'Heavy',
            active: false
        }
    ]
},
{
    id: 5,
    title: "Hair Type",
    field_name: "hair",
    filter_triggered: false,
    input: [{
            id: 1,
            value:'short_length',
            name: 'Short length',
            active: false
        },
        {
            id: 2,
            value:'med_length',
            name: 'Medium length',
            active: false
        },
        {
            id: 3,
            value:'thin_fine',
            name: 'Thin/Fine',
            active: false
        },
        {
            id: 4,
            value:'wavy_curly',
            name: 'Wavy/Curly',
            active: false
        },
        {
            id: 5,
            value:'straight',
            name: 'Straight',
            active: false
        },
        {
            id: 6,
            value:'all_hair_type',
            name: 'All Hair types/length',
            active: false
        },
        {
            id: 7,
            value:'hard_to_control',
            name: 'Hard to control hair',
            active: false
        }
    ]
}
]

export const allParams ={}
filterInfo.map(filter => 
    allParams[filter.field_name] = []
);