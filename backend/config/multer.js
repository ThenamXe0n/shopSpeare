const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.fieldname);
    let dir;
    if (file.fieldname === "productImage") {
      dir = "upload/product";
    } else if (file.fieldname === "userImage") {
      dir = "upload/user";
    } else {
      dir = "upload/others";
    }

    
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // console.log("file", file);
    let filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
