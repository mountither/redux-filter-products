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
