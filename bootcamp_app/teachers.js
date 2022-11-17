
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


const query = `
SELECT cohorts.name AS cohort, teachers.name AS teacher
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name ILIKE '%${process.argv[2] || 'JUL02'}%'
LIMIT 8`;


console.log(query);
pool.query(
  query
)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.teacher} and was in the ${row.cohort} cohort`);
    });
    process.exit();
  });

console.log(process.argv);

