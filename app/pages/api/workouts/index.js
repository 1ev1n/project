import { pool } from '../../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const query = 'SELECT * FROM "Workout"';
            const { rows } = await pool.query(query);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении тренировок' });
        }
    } else if (req.method === 'POST') {
        const { user_id, date, description, name_workout } = req.body;

        if (!user_id || !date || !name_workout) {
            return res.status(400).json({ error: 'Необходимы user_id, date и name_workout' });
        }

        try {
            const query = `
        INSERT INTO "Workout" (user_id, date, description, name_workout)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
            const values = [user_id, date, description, name_workout];
            const { rows } = await pool.query(query, values);
            res.status(201).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при создании тренировки' });
        }
    } else {
        res.status(405).json({ error: 'Метод не разрешен' });
    }
}
