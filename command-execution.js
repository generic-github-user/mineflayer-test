var mc = require('minecraft-protocol');
var mineflayer = require('mineflayer');
var vec3 = require('vec3');

const Block=require("prismarine-block")("1.12");
const Item=require("prismarine-item")("1.12");

var ips = [];
var listP = [];
var int = 0;
var tries = 0;
var number = 0;
var username = 'testbot';
var port = 0;

var bot = mineflayer.createBot({
	host: 'localhost',
	port: port,
	username: username
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

// function distance(x1, y1, z1, x2, y2, z2) {
	// return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2) + ((z2 - z1) ** 2));
// }

function distance({x: x1, y: y1, z: z1}, {x: x2, y: y2, z: z2}) {
	return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2) + ((z2 - z1) ** 2));
}

function runCommand(c) {
	// test this
	bot.chat((c[0] != '/' ? '/' : '') + c);
}

function setBlock(x, y, z, block) {
	runCommand('setblock ' + x + ' ' + y + ' ' + z + ' ' + block);
}

bot.once('login', function() {
	bot.chat('Bot online.');
	bot.on('chat', (messagerName, message, translate, jsonMsg, matches) => {
		if (messagerName != username) {
			var split = message.split(' ');
			if (split[0] == 'botcmd') {
				console.log(bot.entity.position)
				} else {
					var command = split.slice(1).join(' ');
					runCommand(command);
					bot.chat('Command /' + command + ' executed on behalf of player ' + username);
				}
			}
		} else if ()
	});
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