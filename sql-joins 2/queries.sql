SELECT * FROM owners o FULL OUTER JOIN vehicles v ON o.id = v.owner_id
SELECT first_name, last_name, COUNT(owner_id) FROM owners o JOIN vehicles v ON o.id = v.owner_id ORDER BY count ASC
SELECT first_name, last_name, AVG(price) FROM owners o JOIN vehicles v ON o.id = v.owner_id WHERE v.price > 10000 ORDER BY count DESC
