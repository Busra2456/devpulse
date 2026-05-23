const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    //   res.send('Hello World!')
    res.status(200).json({
        message: "Express Server",
        "author": "Next Level",
    });
});
export default app;
//# sourceMappingURL=app.js.map