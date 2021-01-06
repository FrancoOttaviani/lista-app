const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://franco:q0AFNF3AlGU3usO6@cluster0.rn9zv.mongodb.net/mcga?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(db => console.log('la base de datos esta conectada'))
    .catch(err => console.error('error', err));