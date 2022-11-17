require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')


function registerRouts() {
    const registerRouter = express.Router();
    registerRouter.post('/login', (req, res) => {
        const username = req.body.username;
        const user = { name: username };
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        const accesToken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: '15s' });
        res.json({ accesToken, refreshToken })

    })

    registerRouter.post('/token', (req, res)=>{
        const refresh = req.body.token;
        if(!Boolean(refresh)) return res.sendStatus(401);

    })

    return registerRouter
}

module.exports = registerRouts;
