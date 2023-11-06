require('dotenv').config();

const { Client } = require('pg');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

const folderPath = __dirname + '/migrations';

async function main() {

   console.log("1. Deploy Migrations");
   console.log("2. Create Empty Migration");
   rl.question("Choose an option (1/2): ", async (choice) => {
      if (choice === "1") {
         const client = new Client({
            user: process.env.DATABASE_USER,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_DB,
            password: process.env.DATABASE_PASSWORD,
            port: +(process.env.DATABASE_PORT),
         });

         await client.connect();

         fs.readdir(folderPath, async (err, files) => {
            if (err) {
               console.error('Error reading folder:', err);
               return;
            }

            for (let index = 0; index < files.length; index++) {

               const sqlFilePath = path.join(folderPath, files[index]);
               const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

               (async () => {
                  try {
                     await client.query(sqlQuery);
                     console.log(files[index] + ': successfully migrated!');
                  } catch (error) {
                     console.error('Error:', error);
                  }
               })();
            }
         });
      } else if (choice === "2") {
         const fileName = `${new Date().getTime()}.sql`
         fs.writeFile(folderPath + '/' + fileName, '', (err) => {
            if (err) {
               console.error('Error creating the file:', err);
            } else {
               console.log(`${fileName} has been created as an empty file.`);
            }

            process.exit(1);
         });
      } else {
         process.exit(1);
      }
   });
}

main();
