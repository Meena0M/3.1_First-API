const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require('./models/productmodel'); // Changed variable name from 'Product' to 'ProductModel'
const app = express();

app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('Hello running api');
});

app.get('/test', (req, res) => {
    res.send('Hello running blog changed');
});

app.get('/products', async (req, res) => {
    try {
        const products = await ProductModel.find({}); // Changed variable name from 'Product' to 'ProductModel'
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id); // Changed variable name from 'Product' to 'ProductModel'
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/product', async (req, res) => {
    try {
        const product = await ProductModel.create(req.body); // Changed variable name from 'Product' to 'ProductModel'
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndUpdate(id, req.body); // Changed variable name from 'Product' to 'ProductModel'
        if (!product) {
            return res.status(404).json({ message: `There's no product with ID ${id}` });
        }
        const updatedProduct = await ProductModel.findById(id); // Changed variable name from 'Product' to 'ProductModel'
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// deleting products
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndDelete(id); // Changed variable name from 'Product' to 'ProductModel'
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Establish a connection to MongoDB using Mongoose
mongoose.connect('mongodb+srv://root:wiztechie.com@tryapp.ob3r2jr.mongodb.net/Node-Api?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB ...'); // Added a comment to indicate the successful connection
        app.listen(5020, () => {
            console.log('API is running on port 5020');
        });
    })
    .catch((error) => {
        console.log(error);
    });
