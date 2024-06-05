const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single('profileImage');

// Controller function for handling profile image upload
exports.uploadProfileImage = (req, res) => {
    console.log(req)
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file', error: err });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // File info is in req.file
        const profileImage = {
            path: req.file.path,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
        };

        // Save the file info to the database or user profile here
        // This example just sends back the file info as a response
        res.status(200).json({
            message: 'Profile image uploaded successfully',
            file: profileImage,
        });
    });
};
