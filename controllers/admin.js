const path = require('path');
const fs = require('fs');
const util = require('util');

const readdirAsync = util.promisify(fs.readdir);

module.exports = function(formidable, Club, aws) {
	return {
		setRouting: function(router) {
			router.get('/dashboard', this.adminPage);
			// any-type upload
			router.post('/uploadFile', aws.Upload.any(), this.uploadFile);
			router.post('/dashboard', this.adminPostPage);
		},
		adminPage: function(req, res) {
			res.render('admin/dashboard');
		},
		 
        adminPostPage: function(req, res){
			const newClub = new Club();
			
            newClub.name = req.body.club;
            newClub.country = req.body.country;
			newClub.image = req.body.upload;
			
            newClub.save((err) => {
                res.render('admin/dashboard');
            })
        },
		// adminPostPage: async function(req, res) {
		// 	try {
		// 		const files = await readdirAsync(
		// 			path.join(__dirname, '../public/uploads/'),
		// 		);

		// 		const countries = ['Spain', 'Germany', 'England', 'Netherlands'];

		// 		const file = files[Math.floor(Math.random() * files.length)];

		// 		const newClub = new Club();
		// 		// newClub.name = req.body.club;
		// 		// newClub.country = req.body.country;
		// 		// newClub.image = req.body.upload;

		// 		newClub.country =
		// 			countries[Math.floor(Math.random() * countries.length)];
		// 		newClub.name = path
		// 			.basename(file, path.extname(file))
		// 			.replace(/^.{1}/, w => w.toUpperCase());
		// 		newClub.image = file;

		// 		const club = await newClub.save();

		// 		res.render('admin/dashboard');
		// 	} catch (error) {
		// 		console.log(error.message);
		// 	}
		// },
		uploadFile: function(req, res) {
			const form = new formidable.IncomingForm();

			// form.uploadDir = path.join(__dirname, '../public/uploads');

			form.on('file', (field, file) => {
				// change filename
				// fs.rename(file.path, path.join(form.uploadDir, file.name), err => {
				// 	if (err) {
				// 		throw err;
				// 	}
				// 	console.log('File rename successfully');
				// });
			});

			form.on('error', err => {
				console.log(err);
			});

			form.on('end', () => {
				console.log('File upload is successfully');
			});

			form.parse(req);
		},
	};
};
