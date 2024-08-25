// Função para iniciar a live
document.getElementById('start-live-btn').addEventListener('click', function() {
    const liveVideo = document.getElementById('live-video');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(function(stream) {
            liveVideo.srcObject = stream;
            liveVideo.play();

            // Aqui você enviaria o stream para o servidor
            // Exemplo: enviar o stream para um servidor WebRTC ou RTMP
        })
        .catch(function(error) {
            alert("Erro ao acessar a câmera ou microfone: " + error.message);
        });
    } else {
        alert("Seu navegador não suporta streaming de vídeo.");
    }
});

// Função para postar vídeos
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

        // Aqui você faria o upload do vídeo para o servidor
        // Exemplo: Enviar o vídeo via AJAX para uma API backend
    } else {
        alert("Por favor, selecione um vídeo para postar.");
    }
});

// Função para postar comentários
document.getElementById('post-comment-btn').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input');
    const commentSection = document.getElementById('comment-section');

    if (commentInput.value.trim() !== "") {
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.innerText = commentInput.value.trim();
        commentSection.appendChild(comment);

        commentInput.value = "";

        // Aqui você enviaria o comentário para o servidor
        // Exemplo: Salvar o comentário em um banco de dados via API
    } else {
        alert("Por favor, escreva um comentário.");
    }
});
