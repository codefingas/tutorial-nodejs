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
	},
	photo:String
});

storeSchema.pre('save', async function(next){
	if(!this.isModified('name')){
		next(); //skip it
		return; //stop this function from running
	}
	this.slug = slug(this.name);
	/*find other store that have a slug be the same*/
	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
	const storesWithSlug = await this.constructor.find({slug : slugRegEx});

	if(storesWithSlug.length){
		this.slug = `${this.slug}-${storesWithSlug.length +1}`;
	}
	next();
	//todo  make more resilient so slugs are unique
});

storeSchema.statics.getTagsList = function(){
	/*Class by / Group by / Sort by inverse*/
	return this.aggregate([
		{$unwind : '$tags'},
		{$group: { _id : '$tags', count : {$sum:1}}},
		{$sort : {count:-1}}
	]);
};

module.exports = mongoose.model('Store', storeSchema);