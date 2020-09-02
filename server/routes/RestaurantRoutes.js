const express = require("express");
const router = express.Router();
const Institution = require("../models/InstitutionModel");
const paginatedResults = require("../middleware/PaginatedResults");

// Get all Institutions
router.get("/institutions", paginatedResults(Institution), async (req, res) => {
  try {
    const institutions = await Institution.find().sort({ date: -1 });
    console.log(res.paginatedResults);
    res.json(institutions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get a Institution
router.get("/institutions/:id", async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    res.json(institution);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// Create a Institution

router.post("/institutions", async (req, res) => {
  const { name, location, price_range, reviews } = req.body;

  try {
    const institution = new Institution({
      name: name,
      location: location,
      price_range: price_range,
    });
    const result = await institution.save();

    res.status(201).json({
      status: "succes",
      data: {
        institution: result,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update Institutions

router.put("/institutions/:id", async (req, res) => {
  const { name, location, price_range, reviews } = req.body;
  try {
    const institution = await Institution.findByIdAndUpdate(req.params.id, {
      name: name,
      location: location,
      price_range: price_range,
      reviews: {
        name: reviews.name,
        reviews: reviews.reviews,
        rating: reviews.rating,
      },
    });
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !institution) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({
      status: "succes",
      data: {
        retaurant: institution,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete Institution

router.delete("/institutions/:id", async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !institution) {
      return res.status(404).json({ msg: "Post not found" });
    }

    await institution.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

router.post("/institutions/:id/addReview", async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);

    const newReview = {
      name: req.body.name,
      review: req.body.review,
      rating: req.body.rating,
    };

    institution.reviews.unshift(newReview);
    await institution.save();

    res.json(institution.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
