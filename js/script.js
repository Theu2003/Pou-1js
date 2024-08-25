document.getElementById('start-live-btn').addEventListener('click', function() {
    const liveVideo = document.getElementById('live-video');

    // Verificar se o navegador suporta a API de mídia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function(stream) {
            liveVideo.srcObject = stream;
            liveVideo.play();
        })
        .catch(function(error) {
            alert("Erro ao acessar a câmera ou microfone: " + error.message);
        });
    } else {
        alert("Seu navegador não suporta streaming de vídeo.");
    }
});

document.getElementById('upload-video-btn').addEventListener('click', function() {
    const videoInput = document.getElementById('video-input');
    const videoGallery = document.getElementById('video-gallery');

    if (videoInput.files.length > 0) {
        const videoFile = videoInput.files[0];
        const videoUrl = URL.createObjectURL(videoFile);

        const videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.controls = true;

        videoGallery.appendChild(videoElement);
    } else {
        alert("Por favor, selecione um vídeo para postar.");
    }
});
