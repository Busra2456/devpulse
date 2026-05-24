import { pool } from "../../db/index";
const createIssueIntoDB = async (payload, userId) => {
    const { title, description, type } = payload;
    const result = await pool.query(`INSERT INTO issues (title, description, type, reporter_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`, [title, description, type, Number(userId)]);
    if (result && result.rows && result.rows.length > 0) {
        return result.rows[0];
    }
    throw new Error('Failed to create issue into database');
};
const getAllIssuesFromDB = async (query) => {
    const { sort = "newest", type, status } = query;
    let sql = `SELECT * FROM issues`;
    const conditions = [];
    const values = [];
    if (type) {
        values.push(type);
        conditions.push(`type = $${values.length}`);
    }
    if (status) {
        values.push(status);
        conditions.push(`status = $${values.length}`);
    }
    if (conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(" AND ");
    }
    if (sort === "oldest") {
        sql += ` ORDER BY created_at ASC`;
    }
    else {
        sql += ` ORDER BY created_at DESC`;
    }
    const issuesResult = await pool.query(sql, values);
    const issues = issuesResult.rows;
    const formattedIssues = await Promise.all(issues.map(async (issue) => {
        const userResult = await pool.query(`
        SELECT id, name, role
        FROM users
        WHERE id = $1
        `, [issue.reporter_id]);
        const reporter = userResult.rows[0];
        return {
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            reporter: {
                id: reporter.id,
                name: reporter.name,
                role: reporter.role,
            },
            created_at: issue.created_at,
            updated_at: issue.updated_at,
        };
    }));
    return formattedIssues;
};
const getSingleIssueFromDB = async (id) => {
    const result = await pool.query(`SELECT * FROM issues WHERE id=$1`, [id]);
    return result.rows[0];
};
const updateIssueFromDB = async (id, payload) => {
    const { title, description, type, status } = payload;
    const result = await pool.query(`
    UPDATE issues
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      status = COALESCE($4, status),
      updated_at = NOW()
    WHERE id = $5
    RETURNING *
    `, [title, description, type, status, id]);
    return result.rows[0];
};
const deleteIssueFromDB = async (id) => {
    const result = await pool.query(`DELETE FROM issues WHERE id=$1 RETURNING *`, [id]);
    return result.rows[0];
};
const getReporterById = async (id) => {
    const result = await pool.query(`SELECT id, name, role FROM users WHERE id=$1`, [id]);
    return result.rows[0];
};
export const issuesService = {
    createIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    updateIssueFromDB,
    deleteIssueFromDB,
    getReporterById,
};
//# sourceMappingURL=issues.service.js.map