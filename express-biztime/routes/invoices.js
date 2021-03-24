const express = require("express");
const router = new express.Router();
const db = require("../db")
const ExpressError = require("../expressError")

router.get('/', async(req, res, next) => {
    try {
        const invoiceRoutes = await db.query(`SELECT * FROM invoices`)
        return res.json({ 'invoices': invoiceRoutes.rows });
    } catch (err) { return err.message }
})
router.get('/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        console.log(id);
        const result = await db.query(
            `SELECT invoices.id,
                    invoices.comp_code,
                    invoices.amt,
                    invoices.paid,
                    invoices.add_date,
                    invoices.paid_date,
                    companies.name, 
                    companies.description 
                FROM invoices
                    INNER JOIN companies on (invoices.comp_code=companies.code) WHERE id=$1`, [id])
        if (result.rowCount === 0) {
            throw new ExpressError(` does not match any recoRSds`, 404);
        }
        console.log(result.rows);
        const data = result.rows[0];
        const invoice = {
            id: data.id,
            company: {
                code: data.comp_code,
                name: data.name,
                description: data.description,
            },
            amt: data.amt,
            paid: data.paid,
            add_date: data.add_date,
            paid_data: data.paid_data,
        };
        return res.json({ 'invoices': invoice });
    } catch (err) {
        return next(err)
    }
});
router.post('/', async(req, res, next) => {
    try {
        let { comp_code, amt } = req.body;
        const result = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1,$2)
            RETURNING id, comp_code,amt,paid,add_date,paid_date`, [comp_code, amt])
        return res.json({ 'invoice': result.rows[0] })
    } catch (err) { return next(err) }
})
module.exports = router;