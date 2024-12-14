import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const db = async (query, params = []) => {
    const client = await pool.connect();
    try {
        const res = await client.query(query, params);
        return res.rows;
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    } finally {
        client.release();
    }
};
