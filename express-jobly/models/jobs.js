"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Jobs{
    static async create(data) {
        const jobsResult = await db.query(`INSERT INTO jobs(title,salary, equity, co_handle) VALUES ($1,$2,$3,$4) RETURNING id, title, salary, equity, co_handle as "CompanyHandle"`[data.title, data.salary, data.equity, data.CompanyHandle,])
        let job = jobsResult.rows[0]
        return job;
    }
    static async findAll(minSalary, hasEquity, title) {
        const qsearch = `SELECT j.id, j.title, j.salary, j.quity, j.co_handle as "CompanyHandle" c.name as "Companyname" FROM jobs j LEFT JOIN companies AS c ON c.handle = j.co_handle`;
        let qvalue = [];
        let expressions = [];
        if (minSalary !== undefined) {
            qvalue.push(minSalary);
            expressions.push(`salary >= $${qvalues.length}`);
        }
        if (hasEquity) {
            expressions.push(`equity > 0`);
        }
        if (title !== undefined) {
            qvalue.push(`%${title}`);
            expressions.push(`title I LIKE $${qvalue.length}`);
        }
        if (expressions.length > 0) {
            qsearch += " WHERE " + expressions.join(" AND ");
        }
        qsearch += " ORDER BY title";
        const jobresult = await db.query(qsearch, qvalue);
        return jobresult.rows;
    }
    static async get(data) {
        const jobresult = await db.query(`SELECT id, salary, equity, title, co_handle AS "CompanyHandle" FROM jobs WHERE id = $1`, [data])
        const jobs = jobresult.rows[0];
        if (!jobs) {
            throw new NotFoundError(`No job: ${data}`)
        }
            return jobs
    }
    static async update(data, handle) {
        const { setCols, values } = sqlForPartialUpdate(data, {
            numEmployees: "num_employees",
            logoUrl: "logo_url",
        });
        { });
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                title, 
                                salary, 
                                equity,
                                company_handle AS "companyHandle"`;
        const result = await db.query(querySql, [...values, id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);

        return job;
    }
    static async remove(id) {
        const result = await db.query(
            `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`, [id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);
    }
}
module.exports = Jobs;