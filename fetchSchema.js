var admin = require("firebase-admin");

var serviceAccount = require("../IMPORTANT-SECRET/donate-notwaste-firebase-adminsdk-i4wan-129222e599.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function getSchema() {
    const collections = await db.listCollections();
    const schema = {};

    for (const collection of collections) {
        const documents = await collection.listDocuments();
        schema[collection.id] = {};
    
        for (const doc of documents) {
            const docData = await doc.get();
            const data = docData.data();
            for (const [key, value] of Object.entries(data)) {
            schema[collection.id][key] = typeof value;
            }
        }
        }
    
        return schema;
    }
    
    getSchema().then(schema => {
        console.log(JSON.stringify(schema, null, 2));
    }).catch(error => {
        console.error("Error fetching schema:", error);
    });
