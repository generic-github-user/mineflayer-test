// Import modules
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

// Create bot
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

// Vector distance
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

// Alias
const mr = Math.round;

// Supplementary Vec3 vector rounding function
function round(v) {
	return new vec3(mr(v.x), mr(v.y), mr(v.z));
}

bot.once('login', function() {
	bot.chat('Bot online.');
	bot.on('chat', (messagerName, message, translate, jsonMsg, matches) => {
		// Check that message was not sent by bot
		if (messagerName != username) {
			// Split message into words
			var split = message.split(' ');
			// Check for command directed at bot
			if (split[0] == 'bot') {
				// Sphere generation algorithm
				if (split[1] == 'sphere') {
					// Get position of bot
					var pos = bot.entity.position;
					
					// Radius
					var r = parseFloat(split[2]) || 10;
					// Thickness
					var t = parseFloat(split[3]) || 1;
					// Material
					var m = split[4] || 'stained_glass 5';
					
					// Loop through all blocks in cube area around the bot
					for (var i = -r; i < r; i++) {
						for (var j = -r; j < r; j++) {
							for (var w = -r; w < r; w++) {
								// Get coordinates of block to check
								var offset = pos.offset(i, j, w)
								var o = offset;
								var dist = distance(pos, offset)
								// Replace block if it is:
								//  - Within range (r)
								//  - Outside of inner range (radius - thickness)
								//  - Air
								if (dist <= r && dist > r - t && bot.blockAt(offset).name == 'air') {
									// Use setblock command to replace block at given coordinates with given material
									setBlock(o.x, o.y, o.z, m);
								}
							}
						}
					}
					
					var completionMessage = 'Sphere made of ['+m+'] generated at '+pos+' with a radius of '+r+' and thickness of '+t+'.';
					bot.chat(completionMessage);
					console.log(completionMessage);
				}
				// Execute command through chat as the bot
				else if (split[1] == 'cmd') {
					// Get command from chat
					var command = split.slice(2).join(' ');
					// Run command
					runCommand(command);
					// Log to chat on command completion (TODO: error handling)
					bot.chat('Command /' + command + ' executed on behalf of player ' + messagerName);
				}
				// Disconnect from server and end program command (bot leave, bot quit, bot end)
				else if (split[1] == 'leave' || split[1] == 'quit' || split[1] == 'end') {
					// Log messages
					bot.chat('Bye!');
					console.log('Disconnecting from server');
					// Disconnect
					bot.quit('User-initiated disconnect');
					// Stop program
					process.exit();
				} else if (split[1] == 'var') {
					// console.log(split[2]);
					// var b = split[2];
					// console.log(global['port']);
					// console.log(global[b]);
					// var f = global[b];
					// console.log(Object.keys(global))
					// console.log(global)
					// console.log(this)
					// console.log(this[b]);
					// bot.chat(f);
					// bot.chat(global[split[2]] || undefined);
					// bot.chat(b)
					bot.chat('This has not been implemented yet.');
				}
			} 
		}
	});
});

// Error logging

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