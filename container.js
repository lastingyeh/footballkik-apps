const dependable = require('dependable');
const path = require('path');

const container = dependable.container();

const simpleDependencies = [
	{ name: '_', module: 'lodash' },
	{ name: 'passport', module: 'passport' },
	{ name: 'formidable', module: 'formidable' },
	{ name: 'async', module: 'async' },
	{ name: 'Club', module: './models/club' },
	{ name: 'Users', module: './models/user' },
	{ name: 'Message', module: './models/message' },
	{ name: 'aws', module: './helpers/AWSUpload' },
	{ name: 'Group', module: './models/groupmessage' },
];

// load module
simpleDependencies.forEach(val => {
	container.register(val.name, function() {
		return require(val.module);
	});
});

// load controller & helpers
container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, '/helpers'));

container.register('container', function() {
	return container;
});

module.exports = container;
