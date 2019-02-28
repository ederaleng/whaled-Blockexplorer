'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Witness = Schema({
    Witness:{
        type: String,
        require: [true, 'Witness is required']
    },
    Blocks:{
        type:Number,
        require: [true, 'Blocks is required']
    },
    Votes:{
        type:Number,
        require: [true, 'Votes is required']
    },
    Updateds:{
        type:Number,
        require:[true, 'Updateds is required']
    },
    WitnessProxy:{
        type:Number,
        require:[true, 'WitnessProxy is required']
    }
});

module.exports = mongoose.model('Witness', Witness);