// Import ENV
import * as dotenv from 'dotenv';
dotenv.config();

// Other imports
import { app } from './app';
import { API_PORT } from './config/app';

// Start the Server
app.listen(API_PORT, () => console.log(`Real Estate Hasura Actions API is listening on port ${API_PORT}!`));
