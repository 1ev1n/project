import db from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { rows } = await db.query('SELECT * FROM "UserExercise"');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        const { user_id, exersise_name, exersise_description } = req.body;
        try {
            const query = `
        INSERT INTO "UserExercise" (user_id, exersise_name, exersise_description)
        VALUES ($1, $2, $3) RETURNING *`;
            const values = [user_id, exersise_name, exersise_description];
            const { rows } = await db.query(query, values);
            res.status(201).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
