let loadingInterval;

function loaderDestroy() {
    console.log(loadingInterval);
    clearInterval(loadingInterval);

    let point = $('#loader span');
    $.each(point, (key, value) => {
        point.eq(key).css('color', 'rgba(255, 255, 255, 1)');
    });

    $('#loader').animate({
        opacity: 0
    }, 500, () => {
        $('#loader').addClass('d-none');
    });
}

function loadingAnimation() {
    $('#loader').removeClass('d-none');
    let point = $('#loader span');

    $.each(point, (key, value) => {
        point
            .eq(key)
            .css('color', 'rgba(0, 0, 0, .9)');
    });

    $.each(point, (key, value) => {
        setTimeout(() => {
            point
                .eq(key)
                .css('color', 'rgba(255, 255, 255, 1)');
        }, 200 * (key + 1));
    });
}

function loadingInit () {
    loadingInterval = setInterval(() => {
        loadingAnimation();
    }, 1200);
}

function loadingHandler() {
    let interval = setInterval(() => {
        if (checkPoint()) {
            clearInterval(interval);
            loadingInit();
        }
    }, 300);
}

function checkPoint() {
    let point = $('#loader span');

    if (point.length === 3) {
        return true;
    }

    return false;
}

loadingHandler();