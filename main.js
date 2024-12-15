function addUrl(event) {
    event.preventDefault();

    const input = document.getElementById('imageUrl');
    const url = input.value.trim();

    if (url) {
        let images = JSON.parse(localStorage.getItem('images') || '[]');
        images.push(url);

        localStorage.setItem('images', JSON.stringify(images));

        updateGallery();

        input.value = '';
    }
}

function deleteImage(urlToDelete) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images = images.filter(url => url !== urlToDelete);

    localStorage.setItem('images', JSON.stringify(images));

    updateGallery();
}

function updateGallery() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const gallery = document.querySelector('.gallery');

    gallery.innerHTML = '';

    images.forEach(url => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        col.classList.add("image-card");

        const img = document.createElement("img");
        img.src = url;
        img.alt = "Imagem";
        img.classList.add("img-fluid", "rounded");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("btn", "btn-danger", "mt-2", "deleteButton");
        deleteButton.onclick = () => deleteImage(url);

        col.appendChild(img);
        col.appendChild(deleteButton);
        gallery.appendChild(col);
    });

    if (images.length === 0) {
        const noImagesMessage = document.createElement("p");
        noImagesMessage.textContent = "Nenhuma imagem encontrada. Por favor insira uma URL no campo de envio acima.";
        noImagesMessage.classList.add("text-center", "mt-4");
        gallery.appendChild(noImagesMessage);
    }
}

document.addEventListener("DOMContentLoaded", updateGallery);

const form = document.getElementById('uploadForm');
form.addEventListener("submit", addUrl);
