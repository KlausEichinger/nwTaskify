(function(){
	"use strict";

	function FileSystemService($q){
		var fs = require('fs');

		this.exportTasks = function(exportInfo){
			var d = $q.defer();

			fs.writeFile(exportInfo.path, JSON.stringify(exportInfo.tasks), function(err){
				if(err){
					d.reject(err);
				}else{
					d.resolve(true);
				}
			});

			return d.promise;
		};

		this.importTasks = function(fileName){
			var d = $q.defer();
			fs.readFile(fileName, function(err,data){
				if(err){
					d.reject(err);
				}else{
					d.resolve(JSON.parse(data));
				}
			});
			return d.promise;
		}
	}

	angular.module('nwTaskify').service('fileSystemService', FileSystemService);
})();