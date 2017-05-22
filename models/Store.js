const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;
const slug =require('slugs');


const storeSchema = new mongoose.Schema({
	name : {
		type : String,
		trim: true,
		required:'Please enter store name'
	},
	/*trim retire les espace devant et derriere l'element*/
	slug : String,
	description : {
		type : String,
		trim:true
	},
	tags: [String],
	created: {
		type : Date,
		default: Date.now
	},
	location : {
		type: {
			type : String,
			default:'Point'
		},
		coordinates : [{
			type : Number,
			required : 'You must supply coordinates'
		}],
		adress : {
			type : String,
			required : 'you must supply an adress'
		}
	}
});

storeSchema.pre('save', function(next){
	if(!this.isModified('name')){
		next(); //skip it
		return; //stop this function from running
	}
	this.slug = slug(this.name);
	next();
	//todo  make more resilient so slugs are : unique
});

module.exports = mongoose.model('Store', storeSchema);