import express from "express";
const router = express.Router();
const controller = require('../../controllers/diet/DietController');

router.get('/', controller.findAll);

export = router;