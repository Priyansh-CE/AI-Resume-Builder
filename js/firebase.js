const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "ai-resume-builder-7575c.firebaseapp.com",
  projectId: "ai-resume-builder-7575c",
  storageBucket: "ai-resume-builder-7575c.firebasestorage.app",
  messagingSenderId: "701138705545",
  appId: "1:701138705545:web:8cfac1243aca3943523a58",
  measurementId: "G-CXE7QLC8LQ"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
