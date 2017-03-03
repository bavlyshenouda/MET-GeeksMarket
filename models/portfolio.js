var mongoose = require('mongoose');
var Schema = mongoose.Schema;


  var PortfolioSchema = new Schema({
    username: { type: String, lowercase: true, required:true, unique:true},
    img: {type: String},
    works : [{flag:Number, url:String}]
  });


module.exports = mongoose.model('Portfolio', PortfolioSchema);
