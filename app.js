const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todosRouter = require('./routes/todos');

mongoose.connect("mongodb+srv://admintodo:arvin1234@cluster0.sglf8td.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
                //   mongodb+srv://admintodo:<db_password>@cluster0.sglf8td.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB : ", err);
    })

// body-parser- middleware
app.use(express.json());
app.use('/todos', todosRouter);

// define routes
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})