$(document).ready(function() {
    function Tile(id, title, gridNumber) {
        var _this = this;
        _this.id = id;
        _this.defGridNumber = gridNumber;
        _this.title = title;
        _this.gridNumber = ko.observable(gridNumber);
        _this.isSelected = ko.observable(false);

        _this.gridClass = ko.computed(function() {
            return 'grid_' + _this.gridNumber;
        });

        _this.toDefault = function() {
            _this.gridNumber = _this.defGridNumber;
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

        _this.tiles = ko.observableArray(inputTiles.map(function(e) {
            var currentNumber = _this.tilesSize[e.size];
            return new Tile(e.id, e.title, currentNumber);
        }));

        _this.currentWidth = -1;

        _this.tiles.forEach(function(element, index, array) {
            array[index].grid = currentNumber;
            _this.currentWidth += currentNumber;
            array[index].line = parseInt(_this.currentWidth / 12);
            array[index].active = false;
        });

        _this.reSize = function() {
            _this.tiles[3].active = true;
        };
    };

    ko.applyBindings(new ViewModel());
});