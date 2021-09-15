

$(document).ready(function () {

    let currentImage;
    let fillColour = '#fff';
    let strokeColour = '#525252';


    const fillInput = $('#fill');
    const strokeInput = $('#stroke');
    const input = $('#file')


    input.change(function () {
        const currentFile = input.prop('files')[0];

        const reader = new FileReader();

        reader.onloadend = function () {
            $('.preview_old').empty();
            currentImage = reader.result;


            const svgImage = document.createElement("img");

            //svgImage.setAttribute('width', '512');
            svgImage.setAttribute('height', '512');

            svgImage.setAttribute('src', currentImage);
            svgImage.classList.add('contain-image')

            $('.preview_old').append(svgImage);



        };
        //reader.readAsText(file);
        //reader.readAsBinaryString(file); //as bit work with base64 for example upload to server
        reader.readAsDataURL(currentFile);
    })

    fillInput.change(function () {
        fillColour = fillInput.val();
    })

    strokeInput.change(function () {
        strokeColour = strokeInput.val();
    })


    $('.convert').click(function () {
        if (!currentImage) return;

        $('.preview_new').empty();

        const decoded = atob(currentImage.substring(26));

        const wrapper = document.createElement('div');
        wrapper.innerHTML = decoded;
        const newSVG = wrapper.querySelector('svg');

        const svgStyle = `rect, path, polygon, circle, ellipse, polyline, line {fill: ${fillColour} !important; stroke: ${strokeColour} !important; stroke-width: 1px!important; }`;
        const element = document.createElement('style');

        element.innerHTML = svgStyle;

        newSVG.setAttribute('height', '512');
        newSVG.insertBefore(element, newSVG.firstChild);

        $('.preview_new').append(newSVG);

    });

});
