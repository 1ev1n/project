import db from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { rows } = await db.query('SELECT * FROM "WorkoutExersise"');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        const { def_exersise_id, user_exersise_id, workout_id, number_of_sets } = req.body;
        try {
            const query = `
        INSERT INTO "WorkoutExersise" 
        (def_exersise_id, user_exersise_id, workout_id, number_of_sets)
        VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [def_exersise_id, user_exersise_id, workout_id, number_of_sets];
            const { rows } = await db.query(query, values);
            res.status(201).json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
