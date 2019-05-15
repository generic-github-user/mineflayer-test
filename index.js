var mc = require('minecraft-protocol');
var mineflayer = require('mineflayer');
var vec3 = require('vec3');

var ips = [];
var listP = [];
var int = 0;
var tries = 0;
var number = 0;
var port = 0;

var bot = mineflayer.createBot({
	host: "localhost",
	port: port,
	username: 'testbot'
});

bot.on('connect', function() {
	console.info('connected');
	number++;
});

bot.once('spawn', function() {
setTimeout(function() {
	console.info('FIRE');
console.log(bot.players);
	bot.chat('/register 2222 2222');
}, 3100);
});

bot.once('login', function() {
});

bot.on('end', function() {
	console.info('disconnected ' + number);
	number--;
});

bot.on('kicked', function(reason) {
	console.info('kicked ' + number);
	number--;
});

bot.on('error', function(err) {
	console.log(err.stack);
});