const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) =>{
	console.log(req.name);
	res.render('index');
};

exports.addStore =(req, res) =>{
	res.render('editStore', {title:'Add Store'});
};

exports.createStore = async (req, res) => {
	const store = await (new Store(req.body)).save();
	req.flash('success', `Successfully Created ${store.name}. Care to leave a review ?`);
	res.redirect(`/stores/${store.slug}`);
};

exports.getStores = async (req, res) => {
	/*Qurey the database for a list of stores*/
	const stores = await Store.find();
	res.render('stores', {title : 'Stores', stores : stores});
};

exports.editStore = async(req, res) => {
	/*1  find the store given in id*/
	const store = await Store.findOne({ _id : req.params.id});
	
	/*2 confirm they are the owner*/
	/*TODO*/
	/*Render out the edit from si the user can update*/
	res.render('editStore', {title:`Edit ${store.name}`, store : store});
};

exports.updateStore = async(req, res) =>{
	/*set location data to be a point*/
	req.body.location.type = 'Point';
	/*Find and update store*/
	const store = await Store.findOneAndUpdate({ _id:req.params.id}, req.body, {
		new:true, /*return new store instead of the old one*/
		runValidators : true/*force modal to run validator*/
	}).exec();
	req.flash('success', `successfully updated ${store.name}. <a href="/stores/${store.slug}"> view store -></a>`)
	/*Redirect then the store and tell its ok*/
	res.redirect(`/stores/${store._id}/edit`);
};