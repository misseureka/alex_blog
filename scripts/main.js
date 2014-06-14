$(document).ready(function() {
    var tiles = [{
        id: 'about',
        size: 'medium',
        title: 'About me'
    }, {
        id: 'works',
        size: 'medium',
        title: 'Experience'
    }, {
        id: 'cmd',
        size: 'medium',
        title: 'Command'
    }, {
        id: 'blog',
        size: 'large',
        title: 'My blog'
    }, {
        id: 'cloud',
        size: 'small',
        title: 'Cloud of tags'
    }];
    tiles.forEach(function(el) {
        var newdiv = "<div class=\"box " + el.size +
            "\" id=\"" + el.id +
            "\"><p class=\"title\"><a class=\"title_link\" href=\"vk.com\">" + el.title +
            "</a></p></div>";
        $("#container").append(newdiv);
    });
});