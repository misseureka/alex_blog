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
        id: 'terminal',
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

    var viewModel = [];
    var currentWidth = 0;
    var currentRaw = [];
    var currentNumber = 0;

    for (var i = 0; tiles[i]; i++) {
        var classname = "";
        var el = tiles[i];
        switch (el.size) {
            case 'small':
                {
                    classname = "grid_2"
                    currentWidth += 2;
                    currentNumber = 2;
                    break;
                }
            case 'medium':
                {
                    classname = "grid_4"
                    currentWidth += 4;
                    currentNumber = 4;
                    break;
                }
            case 'large':
                {
                    classname = "grid_10"
                    currentWidth += 10;
                    currentNumber = 10;
                    break;
                }
            default:
                break;
        };

        currentRaw.push({
            id: el.id,
            defclass: classname,
            number: currentNumber
        });

        if (currentWidth == 12) {
            currentWidth = 0;
            viewModel.push(currentRaw);
            currentRaw = [];
        }

        var newdiv = "<div class=\"unselected " + classname +
            "\" id=\"" + el.id +
            "\"><p class=\"title\"><a class=\"title_link\" href=\"vk.com\">" + el.title +
            "</a></p></div>";
        $("#container").append(newdiv);
    };

    var e = document.getElementById("terminal");
    client.run({
      parent: e,
      remote: "http://localhost:8080/"
    })

    $("#container div").click(function(e) {
        if ($(this).hasClass('selected')) {
            return;
        } else {
            if ($(".selected")) {
                viewModel.forEach(function(el) {
                    el.forEach(function(el) {
                        $("#" + el.id).attr('class', el.defclass);
                        $("#" + el.id).addClass('unselected');
                    });
                });
            }
            var idClicked = this.id;
            var nearBy = [];
            ex: for (var i = 0; i < viewModel.length; i++) {
                for (var j = 0; j < viewModel[i].length; j++) {
                    if (viewModel[i][j].id == idClicked) {
                        nearBy = viewModel[i];
                        break ex;
                    }
                };
            };
            resize(this, nearBy);
        }
    });
});

function resize(selected, nearBy) {
    nearBy.forEach(function(el) {

        if (el.id == selected.id) {
            $('#' + el.id).attr('class', 'grid_' + (el.number + nearBy.length - 1));
            $('#' + el.id).removeClass('unselected');
            $('#' + el.id).addClass('selected');
        } else {
            $('#' + el.id).attr('class', 'grid_' + (el.number - 1));
            $('#' + el.id).addClass('unselected');
        }
    });
};
