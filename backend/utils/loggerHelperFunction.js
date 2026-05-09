const fs = require("fs");
function mylogger(req, res, next) {
  let log = `${new Date()} ${req.method} ${req.path} ${res.statusCode}`;

  if(req.method==="POST"){
    console.log("body added")
    log += ` \n ${JSON.stringify(req.body)}`
  }

  console.log(log)

  //   console.log(req);
//   console.log("current working dir ",);
  fs.appendFileSync(`${process.cwd()}/logs/logger.txt`, `\n ${log}`);

  next();
}

module.exports = mylogger;
