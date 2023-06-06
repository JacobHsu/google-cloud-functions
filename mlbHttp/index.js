const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'mlb-db'; 

functions.http('mlbHttp', (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const fileName = `${year}${month}${day}.txt`;
  const fileContent = req.query.name || 'World'; 
  storage.bucket(bucketName).file(fileName).save(fileContent, (err) => {
    if (err) {
      console.error('寫入失敗：', err);
      res.status(500).send('寫入失敗');
      return;
    }
    console.log('資料已成功寫入檔案');
    res.send(`MLB: ${fileContent}!`);
  });
});


