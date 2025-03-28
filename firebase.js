 // Import Firebase Modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

  // Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBU_Q2F0zIMTrIyh5nXERtU3fEtlSX4SH0",
    authDomain: "mystical-slate-448113-c6.firebaseapp.com",
    projectId: "mystical-slate-448113-c6",
    storageBucket: "mystical-slate-448113-c6.firebasestorage.app",
    messagingSenderId: "681914071632",
    appId: "1:681914071632:web:35d31b8d1dafb51d51ef55",
    measurementId: "G-HQSH8R6RF9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  // Upload Video Function
  function uploadVideo() {
    const fileInput = document.getElementById("videoUpload");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a video to upload.");
      return;
    }

    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Show progress bar
    document.getElementById("uploadProgress").style.display = "block";

    // Monitor upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("progressBar").value = progress;
        document.getElementById("progressText").innerText = `${Math.round(progress)}%`;
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        displayUploadedVideo(downloadURL);
      }
    );
  }

  // Function to display uploaded video
  function displayUploadedVideo(url) {
    const videoContainer = document.getElementById("uploadedVideos");
    const videoElement = document.createElement("video");
    videoElement.src = url;
    videoElement.controls = true;
    videoElement.style.width = "100%";
    videoContainer.appendChild(videoElement);
  }
