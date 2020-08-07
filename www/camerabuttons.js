
var exec = require('cordova/exec');

function CameraButtons() {
    CameraButtons.prototype.CameraButton = function(index, func, icon) {
        this.index = index;
        this.func = func;
        if(null === icon) { this.icon = func; }
        else { this.icon = icon; }
    };
    
    var buttons = [];
    CameraButtons.prototype.FUNCTION_SCAN = 1;
    CameraButtons.prototype.FUNCTION_CLOSE = 2;
    CameraButtons.prototype.FUNCTION_TORCH = 3;
    CameraButtons.prototype.FUNCTION_TOGGLE = 4;

    CameraButtons.prototype.addButton = function(btn) {
        buttons.push(btn);
    };

    CameraButtons.prototype.clear = function() {
        while(buttons.length) buttons.pop();
    }

    CameraButtons.prototype.Buttons = function() {
        return buttons;
    };
};
var camerabuttons = new CameraButtons();
module.exports = camerabuttons;
