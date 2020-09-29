const mongoose = require('mongoose');


// {
//     "name": "Winter Event",
//     "store": "GAPP",
//     "items": [
//         {
//             "itemId": 100,
//             "name": "T Shirt"
//         },
//         {
//             "itemId": 102,
//             "name": "Pants"
//         }
//     ]
// }

const ItemSchema = mongoose.Schema({
    itemId: Number,
    name: String
});

const EventSchema = mongoose.Schema({
    name: String,
    store: String,
    items: [ItemSchema]
});

const EventModel = mongoose.model('event', EventSchema);
module.exports = EventModel;