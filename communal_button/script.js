import { Pool, Client } from './serverless.mjs';

const pool = new Pool({
    connectionString:
    "postgres://public_user:mnPD0fAME5Wp@ep-solitary-boat-791311.eu-central-1.aws.neon.tech/neondb"
});

export async function sasha()
{
    let a = await pool.query(
        'SELECT inc()');
    let b = a.rows[0].inc
    console.log(b);
    document.getElementById("my_btn").innerHTML = b;
}

document.getElementById("my_btn").addEventListener("click", sasha)
