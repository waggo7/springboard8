"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Job = require("../models/Jobs");
const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");
const jobSearchSchema = require("../schemas/jobSearch.json");
const db = require("../db");
const Jobs = require("../models/Jobs");
const router = express.Router({ mergeParams: true });

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, jobNewSchema);
        if (!validator.valid) {
            const errors = validator.errors.mapp(err, function () {
                return err.stack
            })
            throw new BadRequestError(errors)
        }
        const job = await Jobs.create(req.body)
        return res.status(201).json({ Jobs })
    } catch (error) {
        return next(error)
    }
})

router.get("/", async function (req, res, next) {
    const reqQuery = req.query
    if (reqQuery.minSalary !== undefined)
        reqQuery.minSalary += reqQuery.minSalary;
    reqQuery.hasEquity = reqQuery.hasEquity === "true";
    try {
        const validator = jsonschema.validate(req.body, jobNewSchema);
        if (!validator.valid) {
            const errors = validator.errors.mapp(err, function () {
                return err.stack
            })
            throw new BadRequestError(errors)
        }
        const jobs = await Jobs.findAll(reqQuery)
        return res.json({ jobs })
    } catch (err) {
        return next(err);
    }
})
router.get('/id', async function (req, res, next) {
    try {
        const jobs = await Jobs.get(req.params.id)
        return res.json({ jobs })

    } catch (err) {
        return next(err);
    }
})

router.patch('/id', ensureAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, jobNewSchema);
        if (!validator.valid) {
            const errors = validator.errors.mapp(err, function () {
                return err.stack;
            })
            throw new BadRequestError(errors)
        }
        const jobs = await Jobs.update(req.params.id, req.body);
        return res.json({ jobs })
    } catch (err) {
        return next(err);
    }
})
router.delete('/', ensureAdmin, async function (req, res, next) {
    try {
        await Jobs.remove(req.params.id)
        return res.json({ deleted: + req.params.id })
    } catch (err) {
        return next(err);
    }
})
module.exports = router;