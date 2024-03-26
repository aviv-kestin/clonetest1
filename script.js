document.addEventListener('DOMContentLoaded', function () {
    const imageContainer = document.querySelector('.image-container');
    const infoPanel = document.querySelector('.info-panel');
    const selectedImg = document.querySelector('.selected-img');
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const bodyText = document.querySelector('.body-text');
    const closeBtn = document.querySelector('.close-btn');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const columns = Array.from({ length: 4 }, () => document.createElement('div'));
            columns.forEach(col => {
                col.classList.add('column');
                imageContainer.appendChild(col);
            });

            data.forEach((item, index) => {
                const columnNumber = index % 4;
                const columnDiv = columns[columnNumber];
                const galleryImgWrapper = document.createElement('div');
                galleryImgWrapper.classList.add('gallery-img-wrapper');
                galleryImgWrapper.setAttribute('data-title', item.title);
                galleryImgWrapper.setAttribute('data-subtitle', item.subtitle);
                galleryImgWrapper.setAttribute('data-body', item.bodyText);
                columnDiv.appendChild(galleryImgWrapper);

                const img = document.createElement('img');
                img.src = item.imageUrl;
                img.alt = item.title;
                img.classList.add('gallery-img');
                galleryImgWrapper.appendChild(img);

                img.addEventListener('click', () => {
                    const prevSelected = document.querySelector('.selected-img');
                    if (prevSelected) {
                        prevSelected.classList.remove('selected-img');
                    }

                    img.classList.add('selected-img');

                    selectedImg.src = img.src;
                    title.textContent = img.parentElement.getAttribute('data-title');
                    subtitle.textContent = img.parentElement.getAttribute('data-subtitle');
                    bodyText.textContent = img.parentElement.getAttribute('data-body');

                    infoPanel.style.left = '0';
                    imageContainer.style.transform = 'translateX(50vw)';
                    imageContainer.style.width = '50vw';

                    document.querySelectorAll('.gallery-img').forEach(colImg => {
                        colImg.parentElement.style.width = '12.5vw';
                        colImg.classList.add('temp-class');
                    });
                });
            });
        });

    closeBtn.addEventListener('click', () => {
        infoPanel.style.left = '-50vw';

        document.querySelectorAll('.gallery-img').forEach(colImg => {
            colImg.parentElement.style.width = '25vw';
        });

        setTimeout(() => {
            imageContainer.style.transition = 'transform 1.97s ease, width 1.97s ease';
            imageContainer.style.transform = 'translateX(0)';
            imageContainer.style.width = '100vw';
        }, 0);
    });
});
