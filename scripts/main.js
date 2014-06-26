$(document).ready(function() {
    function Tile(root, id, title, gridNumber) {
        var _this = this;
        _this.id = id;
        _this.defGridNumber = gridNumber;
        _this.title = title;
        _this.gridNumber = ko.observable(gridNumber);
        _this.isSelected = ko.observable(false);
        _this.raw = 0;
        _this.root = root;

        _this.gridClass = ko.computed(function() {
            return 'grid_' + _this.gridNumber();
        });

        _this.classes = ko.computed(function() {
            if (!_this.isSelected()) {
                return _this.gridClass();
            } else {
                return _this.gridClass() + ' selected';
            }
        });

        _this.toDefault = function() {
            _this.gridNumber(_this.defGridNumber);
            _this.isSelected(false);
        };

        _this.onClick = function() {
            if (_this.isSelected()) {
                return;
            } else {
                _this.root.dropAllToDefault();
                _this.root.resize(_this);
                _this.isSelected(true);

            }
        };
    };

    function ViewModel() {
        var _this = this;

        _this.inputTiles = [{
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

        _this.tilesSize = {
            'small': 2,
            'medium': 4,
            'large': 10
        };

        _this.tiles = ko.observableArray(_this.inputTiles.map(function(e) {
            var currentNumber = _this.tilesSize[e.size];
            return new Tile(_this, e.id, e.title, currentNumber);
        }));

        var rawWidth = -1;

        for (var i = 0; i < _this.tiles().length; i++) {
            rawWidth += _this.tiles()[i].gridNumber();
            _this.tiles()[i].raw = parseInt(rawWidth / 12);
        };

        _this.dropAllToDefault = function() {
            for (var i = 0; i < _this.tiles().length; i++) {
                _this.tiles()[i].toDefault();
            };
        };

        _this.resize = function(element) {
            var nearby = _this.tiles().filter(function(e) {
                if (e.raw == element.raw) {
                    return e;
                }
            });
            for (var i = 0; i < nearby.length; i++) {
                if (nearby[i] == element) {
                    element.gridNumber(element.gridNumber() + nearby.length - 1);
                } else {
                    nearby[i].gridNumber(nearby[i].gridNumber() - 1);
                }
            };
        };
    };

    ko.applyBindings(new ViewModel());
});