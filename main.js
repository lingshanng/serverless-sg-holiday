const { handler } = require("./index")

handler().then(res => console.log(res.response))