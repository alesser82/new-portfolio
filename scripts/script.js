// function check(params) {
    
// }

function initLoader() {
    $("#loader").addClass("d-flex");
    $("#loader").removeClass("d-none");
    $("#loader").css('opacity', '100%');
}

function loaderDestroy() {
    $('#loader').animate({
        opacity: 0
    }, 500, () => {
        $('#loader').addClass('d-none');
        $('#loader').removeClass('d-flex');
    });
}

function nonActiveSection() {
    $.each($('section'), (key, val) => {
        $('section').eq(key).addClass('d-none');
    });
}

function pageHandler() {

    nonActiveSection();

    let url = window.location.href,
        splitUrl = url.split('#'),
        allSection = $('section'),
        section = splitUrl[1];

    $.each($('section'), (key, val) => {
        if ($('section').eq(key).attr('id') == section) {
            $('section').eq(key).removeClass('d-none');
        }
    });

    let sectionHide = $('section.d-none');

    if (sectionHide.length == allSection.length) {
        $('section').eq(0).removeClass('d-none');
    }

}

function initPage() {
    pageHandler();
    loaderDestroy();
    setTimeout(() => {
        $('body').addClass('active');
    }, 500);

    let url = document.location.href.replace('#', '');

    url = url.replace(/.$/,"")
    // window.history.forward(url);
    // location.replace(url);

    // console.log(url);
}

function initRouter() {
    let routes = {},
        defaultRoute = 'home';

    routes['home'] = {
        url: '#/',
        templateUrl: './home.html'
    };

    routes['portfolio'] = {
        url: '#/portfolio',
        templateUrl: './portfolio.html'
    };

    routes['certificate'] = {
        url: '#/certificate',
        templateUrl: './certificate.html'
    };

    routes['contact'] = {
        url: '#/contact',
        templateUrl: './contact.html'
    };

    $.router.setData(routes).setDefault(defaultRoute);

    $.when($.ready).then(function () {
        $.router.run('main', 'home');
    });
}

$(document).ready(() => {

    initRouter();

    $('#menu a').click(function () {
        $("#menuToggle").toggleClass("active");
        initLoader();

        setTimeout(() => {
            initPage();
        }, 100)
    });

    $('#menuToggle input').click(() => {
        $('#menuToggle').toggleClass('active')
    });

    $.router.onViewChange(function (e, viewRoute, route, params) {
        initPage()
    });


});