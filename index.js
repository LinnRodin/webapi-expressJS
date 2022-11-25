const port = process.env.PORT || 5000
const express = require ('express')
const app = express()

app.listen(port, () => console.log(`WebApi is running on http://localhost:${port}`))