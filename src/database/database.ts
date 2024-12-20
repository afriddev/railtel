import { neon } from "@neondatabase/serverless";


const clientQuery = neon(process.env.DATABASE_URL as never);
export default clientQuery;
