import db from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { rows } = await db.query('SELECT * FROM "SetExersise"');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        const { id_workout_exersise, repetitions, weight, set_number } = req.body;
        try {
            const query = `
        INSERT INTO "SetExersise" 
        (id_workout_exersise, repetitions, weight, set_number)
        VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [id_workout_exersise, repetitions, weight, set_number];
            const { rows } = await db.query(query, values);
            res.status(201).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
