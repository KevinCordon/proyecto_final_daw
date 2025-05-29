const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin123@cluster0.mrj1jiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((error) => console.error('Error de conexión a MongoDB:', error));