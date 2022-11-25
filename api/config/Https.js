import fs from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
   key: fs.readFileSync(join(__dirname, '..', 'certs', 'key.pem')),
   cert: fs.readFileSync(join(__dirname, '..', 'certs', 'cert.pem')),
};
