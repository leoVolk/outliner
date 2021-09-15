

$(document).ready(function () {

    let currentImage;
    let fillColour = '#fff';
    let strokeColour = '#525252';

    $('.currentyear').html(new Date().getFullYear())


    $('#file').change(() => {
        const currentFile = $('#file').prop('files')[0];
        const reader = new FileReader();


        reader.onloadend = function () {
            $('.preview_old').empty();
            $('.preview_new').empty();
            currentImage = reader.result;

            const svgImage = document.createElement("img");

            //svgImage.setAttribute('width', '512');
            //svgImage.setAttribute('height', '512');

            svgImage.setAttribute('src', currentImage);
            svgImage.classList.add('contain-image')

            $('.preview_old').append(svgImage);



        };
        //reader.readAsText(file);
        //reader.readAsBinaryString(file); //as bit work with base64 for example upload to server
        reader.readAsDataURL(currentFile);
    })

    $('#fill').change(() => {
        fillColour = $('#fill').val();
    })

    $('#stroke').change(() => {
        strokeColour = $('#stroke').val();
    })

    $('.clear').click(() => {
        clearImages();
    })

    $('.download').click(() => {
        if (!currentImage) return;
        const svg = document.querySelector('.preview_new').firstElementChild;
        svg.classList.remove('contain-image');

        var svgData = svg.outerHTML;
        var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");

        downloadLink.href = svgUrl;
        downloadLink.download = $('#file').prop('files')[0].name.replace('.svg', '_outlined.svg');
        downloadLink.click();
        clearImages();
    })

    $('.convert').click(() => {
        if (!currentImage) return;

        $('.preview_new').empty();

        const decoded = atob(currentImage.substring(26));

        const wrapper = document.createElement('div');
        wrapper.innerHTML = decoded;
        const newSVG = wrapper.querySelector('svg');

        const svgStyle = `rect, path, polygon, circle, ellipse, polyline, line {fill: ${fillColour} !important; stroke: ${strokeColour} !important; stroke-width: 1px!important; }`;
        const element = document.createElement('style');

        element.innerHTML = svgStyle;

        newSVG.classList.add('contain-image')
        newSVG.insertBefore(element, newSVG.firstChild);

        $('.preview_new').append(newSVG);

    });


    const clearImages = () => {
        $('.preview_old').empty();
        $('.preview_new').empty();
    }

});
