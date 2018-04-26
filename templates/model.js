var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schemaOptions = {
	timestamps: true,
	toJSON: {
		virtuals: true
	}
};


var {schemaName} = new Schema({fields},schemaOptions);

module.exports = mongoose.model('{modelName}', {schemaName});
