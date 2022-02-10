const express = require("express");
const router = express.Router();
const usuario = require("../controllers/usuario.controller");

router.get("", usuario.get);
router.post("", usuario.post);
router.get("/:id", usuario.getById);
router.put("/:id", usuario.put);
router.delete("/:id", usuario.delete);

module.exports = router;
