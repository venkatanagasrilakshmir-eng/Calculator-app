const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let history = [];

app.post("/save-history",(req,res)=>{

    const { expression, result } = req.body;

    history.push({
        expression,
        result
    });

    res.json({
        message:"History Saved",
        history
    });

});

app.get("/history",(req,res)=>{

    res.json(history);

});

const PORT = 5000;

app.listen(PORT,()=>{

    console.log(`Server Running on http://localhost:${PORT}`);

});
