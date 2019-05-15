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

const mr = Math.round;

function round(v) {
	return new vec3(mr(v.x), mr(v.y), mr(v.z));
}

bot.once('login', function() {
	bot.chat('Bot online.');
	bot.on('chat', (messagerName, message, translate, jsonMsg, matches) => {
		if (messagerName != username) {
			var split = message.split(' ');
			if (split[0] == 'bot') {
				if (split[1] == 'sphere') {
					var pos = bot.entity.position;
					
					var r = parseFloat(split[2]) || 10;
					var t = parseFloat(split[3]) || 1;
					var m = split[4] || 'stained_glass 5';
					
					for (var i = -r; i < r; i++) {
						for (var j = -r; j < r; j++) {
							for (var w = -r; w < r; w++) {
								var offset = pos.offset(i, j, w)
								var o = offset;
								var dist = distance(pos, offset)
								if (dist < r && dist > r - t && bot.blockAt(offset).name == 'air') {
									setBlock(o.x, o.y, o.z, m);
								}
							}
						}
					}
					
					var completionMessage = 'Sphere made of ['+m+'] generated at '+pos+' with a radius of '+r+' and thickness of '+t+'.';
					bot.chat(completionMessage);
					console.log(completionMessage);
				} else if (split[1] == 'cmd') {
					var command = split.slice(2).join(' ');
					runCommand(command);
					bot.chat('Command /' + command + ' executed on behalf of player ' + username);
				} else if (split[1] == 'leave' || split[1] == 'quit' || split[1] == 'end') {
					bot.chat('Bye!');
					console.log('Disconnecting from server');
					process.exit();
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