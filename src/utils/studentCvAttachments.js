const DB_NAME = 'cv-resume-student-attachments-v1';
const STORE_NAME = 'pdfs';
const MAX_FILE_SIZE = 15 * 1024 * 1024;

const openDatabase = () => new Promise((resolve, reject) => {
  if (!('indexedDB' in window)) {
    reject(new Error('IndexedDB is unavailable in this browser.'));
    return;
  }
  const request = indexedDB.open(DB_NAME, 1);
  request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME, { keyPath: 'id' });
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error || new Error('Could not open local attachment storage.'));
});

const transactionRequest = async (mode, action) => {
  const db = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, mode);
      const request = action(transaction.objectStore(STORE_NAME));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Local attachment storage failed.'));
      transaction.onabort = () => reject(transaction.error || new Error('Local attachment storage was interrupted.'));
    });
  } finally {
    db.close();
  }
};

export async function saveStudentPdf(file) {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Choose a PDF file.');
  }
  if (file.size > MAX_FILE_SIZE) throw new Error('Each PDF must be 15 MB or smaller.');
  const bytes = await file.arrayBuffer();
  const { PDFDocument } = await import('pdf-lib');
  const parsed = await PDFDocument.load(bytes, { ignoreEncryption: false });
  const record = { id: crypto.randomUUID(), name: file.name, size: file.size, pages: parsed.getPageCount(), blob: file };
  try {
    await transactionRequest('readwrite', (store) => store.put(record));
  } catch {
    throw new Error('Local attachment storage failed.');
  }
  return { id: record.id, name: record.name, size: record.size, pages: record.pages };
}

export async function getStudentPdf(id) {
  return transactionRequest('readonly', (store) => store.get(id));
}

export async function removeStudentAttachment(id) {
  return transactionRequest('readwrite', (store) => store.delete(id));
}
