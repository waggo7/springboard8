const express = require("express");
const router = new express.Router();
const db = require("../db")
const ExpressError = require("../expressError")


router.get("/", async function(req, res, next) {
    try {
        const companyRoutes = await db.query(`SELECT code, name FROM companies`)
        return res.json({ 'companies': companyRoutes.rows })
    } catch (err) {
        return err.message;
    }
});
router.get("/:code", async function(req, res, next) {
    try {
        const { code } = req.params;
        const results = await db.query(`SELECT * FROM companies WHERE code=$1`, [code])

        if (results.rowCount == 0) {
            console.log('false');
            throw new ExpressError(`${code} invalid`, 404)
        } else {
            return res.json({ 'companies': results.rows })
        }
    } catch (e) {
        return next(e)
    }
});
router.post("/", async(req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const result = await db.query(`INSERT INTO companies (code,name,description) VALUES ($1,$2,$3) RETURNING code,name description`, [code, name, description])
        return res.json({ companies: result.rows[0] })
    } catch (err) {
        return next(err)
    }
});
router.put('/:code', async(req, res, next, err) => {
    try {
        const { code, name, description } = req.body;
        // const = req.params.code;
        const result = await db.query(`UPDATE companies SET code=$1,name=$2,description=$3`, [code, name, description])
        return res.json({ 'companies': result.rows[0] })
    } catch (err) {
        return next(err)
    }
});
router.delete('/:code', async(req, res, next, err) => {
    try {
        const result = db.query(`DELETE FROM companies WHERE code=$1`, [req.params.code])
        return result.rows;
    } catch (err) {
        return next(err)
    }
});
module.exports = router;