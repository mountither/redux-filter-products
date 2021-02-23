<<<<<<< HEAD
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: {
        type: Number
    },
    category:{
        type: Number
    },
    brand: {
        type: Number
    },
    name: {
        type: String,
    },
    hold: {
        type: Number,
        default: 1
    },
    finish: {
        type: Number,
        default: 1
    },
    hair: {
        type: Number
    },
    fragrance: {
        type: String
    }
    ,
    description: {
        type: String
    },
    image: {
        type: String
    }, 
    webp_image: {
        type: String
    }

});


module.exports = productSchema;
=======
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: {
        type: Number
    },
    category:{
        type: Number
    },
    brand: {
        type: Number
    },
    name: {
        type: String,
    },
    hold: {
        type: Number,
        default: 1
    },
    finish: {
        type: Number,
        default: 1
    },
    hair: {
        type: Array,
        default: []
    },
    fragrance: {
        type: String
    }
    ,
    description: {
        type: String
    },
    image: {
        type: String
    }, 
    webp_image: {
        type: String
    }

});


module.exports = productSchema;
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
