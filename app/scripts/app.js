(function(){
	"use strict";
	
	angular.module('nwTaskify', [])
		.run(function($log){
			var gui = require('nw.gui');
            var mainWindow = gui.Window.get();
            
            if(process.platform == "darwin" ) {
				var nativeMenuBar = new gui.Menu({type: "menubar"});
                try {
                    nativeMenuBar.createMacBuiltin(mainWindow.title);
                    mainWindow.menu = nativeMenuBar;
                } catch (ex) {
                    $log.error('Error adding OSX default menu -' + ex.message);
                }
            }
		});
})();