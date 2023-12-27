const express = require("express");
const mongoose = require("mongoose");
const Product = require("./Models/ProductModel");

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello Node Api");
});
app.get('/product',async(req,res)=>{
    try {
        const newProducts = await Product.find({});
        res.status(200).json(newProducts)
    } catch (error) {
        res.status(500).json({ message: "Error showing product", error: error.message });
    }
})
app.put('/product/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
});

app.post('/product', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
});
app.delete('/product/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
});


mongoose.connect('mongodb+srv://DBuser:trust081@cluster0.vmh8ytp.mongodb.net/node-api', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.get('/blog', (req, res) => {
            res.send("Hello Node Apinn");
        });

        app.listen(3000, () => {
            console.log("Node API app is running on port 3000");
        });
    })
    .catch((error) => {
        console.error(error);
    });
