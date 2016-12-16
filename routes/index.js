var express = require('express');
var router = express.Router();

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://192.168.1.106');

var Cronjob = require('cron').CronJob;
var job, status;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fan', function(req, res, next) {
  res.render('fan', { title: 'rohLabs' });
});

router.post('/fan', function(req, res) {
	if (req.body.scheduler) {
		console.log(req.body.time, req.body.status);
		var time = req.body.time.split(':');
		var schedule = '00 '+ time[1]+ ' ' + time[0] + ' * * *';
		try {
    		job = new Cronjob(schedule, function() {
				client.publish('/eureka/devices/fan',req.body.status.replace(' ',''));
				console.log(req.body.status.replace(' ',''));
    	},
		null,
		false,
		'Asia/Kolkata');
		job.start();
		status = req.body.status;
		res.send({message: 'Alarm Scheduled!'});

		} catch(ex) {
    		console.log("cron pattern not valid", ex);
			res.send(ex);
		}



	} else {
		client.publish('/eureka/devices/fan',req.body.status);
		res.send();
	}

});





module.exports = router;
