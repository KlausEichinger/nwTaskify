(function(){
	"use strict";


	function TaskController($q, fileSystemService){
		var choosers = {
			import : "#fileImportTasks",
			export : "#fileExportTasks"
		};
		var gui = require('nw.gui');
		var vm = this;

		vm.allTasks = [];
		vm.newTask =  "";

		var chooseFile = function(selector){
			var d = $q.defer();
			var chooser = angular.element(selector)[0];
		
			chooser.onchange = function(event){
				var path = this.value;
				this.value = '';
				d.resolve(path);
			};
			chooser.click();
			return d.promise;
		};

		vm.export = function(){
			var onFileChoosen = function(path){
				return $q.when({
					path: path, 
					tasks: vm.allTasks
				});
			};
			chooseFile(choosers.export)
			.then(onFileChoosen)
			.then(fileSystemService.exportTasks);
		};

		 vm.import = function(){

			var onTasksLoaded = function(tasks){
				vm.allTasks = tasks;
			};
		 	chooseFile(choosers.import)
		 	.then(fileSystemService.importTasks)
		 	.then(onTasksLoaded);
		};

		vm.addTask = function(){
			if(vm.newTask !== ''){
				vm.allTasks.push({title: vm.newTask, isCompleted: false});
				vm.newTask = '';
			}	
		};

		vm.deleteTask = function(task){
			// room for improvement :)
			var index = null;
			for (var i = vm.allTasks.length - 1; i >= 0; i--) {
				if(vm.allTasks[i].title === task.title){
					index = i;
				}
			}
			if(index !== null) {
				vm.allTasks.splice(index, 1);
			}
		};

		vm.showRepo = function(){
			gui.Shell.openExternal('https://github.com/thotstenhans/nwTaskify');
		};

	}

	angular.module('nwTaskify').controller('taskController', TaskController);
})();