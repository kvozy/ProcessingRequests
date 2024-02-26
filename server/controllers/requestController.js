const connection = require('../db')

class requestController {
    async getAll(req, res) {
        const userId = res.user.id;

        const sqlQuery = `
            SELECT
                t1.id,
                t1.unique_id,
                t2.prioriry_name AS prioriry,
                t1.date,
                t1.gadget_name,
                t3.malfunction_name AS malfunction_type,
                t1.gadget_info,
                t4.login AS client_id,
                t5.status_name AS status,
                t1.date_of_completion,
                t1.time_added,
                t1.comments,
                t1.addendum
            FROM
                commision t1
            JOIN
                priority t2 ON t1.prioriry = t2.id
            JOIN
                malfunction t3 ON t1.malfunction_type = t3.id
            JOIN
                user t4 ON t1.client_id = t4.id
            JOIN
                status t5 ON t1.status = t5.id
            WHERE
                t1.client_id = ?`;

        await connection.query(sqlQuery, [userId], (error, results, fields) => {
            if (error) {
                console.error('Ошибка выполнения запроса: ' + error.stack);
                res.status(500).json({ message: 'Ошибка сервера' });
                return;
            }

            res.json({ message: 'Успешно получены данные', results });
        });
    }
}

module.exports = new requestController()