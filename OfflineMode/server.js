const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// قاعدة بيانات وهمية لتخزين البيانات أثناء عدم الاتصال بالإنترنت
let offlineData = [];

// روت لتحميل البيانات
app.get('/data', (req, res) => {
  res.json(offlineData);
});

// روت لحفظ البيانات الجديدة
app.post('/data', (req, res) => {
  const newData = req.body;
  offlineData.push(newData);
  res.status(201).json({ message: 'Data saved locally' });
});

// روت للتزامن مع السيرفر عند الاتصال بالإنترنت
app.post('/sync', (req, res) => {
  const dataToSync = req.body;
  // هنا يمكن إرسال البيانات إلى قاعدة البيانات الفعلية عند الاتصال
  res.json({ message: 'Data synced successfully' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
