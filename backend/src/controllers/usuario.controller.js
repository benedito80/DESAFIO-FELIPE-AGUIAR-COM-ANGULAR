"use strict";
require("../models/Usuario");
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

//FUNÇÃO POST
exports.post = async(req, res, next) => {
    const bodyData = req.body;

    try {
        const data = {...bodyData };
        const newObject = await Usuario.create(data);

        //retornando e populando dados dos posts
        await newObject.populate("post").execPopulate();

        return res.status(200).json(newObject);
    } catch (e) {
        return res.status(400).json(e);
    }
};

//FUNÇÃO GET
exports.get = async(req, res, next) => {
    try {
        var data = await Usuario.find()
            .sort({ data: -1 }) //ordenando por data
            .populate("post"); // populando os posts

        return res.status(200).json(data);
    } catch (e) {
        return res.status(400).json(e);
    }
};

//FUNÇÃO getById
exports.getById = async(req, res, next) => {
    const { id } = req.params;

    try {
        var data = await Usuario.findById(id).populate("post");

        return res.status(200).json(data);
    } catch (e) {
        return res.status(400).json(e);
    }
};


//FUNÇÃO PUT
exports.put = async(req, res, next) => {
    const { id } = req.params;
    const bodyData = req.body;
    try {
        const updateUsuario = await Usuario.findByIdAndUpdate(
            id,
            bodyData, {
                new: true,
            }
        );

        return res.status(200).json(updateUsuario);
    } catch (e) {
        return res.status(400).json(e);
    }
};

//FUNÇÃO DELETE
exports.delete = async(req, res, next) => {
    const { id } = req.params;

    try {
        const deleteUsuario = await Usuario.findByIdAndDelete(id);
        return res.status(200).json(deleteUsuario);
    } catch (e) {
        return res.status(400).json(e);
    }
};