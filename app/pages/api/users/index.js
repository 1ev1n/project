import { pool } from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const query = 'SELECT * FROM "User"';
            const { rows } = await pool.query(query);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении пользователей' });
        }
    } else if (req.method === 'POST') {
        const { name_user, registration_date } = req.body;

        if (!name_user || !registration_date) {
            return res.status(400).json({ error: 'Необходимы name_user и registration_date' });
        }

        try {
            const query = `
        INSERT INTO "User" (name_user, registration_date)
        VALUES ($1, $2)
        RETURNING *;
      `;
            const values = [name_user, registration_date];
            const { rows } = await pool.query(query, values);
            res.status(201).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при создании пользователя' });
        }
    } else {
        res.status(405).json({ error: 'Метод не разрешен' });
    }
}
