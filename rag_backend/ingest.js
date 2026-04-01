require('dotenv').config();
const { ChromaClient } = require('chromadb');
const { krishnaData, chanakyaData, guruData } = require('./data');

const client = new ChromaClient();

async function initDB() {
  console.log('Connecting to ChromaDB...');
  
  try {
    // Delete existing collections for fresh start
    try { await client.deleteCollection({ name: 'krishna_collection' }); } catch (e) {}
    try { await client.deleteCollection({ name: 'chanakya_collection' }); } catch (e) {}
    try { await client.deleteCollection({ name: 'guru_collection' }); } catch (e) {}
    
    // Create collections
    const krishnaCollection = await client.createCollection({ name: 'krishna_collection' });
    const chanakyaCollection = await client.createCollection({ name: 'chanakya_collection' });
    const guruCollection = await client.createCollection({ name: 'guru_collection' });
    
    console.log('Ingesting Krishna data...');
    await krishnaCollection.add({
      ids: krishnaData.map((_, i) => `krishna_${i}`),
      documents: krishnaData,
      metadatas: krishnaData.map(() => ({ source: 'Bhagavad Gita' }))
    });

    console.log('Ingesting Chanakya data...');
    await chanakyaCollection.add({
      ids: chanakyaData.map((_, i) => `chanakya_${i}`),
      documents: chanakyaData,
      metadatas: chanakyaData.map(() => ({ source: 'Chanakya Neeti' }))
    });

    console.log('Ingesting Guru data...');
    await guruCollection.add({
      ids: guruData.map((_, i) => `guru_${i}`),
      documents: guruData,
      metadatas: guruData.map(() => ({ source: 'Ayurveda & IKS' }))
    });

    console.log('Data ingestion complete!');
  } catch (error) {
    console.error('Error during data ingestion:', error);
  }
}

initDB();
