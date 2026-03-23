const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const { protect } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().populate('seller', 'name email');
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('seller', 'name email');
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { name, type, breed, age, price, description, image } = req.body;
    const pet = new Pet({ name, type, breed, age, price, description, image, seller: req.user._id });
    const createdPet = await pet.save();
    res.status(201).json(createdPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
