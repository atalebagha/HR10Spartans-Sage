var db = require('../config');
var mongoose = require('mongoose');
var User = require('./user');
var Org = require('./org');
var Task = require('./task');


db.projectsSchema.pre('init', function(next, data) {
  Project.populate(data, {
    path: 'tasks'
  }, function(err, project) {
    data = project;
    next();
  });
});

// db.projectsSchema.pre('remove', function(next, done) {
//   User.update({}, {$pull: {project_list: this._id}}, function (err, user){
//     if (err) {
//       console.log(err);
//     }
//   });

//   Org.update({}, {$pull: {projects: this._id}}, function (err, org){
//     if (err) {
//       console.log(err);
//     }
//   });

//   Task.find({project_id: this._id}, function (err, task){
//     if (err) {
//       console.log(err);
//     }
//     for (var i = 0; i < task.length; i++) {
//       if (task[i]) {
//         task[i].remove();
//       }
//     }
//   });
// });

var Project = mongoose.model('Project', db.projectsSchema);

var newProject = new Project({name: 'this project is awesome', description: 'totally'});
newProject.save();

module.exports = Project;
