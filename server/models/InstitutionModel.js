const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstitutionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  price_range: {
    type: Number,
  },
  reviews: [
    {
      name: {
        type: String,
      },
      review: {
        type: String,
      },

      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Institution", InstitutionSchema);
