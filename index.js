var mineflayer = require('mineflayer');
var vec3 = require('vec3');

const Block=require("prismarine-block")("1.12");
const Item=require("prismarine-item")("1.12");

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

bot.once('login', function() {
	bot.creative.setInventorySlot(36, new Item(1, 1));
	var referenceBlock = bot.blockAt(bot.entity.position.offset(2, 0, 2));
	
	bot.on('move', () => {
		referenceBlock = bot.blockAt(bot.entity.position.offset(2, 0, 2));
		try {
			bot.placeBlock(referenceBlock, new vec3(0, 1, 0), (err) => {
				if (err) {
					bot.chat(err.message);
				}
			});
		} catch (error) {
			console.error(error);
		}
	});
	bot.setControlState('right', true);
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