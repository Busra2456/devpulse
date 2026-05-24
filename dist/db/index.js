import { Pool } from "pg";
import config from "../config/index";
export const pool = new Pool({
    connectionString: config.connection_string
});
export const initDB = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users(
 id SERIAL PRIMARY KEY,
 name VARCHAR(40) NOT NULL,
 email VARCHAR(40) UNIQUE NOT NULL,
 password TEXT NOT NULL,
 role VARCHAR(20) CHECK (role IN ('contributor','maintainer')) DEFAULT 'contributor',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);
        await pool.query(`
      CREATE TABLE IF NOT EXISTS issues (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  type TEXT CHECK (type IN ('bug','feature_request')),
  status TEXT CHECK (status IN ('open','in_progress','resolved')) DEFAULT 'open',
  reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
`);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=index.js.map