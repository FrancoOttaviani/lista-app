const mongoose = require('mongoose');

mongoose.connect('list-app-y2021.herokuapp.com', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(db => console.log('la base de datos esta conectada'))
    .catch(err => console.error('error', err));