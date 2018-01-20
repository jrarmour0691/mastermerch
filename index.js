const Discord = require('discord.js');
const bot = new Discord.Client();
const YTDL = require('ytdl-core');
const api = require('rs-client');
const BotSettings = require('./botsettings.json');
const fs = require('fs');
bot.Caprest = require('./capreset.json');
bot.points = require('./pointsystem.json');
bot.events = require('./events.json');
bot.fifty = require('./50n50.json');
bot.limbo = require('./limbo.json');

bot.setInterval(() => {
	const Caprest = require('./capreset.json')
	let now = Date.now()
	let index = JSON.parse(fs.readFileSync("./capreset.json", "utf8"));
	let capreset = index.capreset
	let captime = (capreset)
	if(now > captime){
		let newtime = captime + 604800000
		bot.Capreset = 
				{
					capreset: captime + 604800000
				}
		fs.writeFile("./capreset.json", JSON.stringify(bot.Capreset, null, 4), err => {
			if(err) throw err;
								});
	}
}, 5000)

// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const UserId = member.guild.channels.get('name', 'member-log'); 
    // Do nothing if the channel wasn't found on this server
    if (!UserId) return;
    // Send the message, mentioning the member
    UserId.send(`Welcome to The Order of Power, ${member}`);
});
bot.commands = new Discord.Collection();


//when bot is ready send ready to the console
bot.on('ready', function () {
    console.log('ready');
});

//over looks messages for key words/prefix and does commands based on request
bot.on('message', function (message) {
    if (message.author.equals(bot.user)) return;

	//if someone says hello, the bot well reply 
    if (message.content == "hello") {
		message.delete();
		
		//let newmember = (message.member.guild.members.find('id', '166252840468086784'))
		//let clanmembername =(newmember.user.username)
		
				
		//get admin channels info
		//let admin = message.member.guild.channels.find('name','admin')
		//sends to the admin's channel
		//admin.send('hello')
    }

	//checks to see if massage starts with the prefix
    if (!message.content.startsWith(BotSettings.Prefix)) return;

	//where ever there is a space it brakes it up and puts it in to an array
    var args = message.content.substring(BotSettings.Prefix.length).split(' ');

    switch (args[0].toLocaleLowerCase()) {
       
        case 'hello':{
			if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
           //message.channel.sendMessage('I am sorry but there is no information that i can give you right now');

		   if(args[1].toLocaleLowerCase() == 'box'){
				var minran = 1
				var maxran = 512
	
				
				var rangeran = (maxran - minran) + 1;     
				var randomnumber = (Math.floor(Math.random() * rangeran) + minran);
		   
				if(randomnumber == 512) {
					var spin = "very rare";
					console.log(randomnumber)
					console.log(spin)
				};
				if(randomnumber == 128 || randomnumber == 129 || randomnumber == 130 || randomnumber == 131){
					var spin = "rare";
					console.log(randomnumber)
					console.log(spin)
				};
				if(randomnumber < 64){
					var spin = "UnCommon";
					console.log(randomnumber)
					console.log(spin)
				};
				if(randomnumber !== 512 && randomnumber !== 128 && randomnumber !== 129 && randomnumber !== 130 && randomnumber !== 131 && randomnumber > 64){
					var spin = "Common";
					console.log(randomnumber)
					console.log(spin)
				};     
			}
		break;}
		
		case 'gp':{
				//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
				let playerid2 = (message.author.id);
			let points2 = JSON.parse(fs.readFileSync("./pointsystem.json", "utf8"));
			//points saved on file
			let usergp1 = points2[playerid2] ? points2[playerid2].gp : 0;
			let playername2 = (message.author.username);
			
			message.channel.send(`${playername2} has ${usergp1}gp in clan bank account`)
		break;}
		
		case 'points':{
				//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
				let playerid1 = (message.author.id);
			let points1 = JSON.parse(fs.readFileSync("./pointsystem.json", "utf8"));
			//points saved on file
			let userPoints1 = points1[playerid1] ? points1[playerid1].points : 0;
			let playername1 = (message.author.username);
			
			message.channel.send(`${playername1} has ${userPoints1} clan loyalty points`)
		break;}
        
		case 'recruited':{
		//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
			if(message.channel.id !== '384157088307347466') {
				message.delete()
				message.author.send('Please only use this in the Point Request channel, Thank you');
				return;
			}
			let playerid = (message.author.id);
			let playername = (message.author.username);
			if((args[1]) == undefined) return message.channel.send('please put who you recruited')
			let clanplayer = args[1]
						//sync file 
			let points = JSON.parse(fs.readFileSync("./pointsystem.json", "utf8"));
			//points saved on file
			let userPoints = points[playerid] ? points[playerid].points : 0;
			let userTime = points[playerid] ? points[playerid].time : 0;
			var usergp = points[playerid] ? points[playerid].gp : 0;
			var totalcap = points[playerid] ? points[playerid].caps : 0;
			let RecruitBy = points[playerid] ? points[playerid].RecruitBy : 0;
			let RecruitByid = points[playerid] ? points[playerid].RecruitByid : 0;
			var recruits = points[playerid] ? points[playerid].recruited : 0;
			var joindate = points[playerid] ? points[playerid].joined : 0;
			let totalevents = points[playerid] ? points[playerid].totalevents : 0;
		
			//see if someone on the server is tagged in the message
			if(!args[1].includes('@')) return message.channel.send('please tag someone on the server');
			
			
			if(args[1].includes('!')){
				var clanplayerargs = message.content.substring('recruited').split('!');
				var clanplayersplit = clanplayerargs[1].split('>');
				var clanmemberid = clanplayersplit[0]
				var newmember = (message.member.guild.members.find('id', clanmemberid))
				var clanmembername =(newmember.user.username)
			}
			else{
				var clanplayerargs = message.content.substring('recruited').split('@');
				var clanplayersplit = clanplayerargs[1].split('>');
				var clanmemberid = clanplayersplit[0]
				var newmember = (message.member.guild.members.find('id', clanmemberid))
				var clanmembername =(newmember.user.username)
			}
			// Check if they are a member of the clan already
		if(newmember.roles.some(r=>["Owner", "Dep Owners", "Overseer", "Coordinator","Organiser","Admin", "General","Captain","Lieutenant","Sergeant","Corporal","Recruit"].includes(r.name)) ) {
		// if already a member of the clan then
		return message.channel.send('This person is already a member of our clan');
		} 
				
				
								bot.points[clanmemberid] = 
				{
					guild: message.guild.id,
					RecruitBy: playername,
					RecruitByid: playerid,
					username: clanmembername,
					time: 0,
					joined: Date.now(),
					points: 0,
					gp: 0,
					caps: 0,
					totalevents: 0,
					recruited: 0
				}
		
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;
			});	
			var recruitrole = message.guild.roles.find("name", "Recruit");
			newmember.addRole(recruitrole).catch(console.error);
			newmember.send('Congratz you are now a Recruit')			
			
					bot.points[playerid] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy,
					RecruitByid: RecruitByid,
					username: playername,
					time: userTime,
					joined: joindate,
					points: (userPoints + 25),
					gp: usergp,
					caps: totalcap,
					totalevents: totalevents,
					recruited: recruits + 1
				}
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;
								});					
			message.channel.send(`Congrats ${playername} has recruited ${clanplayer} and received 25 clan loyalty points`)

        break;}

        case 'help':{
            var help = new Discord.RichEmbed()
                .setTitle('All applications that I can do are listed below')
                .addField('GP -', 'gives you the current gp of your clan bank account')
                .addField('Points -', 'Gives you the amount of Clan Loyalty Points you have earned')
                .addField('Cap -', 'Earns between 50 to 250 clan loyalty points for capping at the Clan Cidetal')
				.addField('Start -', 'Organiser or Higher rank can start events that other clan members can go to; gets 15 Clan Loyalty Points for Hosting events with at least 3 people')
				.addField('Join -', 'Join an event that is running; gets 10 Clan Loyalty Points for going to events')
				.addField('End -', 'Organiser or Higher rank can end their events')
				.addField('50/50 -', 'buys a 50/50 ticket and once 20 tickets are sold, a winner will be picked and given 5m! 500k per ticket')
				.addField('Buy -', 'Buy items that are being sold in the store, go to Shop list for full list')
				.addField('Cashout -', 'Cashs money out of your clan account, and lets admins+ know to meet you and cash you out')
				.addField('Paid -', 'Admin+ Ranks; after paying someone that needed to be cashed out, moves the money to your clan bank account')
                .addField('Delete -', 'Deletes up to 100 old massages on that channel')
   
            message.channel.sendEmbed(help);


		break;}
	   
	   case 'cap': {
		   //if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later')
		   			if(message.channel.id !== '384157088307347466') {
				message.delete()
				message.author.send('Please only use this in the Point Request channel, Thank you');
				return;
			}
	   
			if(args[1] == undefined) return message.channel.send('Please tag who capped');
		    var capID = (message.mentions.members.first()) || (message.author.id)
			bot.nameguild = (message.mentions.members.get(capID.id)) || (message.author.id);
			let username1 = (bot.nameguild.user.username)
			var cappy = (username1)
			let i = capID.id
			//random number between 0 and 100
			let min = 1
			let max = 100
	
				{
				let range = (max - min) + 1;     
				let chance = (Math.floor(Math.random() * range) + min);

				if(chance <=30)
					{
						var Min1 = 50 
						var Max1 = 75
					}
				if(30 < chance && chance <= 75)
					{
						var Min1 = 50 
						var Max1 = 100	
					}
				if(75 < chance && chance <= 85)
					{
						var Min1 = 50 
						var Max1 = 150	
					}
				if(85 < chance && chance <= 90)
					{
						var Min1 = 50 
						var Max1 = 200		
					}
				if(90 < chance && chance <= 100)
					{
						var Min1 = 50 
						var Max1 = 250
					}
			let range1 = (Max1 - Min1) + 1;     
			var pointcap = (Math.floor(Math.random() * range1) + Min1);
			};
			//sync file 
			let points = JSON.parse(fs.readFileSync("./pointsystem.json", "utf8"));
			//points saved on file
			let userPoints = points[capID.id] ? points[capID.id].points : 0;
			let userTime = points[capID.id] ? points[capID.id].time : 0;
			let usergp = points[capID.id] ? points[capID.id].gp : 0;
			var totalcap1 = points[capID.id] ? points[capID.id].caps : 0;
			let RecruitBy1 = points[capID.id] ? points[capID.id].RecruitBy : 0;
			let RecruitByid1 = points[capID.id] ? points[capID.id].RecruitByid : 0;
			let recruits1 = points[capID.id] ? points[capID.id].recruited : 0;
			let joindate1 = points[capID.id] ? points[capID.id].joined : 0;
			let totalevents1 = points[capID.id] ? points[capID.id].totalevents : 0;
			let index = JSON.parse(fs.readFileSync("./capreset.json", "utf8"));
			let capreset = index.capreset

			if(message.author.id !== BotSettings.Ownerid){
				if(userTime > Date.now()) return message.channel.send(`${capID} has capped already this week`);
			};
			bot.points[capID.id] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy1,
					RecruitByid: RecruitByid1,
					username: cappy,
					time: capreset,
					joined: joindate1,
					points: pointcap + userPoints,
					gp: usergp,
					caps: totalcap1 + 1,
					totalevents: totalevents1,
					recruited: recruits1
				}
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;
								});
			//need to make $person and $pointcap(math for random points)
			message.channel.send(`Congrats ${cappy} has capped and received ${pointcap} clan loyalty points`)
		break};
	
		 case 'start': {
			//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
			if(message.channel.id !== '389776346311557120') {
				message.delete()
				message.author.send('Please only use this in the Events channel, Thank you');
				return;
			}		
		
		// Check if they have one of many roles
		if(!message.member.roles.some(r=>["Owner", "Dep Owners", "Overseer", "Coordinator","Organiser", ,"Chef Organiser"].includes(r.name)) ) {
		// doesnt have one of the roles
		return message.channel.send('you dont have the rank to host an event');
		} 
		  if(args[1] == undefined) return message.channel.send('Please name the event you are starting');
            			let events = JSON.parse(fs.readFileSync("./events.json", "utf8"));
						var eventname = (args[1].toLocaleLowerCase());
						var host = (message.author.username);
			bot.events[eventname] = 
				{
					host: message.author.username,
					hostid: message.author.id
				};
			fs.writeFile("./events.json", JSON.stringify(bot.events, null, 4), err => {
			if(err) throw err;
			message.channel.send(`@everyone event ${eventname} has just started, hosted by ${host} come join the fun!`)					});
		 break;}
		
		case 'join':{
		//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
			if(message.channel.id !== '389776346311557120') {
				message.delete()
				message.author.send('Please only use this in the Events channel, Thank you');
				return;
			}			  
		  
		  
		  if(args[1] == undefined) return message.channel.send('Please name the event you are trying to join');
            			let events1 = JSON.parse(fs.readFileSync("./events.json", "utf8"));
						var eventname = (args[1].toLocaleLowerCase()); 
						guest = (message.author.username)
						if(!events1[eventname]) return message.channel.send('there is no event under that name at this time');
				var userhost = events1[eventname] ? events1[eventname].host : 0;
				var userhostid = events1[eventname] ? events1[eventname].hostid : 0;
				if(userhostid == (message.author.id)) return message.channel.send('you are the host of this event');
				var guest1 = events1[eventname] ? events1[eventname].guest1 : 0;
				var guestid1 = events1[eventname] ? events1[eventname].guestid1 : 0;
				if(guest1 == undefined){
				bot.events[eventname] = 
				{
					host: userhost,
					hostid: userhostid,
					guest1: message.author.username,
					guestid1: message.author.id
				}	
				};			
				var guest2 = events1[eventname] ? events1[eventname].guest2 : 0;
				var guestid2 = events1[eventname] ? events1[eventname].guestid2 : 0;
				if(guest2 == undefined && guest1 !== undefined){
					bot.events[eventname] = 
					{
						host: userhost,
						hostid: userhostid,
						guest1: guest1,
						guestid1: guestid1,
						guest2: message.author.username,
						guestid2: message.author.id
					}	
				};
				var guest3 = events1[eventname] ? events1[eventname].guest3 : 0;
				var guestid3 = events1[eventname] ? events1[eventname].guestid3 : 0;
				if(guest3 == undefined && guest2 !== undefined){
					bot.events[eventname] = 
					{
						host: userhost,
						hostid: userhostid,
						guest1: guest1,
						guestid1: guestid1,
						guest2: guest2,
						guestid2: guestid2,
						guest3: message.author.username,
						guestid3: message.author.id
						
					}	
				};
				var guest4 = events1[eventname] ? events1[eventname].guest4 : 0;
				var guestid4 = events1[eventname] ? events1[eventname].guestid4 : 0;
				if(guest4 == undefined && guest3 !== undefined){
					bot.events[eventname] = 
					{
						host: userhost,
						hostid: userhostid,
						guest1: guest1,
						guestid1: guestid1,
						guest2: guest2,
						guestid2: guestid2,
						guest3: guest3,
						guestid3: guestid3,
						guest4: message.author.username,
						guestid4: message.author.id
						
					}	
				};	
				var guest4 = events1[eventname] ? events1[eventname].guest4 : 0;
				var guestid4 = events1[eventname] ? events1[eventname].guestid4 : 0;
				if(guest5 == undefined && guest4 !== undefined){
					bot.events[eventname] = 
					{
						host: userhost,
						hostid: userhostid,
						guest1: guest1,
						guestid1: guestid1,
						guest2: guest2,
						guestid2: guestid2,
						guest3: guest3,
						guestid3: guestid3,
						guest4: guest4,
						guestid4: guestid4,
						guest5: message.author.username,
						guestid5: message.author.id
						
					}	
				};	
				var guest6 = events1[eventname] ? events1[eventname].guest6 : 0;
				var guestid6 = events1[eventname] ? events1[eventname].guestid6 : 0;
				if(guest6 == undefined && guest5 !== undefined){
					bot.events[eventname] = 
					{
						host: userhost,
						hostid: userhostid,
						guest1: guest1,
						guestid1: guestid1,
						guest2: guest2,
						guestid2: guestid2,
						guest3: guest3,
						guestid3: guestid3,
						guest4: guest4,
						guestid4: guestid4,
						guest5: guest5,
						guestid5: guestid5,
						guest6: message.author.username,
						guestid6: message.author.id
						
					}	
				};	
				var guest7 = events1[eventname] ? events1[eventname].guest7 : 0;
				var guestid7 = events1[eventname] ? events1[eventname].guestid7 : 0;
				if(guest7 == undefined && guest6 !== undefined){
					bot.events[eventname] = 
					{
						host: userhost,
						hostid: userhostid,
						guest1: guest1,
						guestid1: guestid1,
						guest2: guest2,
						guestid2: guestid2,
						guest3: guest3,
						guestid3: guestid3,
						guest4: guest4,
						guestid4: guestid4,
						guest5: guest5,
						guestid5: guestid5,
						guest6: guest6,
						guestid6: guestid6,
						guest7: message.author.username,
						guestid7: message.author.id
						
					}	
				};	
				var guest8 = events1[eventname] ? events1[eventname].guest8 : 0;
				var guestid8 = events1[eventname] ? events1[eventname].guestid8 : 0;
				if(guest8 == undefined && guest7 !== undefined){
					bot.events[eventname] = 
					{
						host: userhost,
						hostid: userhostid,
						guest1: guest1,
						guestid1: guestid1,
						guest2: guest2,
						guestid2: guestid2,
						guest3: guest3,
						guestid3: guestid3,
						guest4: guest4,
						guestid4: guestid4,
						guest5: guest5,
						guestid5: guestid5,
						guest6: guest6,
						guestid6: guestid6,
						guest7: guest7,
						guestid7: guestid7,
						guest8: message.author.username,
						guestid8: message.author.id
						
					}	
				};	
				var guest9 = events1[eventname] ? events1[eventname].guest9 : 0;
				var guestid9 = events1[eventname] ? events1[eventname].guestid9 : 0;
				if(guest9 == undefined && guest8 !== undefined){
					bot.events[eventname] = 
					{
						host: userhost,
						hostid: userhostid,
						guest1: guest1,
						guestid1: guestid1,
						guest2: guest2,
						guestid2: guestid2,
						guest3: guest3,
						guestid3: guestid3,
						guest4: guest4,
						guestid4: guestid4,
						guest5: guest5,
						guestid5: guestid5,
						guest6: guest6,
						guestid6: guestid6,
						guest7: guest7,
						guestid7: guestid7,
						guest8: guest8,
						guestid8: guestid8,
						guest9: message.author.username,
						guestid9: message.author.id
						
					}	
				};	
				var guest10 = events1[eventname] ? events1[eventname].guest10 : 0;
				var guestid10 = events1[eventname] ? events1[eventname].guestid10 : 0;
				if(guest10 == undefined && guest9 !== undefined){
					bot.events[eventname] = 
					{
						host: userhost,
						hostid: userhostid,
						guest1: guest1,
						guestid1: guestid1,
						guest2: guest2,
						guestid2: guestid2,
						guest3: guest3,
						guestid3: guestid3,
						guest4: guest4,
						guestid4: guestid4,
						guest5: guest5,
						guestid5: guestid5,
						guest6: guest6,
						guestid6: guestid6,
						guest7: guest7,
						guestid7: guestid7,
						guest8: guest8,
						guestid8: guestid8,
						guest9: guest9,
						guestid9: guestid9,
						guest10: message.author.username,
						guestid10: message.author.id
						}
							message.channel.send('The event is now full')
				};					
		
fs.writeFile("./events.json", JSON.stringify(bot.events, null, 4), err => {
			if(err) throw err;
			message.channel.send(`${guest} has just joined ${eventname} come join the fun!`)					});
        break;}				

		case 'end':{
		//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later')
		if(message.channel.id !== '389776346311557120') {
				message.delete()
				message.author.send('Please only use this in the Events channel, Thank you');
				return;
		}	
	
		// Check if they have one of many roles
		if(!message.member.roles.some(r=>["Owner", "Dep Owners", "Overseer", "Coordinator","Organiser","Chef Organiser"].includes(r.name)) ) {
		// doesnt have one of the roles
		return message.channel.send('you dont have the rank to host an event');
		} 
		//makes sure the have an event selected
		 if(args[1] == undefined) return message.channel.send('Please name the event you are starting');
         let events2 = JSON.parse(fs.readFileSync("./events.json", "utf8"));
		 let points3 = JSON.parse(fs.readFileSync("./pointsystem.json", "utf8"));
			var eventname = (args[1].toLocaleLowerCase());
			var host = userhost = events2[eventname] ? events2[eventname].host : 0;
			//check to make sure event is running
		
		
		//ends all events running and give no Clan Loyalty Points	
		if(args[1] == "all"){
			//delete the event from the current list of events
			delete bot.events
			bot.events = {}
	
			fs.writeFileSync('events.json', JSON.stringify(bot.events, null, 4));
			message.channel.send('no Clan Loyalty Points given, ended all events')
			return;
		}
			
			
		if(!events2[eventname]) return message.channel.send('there is no event under that name at this time');
		var guest2 = events2[eventname] ? events2[eventname].guest2 : 0;
		if(guest2 == undefined){
			//delete the event from the current list of events
			delete bot.events[eventname]
	
			fs.writeFileSync('events.json', JSON.stringify(bot.events, null, 4));
			message.channel.send('no Clan Loyalty Points given, not enough people')
			return;
		}
		

			
				var userhost = events2[eventname] ? events2[eventname].host : 0;
				var userhostid = events2[eventname] ? events2[eventname].hostid : 0;
				
			var userPoints3 = points3[userhostid] ? points3[userhostid].points : 0;
			var userTime3 = points3[userhostid] ? points3[userhostid].time : 0;
			var usergp3 = points3[userhostid] ? points3[userhostid].gp : 0;
			var RecruitBy2 = points3[userhostid] ? points3[userhostid].RecruitBy : 0;
			var RecruitByid2 = points3[userhostid] ? points3[userhostid].RecruitByid : 0;
			var joindate2 = points3[userhostid] ? points3[userhostid].joined : 0;
			var totalevents2 = points3[userhostid] ? points3[userhostid].totalevents : 0;
			var totalcap2 = points3[userhostid] ? points3[userhostid].caps : 0;
			var recruits2 = points3[userhostid] ? points3[userhostid].recruited : 0;
					bot.points[userhostid] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: userhost,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 15,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2 
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				var guest1 = events2[eventname] ? events2[eventname].guest1 : 0;
				var guestid1 = events2[eventname] ? events2[eventname].guestid1 : 0;
				
				if(guest1 !== undefined){
			var userPoints3 = points3[guestid1] ? points3[guestid1].points : 0;
			var userTime3 = points3[guestid1] ? points3[guestid1].time : 0;
			var usergp3 = points3[guestid1] ? points3[guestid1].gp : 0;
			var RecruitBy2 = points3[guestid1] ? points3[guestid1].RecruitBy : 0;
			var RecruitByid2 = points3[guestid1] ? points3[guestid1].RecruitByid : 0;
			var joindate2 = points3[guestid1] ? points3[guestid1].joined : 0;
			var totalevents2 = points3[guestid1] ? points3[guestid1].totalevents : 0;
			var totalcap2 = points3[guestid1] ? points3[guestid1].caps : 0;
			var recruits2 = points3[guestid1] ? points3[guestid1].recruited : 0;
					bot.points[guestid1] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,					
					username: guest1,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}
				
				var guest2 = events2[eventname] ? events2[eventname].guest2 : 0;
				var guestid2 = events2[eventname] ? events2[eventname].guestid2 : 0;
				
				if(guest2 !== undefined){
			var userPoints3 = points3[guestid2] ? points3[guestid2].points : 0;
			var userTime3 = points3[guestid2] ? points3[guestid2].time : 0;
			var usergp3 = points3[guestid2] ? points3[guestid2].gp : 0;
			var RecruitBy2 = points3[guestid2] ? points3[guestid2].RecruitBy : 0;
			var RecruitByid2 = points3[guestid2] ? points3[guestid2].RecruitByid : 0;
			var joindate2 = points3[guestid2] ? points3[guestid2].joined : 0;
			var totalevents2 = points3[guestid2] ? points3[guestid2].totalevents : 0;
			var totalcap2 = points3[guestid2] ? points3[guestid2].caps : 0;
			var recruits2 = points3[guestid2] ? points3[guestid2].recruited : 0;			
					bot.points[guestid2] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: guest2,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}				
				
				var guest3 = events2[eventname] ? events2[eventname].guest3 : 0;
				var guestid3 = events2[eventname] ? events2[eventname].guestid3 : 0;
				
				if(guest3 !== undefined){
			var userPoints3 = points3[guestid3] ? points3[guestid3].points : 0;
			var userTime3 = points3[guestid3] ? points3[guestid3].time : 0;
			var usergp3 = points3[guestid3] ? points3[guestid3].gp : 0;
			var RecruitBy2 = points3[guestid3] ? points3[guestid3].RecruitBy : 0;
			var RecruitByid2 = points3[guestid3] ? points3[guestid3].RecruitByid : 0;
			var joindate2 = points3[guestid3] ? points3[guestid3].joined : 0;
			var totalevents2 = points3[guestid3] ? points3[guestid3].totalevents : 0;
			var totalcap2 = points3[guestid3] ? points3[guestid3].caps : 0;
			var recruits2 = points3[guestid3] ? points3[guestid3].recruited : 0;
					bot.points[guestid3] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: guest3,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}						
				
				var guest4 = events2[eventname] ? events2[eventname].guest4 : 0;
				var guestid4 = events2[eventname] ? events2[eventname].guestid4 : 0;
				
				if(guest4 !== undefined){
			var userPoints3 = points3[guestid4] ? points3[guestid4].points : 0;
			var userTime3 = points3[guestid4] ? points3[guestid4].time : 0;
			var usergp3 = points3[guestid4] ? points3[guestid4].gp : 0;
			var RecruitBy2 = points3[guestid4] ? points3[guestid4].RecruitBy : 0;
			var RecruitByid2 = points3[guestid4] ? points3[guestid4].RecruitByid : 0;
			var joindate2 = points3[guestid4] ? points3[guestid4].joined : 0;
			var totalevents2 = points3[guestid4] ? points3[guestid4].totalevents : 0;
			var totalcap2 = points3[guestid4] ? points3[guestid4].caps : 0;
			var recruits2 = points3[guestid4] ? points3[guestid4].recruited : 0;
					bot.points[guestid4] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: guest4,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}						
				
				var guest5 = events2[eventname] ? events2[eventname].guest5 : 0;
				var guestid5 = events2[eventname] ? events2[eventname].guestid5 : 0;
				
				if(guest5 !== undefined){
			var userPoints3 = points3[guestid5] ? points3[guestid5].points : 0;
			var userTime3 = points3[guestid5] ? points3[guestid5].time : 0;
			var usergp3 = points3[guestid5] ? points3[guestid5].gp : 0;
			var RecruitBy2 = points3[guestid5] ? points3[guestid5].RecruitBy : 0;
			var RecruitByid2 = points3[guestid5] ? points3[guestid5].RecruitByid : 0;
			var joindate2 = points3[guestid5] ? points3[guestid5].joined : 0;
			var totalevents2 = points3[guestid5] ? points3[guestid5].totalevents : 0;
			var totalcap2 = points3[guestid5] ? points3[guestid5].caps : 0;
			var recruits2 = points3[guestid5] ? points3[guestid5].recruited : 0;
					bot.points[guestid2] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: guest5,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}						
				
				var guest6 = events2[eventname] ? events2[eventname].guest6 : 0;
				var guestid6 = events2[eventname] ? events2[eventname].guestid6 : 0;
				
				if(guest6 !== undefined){
			var userPoints3 = points3[guestid6] ? points3[guestid6].points : 0;
			var userTime3 = points3[guestid6] ? points3[guestid6].time : 0;
			var usergp3 = points3[guestid6] ? points3[guestid6].gp : 0;
			var RecruitBy2 = points3[guestid6] ? points3[guestid6].RecruitBy : 0;
			var RecruitByid2 = points3[guestid6] ? points3[guestid6].RecruitByid : 0;
			var joindate2 = points3[guestid6] ? points3[guestid6].joined : 0;
			var totalevents2 = points3[guestid6] ? points3[guestid6].totalevents : 0;
			var totalcap2 = points3[guestid6] ? points3[guestid6].caps : 0;
			var recruits2 = points3[guestid6] ? points3[guestid6].recruited : 0;
					bot.points[guestid6] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: guest6,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}						
				
				var guest7 = events2[eventname] ? events2[eventname].guest7 : 0;
				var guestid7 = events2[eventname] ? events2[eventname].guestid7 : 0;
				
				if(guest7 !== undefined){
			var userPoints3 = points3[guestid7] ? points3[guestid7].points : 0;
			var userTime3 = points3[guestid7] ? points3[guestid7].time : 0;
			var usergp3 = points3[guestid7] ? points3[guestid7].gp : 0;
			var RecruitBy2 = points3[guestid7] ? points3[guestid7].RecruitBy : 0;
			var RecruitByid2 = points3[guestid7] ? points3[guestid7].RecruitByid : 0;
			var joindate2 = points3[guestid7] ? points3[guestid7].joined : 0;
			var totalevents2 = points3[guestid7] ? points3[guestid7].totalevents : 0;
			var totalcap2 = points3[guestid7] ? points3[guestid7].caps : 0;
			var recruits2 = points3[guestid7] ? points3[guestid7].recruited : 0;
					bot.points[guestid7] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: guest7,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}						
				
				var guest8 = events2[eventname] ? events2[eventname].guest8 : 0;
				var guestid8 = events2[eventname] ? events2[eventname].guestid8 : 0;
				
				if(guest8 !== undefined){
			var userPoints3 = points3[guestid8] ? points3[guestid8].points : 0;
			var userTime3 = points3[guestid8] ? points3[guestid8].time : 0;
			var usergp3 = points3[guestid8] ? points3[guestid8].gp : 0;
			var RecruitBy2 = points3[guestid8] ? points3[guestid8].RecruitBy : 0;
			var RecruitByid2 = points3[guestid8] ? points3[guestid8].RecruitByid : 0;
			var joindate2 = points3[guestid8] ? points3[guestid8].joined : 0;
			var totalevents2 = points3[guestid8] ? points3[guestid8].totalevents : 0;
			var totalcap2 = points3[guestid8] ? points3[guestid8].caps : 0;
			var recruits2 = points3[guestid8] ? points3[guestid8].recruited : 0;
					bot.points[guestid8] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: guest8,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}						
				
				var guest9 = events2[eventname] ? events2[eventname].guest9 : 0;
				var guestid9 = events2[eventname] ? events2[eventname].guestid9 : 0;
				
				if(guest9 !== undefined){
			var userPoints3 = points3[guestid9] ? points3[guestid9].points : 0;
			var userTime3 = points3[guestid9] ? points3[guestid9].time : 0;
			var usergp3 = points3[guestid9] ? points3[guestid9].gp : 0;
			var RecruitBy2 = points3[guestid9] ? points3[guestid9].RecruitBy : 0;
			var RecruitByid2 = points3[guestid9] ? points3[guestid9].RecruitByid : 0;
			var joindate2 = points3[guestid9] ? points3[guestid9].joined : 0;
			var totalevents2 = points3[guestid9] ? points3[guestid9].totalevents : 0;
			var totalcap2 = points3[guestid9] ? points3[guestid9].caps : 0;
			var recruits2 = points3[guestid9] ? points3[guestid9].recruited : 0;
					bot.points[guestid9] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: guest9,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}						
				
				var guest10 = events2[eventname] ? events2[eventname].guest10 : 0;
				var guestid10 = events2[eventname] ? events2[eventname].guestid10 : 0;
			
				if(guest10 !== undefined){
			var userPoints3 = points3[guestid10] ? points3[guestid10].points : 0;
			var userTime3 = points3[guestid10] ? points3[guestid10].time : 0;
			var usergp3 = points3[guestid10] ? points3[guestid10].gp : 0;
			var RecruitBy2 = points3[guestid10] ? points3[guestid10].RecruitBy : 0;
			var RecruitByid2 = points3[guestid10] ? points3[guestid10].RecruitByid : 0;
			var joindate2 = points3[guestid10] ? points3[guestid10].joined : 0;
			var totalevents2 = points3[guestid10] ? points3[guestid10].totalevents : 0;
			var totalcap2 = points3[guestid10] ? points3[guestid10].caps : 0;
			var recruits2 = points3[guestid10] ? points3[guestid10].recruited : 0;
					bot.points[guestid10] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: guest10,
					time: userTime3,
					joined: joindate2,
					points: userPoints3 + 10,
					gp: usergp3,
					caps: totalcap2,
					totalevents: totalevents2 + 1,
					recruited: recruits2
				};
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;				
								});
								
				}					
		
			
			message.channel.send(`Thank you ${host} for hosting getting 15 Clan Loyalty Points`)

			if(guest1 !== undefined && guest2 == undefined){
			message.channel.send(`Thank you ${guest1} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			};				
			
			if(guest2 !== undefined && guest3 == undefined){
			message.channel.send(`Thank you ${guest1}, and ${guest2} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			}				
			
			if(guest3 !== undefined && guest4 == undefined){
			message.channel.send(`Thank you ${guest1}, ${guest2}, and ${guest3} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			}				
			
			if(guest4 !== undefined && guest5 == undefined){
			message.channel.send(`Thank you ${guest1}, ${guest2}, ${guest3}, and ${guest4} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			}					
						
			if(guest5 !== undefined && guest6 == undefined){
			message.channel.send(`Thank you ${guest1}, ${guest2}, ${guest3}, ${guest4}, and ${guest5} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			}					
			
			if(guest6 !== undefined && guest7 == undefined){
			message.channel.send(`Thank you ${guest1}, ${guest2}, ${guest3}, ${guest4}, ${guest5}, and ${guest6} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			}			
						
			if(guest7 !== undefined && guest8 == undefined){
			message.channel.send(`Thank you ${guest1}, ${guest2}, ${guest3}, ${guest4}, ${guest5}, ${guest6}, and ${guest7} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			}			
			
			if(guest8 !== undefined && guest9 == undefined){
			message.channel.send(`Thank you ${guest1}, ${guest2}, ${guest3}, ${guest4}, ${guest5}, ${guest6}, ${guest7}, and ${guest8} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			}
			
			if(guest9 !== undefined && guest10 == undefined){
			message.channel.send(`Thank you ${guest1}, ${guest2}, ${guest3}, ${guest4}, ${guest5}, ${guest6}, ${guest7}, ${guest8}, and ${guest9} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			}

			
			if(guest10 !== undefined){
			message.channel.send(`Thank you ${guest1}, ${guest2}, ${guest3}, ${guest4}, ${guest5}, ${guest6}, ${guest7}, ${guest8}, ${guest9}, and ${guest10} for going to ${eventname} and you all get 10 Clan Loyalty Points`)
			}
			
						//delete the event from the current list of events
			delete bot.events[eventname]
	
			fs.writeFile('events.json', JSON.stringify(bot.events, null, 4));
			
			
		break;}
		
        case '50/50':{
			//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
			if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
			}	
			
			let fifty = JSON.parse(fs.readFileSync("./50n50.json", "utf8"));
			let points4 = JSON.parse(fs.readFileSync("./pointsystem.json", "utf8"));
			
			var buyer = (message.author.username);
			var buyerid = (message.author.id);			
			
			let userPoints4 = points4[buyerid] ? points4[buyerid].points : 0;
			let userTime4 = points4[buyerid] ? points4[buyerid].time : 0;
			var RecruitBy2 = points4[buyerid] ? points4[buyerid].RecruitBy : 0;
			var RecruitByid2 = points4[buyerid] ? points4[buyerid].RecruitByid : 0;
			var joindate2 = points4[buyerid] ? points4[buyerid].joined : 0;
			var totalevents2 = points4[buyerid] ? points4[buyerid].totalevents : 0;
			var totalcap2 = points4[buyerid] ? points4[buyerid].caps : 0;
			var recruits2 = points4[buyerid] ? points4[buyerid].recruited : 0;
			
			let buyergp = points4[buyerid] ? points4[buyerid].gp : 0;
			if(buyergp < 500000) return message.channel.send('you dont have 500k in your clan account to buy this, please get funds and come back again');
			var newgp = (buyergp - 500000)

			bot.points[buyerid] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: buyer,
					time: userTime4,
					joined: joindate2,
					points: userPoints4,
					gp: newgp,
					caps: totalcap2,
					totalevents: totalevents2,
					recruited: recruits2
				};
				
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;		
								});	
								
				let fk = '500k'
				var f1 = fifty[fk] ? fifty[fk].f1 : 0;
				var f1id = fifty[fk] ? fifty[fk].f1id : 0;
				
				if(f1 == 0){
					bot.fifty[fk] = 
					{
						f1: buyer,
						f1id: buyerid
					}
					
			message.channel.send(`${buyer} bought slot number 1, and has ${newgp}gp left`);		
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
	
				var f2 = fifty[fk] ? fifty[fk].f2 : 0;
				var f2id = fifty[fk] ? fifty[fk].f2id : 0;
				
				if(f1 !== undefined && f2 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: buyer,
						f2id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 2, and has ${newgp}gp left`);
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
				
				};		

				var f3 = fifty[fk] ? fifty[fk].f3 : 0;
				var f3id = fifty[fk] ? fifty[fk].f3id : 0;
				
				if(f2 !== undefined && f3 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: buyer,
						f3id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 3, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		

				var f4 = fifty[fk] ? fifty[fk].f4 : 0;
				var f4id = fifty[fk] ? fifty[fk].f4id : 0;
				
				if(f3 !== undefined && f4 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: buyer,
						f4id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 4, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};						

				var f5 = fifty[fk] ? fifty[fk].f5 : 0;
				var f5id = fifty[fk] ? fifty[fk].f5id : 0;
				
				if(f4 !== undefined && f5 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: buyer,
						f5id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 5, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};						

				var f6 = fifty[fk] ? fifty[fk].f6 : 0;
				var f6id = fifty[fk] ? fifty[fk].f6id : 0;
				
				if(f5 !== undefined && f6 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: buyer,
						f6id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 6, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f7 = fifty[fk] ? fifty[fk].f7 : 0;
				var f7id = fifty[fk] ? fifty[fk].f7id : 0;
				
				if(f6 !== undefined && f7 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: buyer,
						f7id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 7, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f8 = fifty[fk] ? fifty[fk].f8 : 0;
				var f8id = fifty[fk] ? fifty[fk].f8id : 0;
				
				if(f7 !== undefined && f8 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: buyer,
						f8id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 8, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		

				
				var f9 = fifty[fk] ? fifty[fk].f9 : 0;
				var f9id = fifty[fk] ? fifty[fk].f9id : 0;
				
				if(f8 !== undefined && f9 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: buyer,
						f9id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 9, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f10 = fifty[fk] ? fifty[fk].f10 : 0;
				var f10id = fifty[fk] ? fifty[fk].f10id : 0;
				
				if(f9 !== undefined && f10 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: buyer,
						f10id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 10, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f11 = fifty[fk] ? fifty[fk].f11 : 0;
				var f11id = fifty[fk] ? fifty[fk].f11id : 0;
				
				if(f10 !== undefined && f11 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: buyer,
						f11id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 11, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f12 = fifty[fk] ? fifty[fk].f12 : 0;
				var f12id = fifty[fk] ? fifty[fk].f12id : 0;
				
				if(f11 !== undefined && f12 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: f11,
						f11id: f11id,
						f12: buyer,
						f12id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 12, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f13 = fifty[fk] ? fifty[fk].f13 : 0;
				var f13id = fifty[fk] ? fifty[fk].f13id : 0;
				
				if(f12 !== undefined && f13 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: f11,
						f11id: f11id,
						f12: f12,
						f12id: f12id,
						f13: buyer,
						f13id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 13, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f14 = fifty[fk] ? fifty[fk].f14 : 0;
				var f14id = fifty[fk] ? fifty[fk].f14id : 0;
				
				if(f13 !== undefined && f14 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: f11,
						f11id: f11id,
						f12: f12,
						f12id: f12id,
						f13: f13,
						f13id: f13id,
						f14: buyer,
						f14id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 14, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f15 = fifty[fk] ? fifty[fk].f15 : 0;
				var f15id = fifty[fk] ? fifty[fk].f15id : 0;
				
				if(f14 !== undefined && f15 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: f11,
						f11id: f11id,
						f12: f12,
						f12id: f12id,
						f13: f13,
						f13id: f13id,
						f14: f14,
						f14id: f14id,
						f15: buyer,
						f15id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 15, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f16 = fifty[fk] ? fifty[fk].f16 : 0;
				var f16id = fifty[fk] ? fifty[fk].f16id : 0;
				
				if(f15 !== undefined && f16 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: f11,
						f11id: f11id,
						f12: f12,
						f12id: f12id,
						f13: f13,
						f13id: f13id,
						f14: f14,
						f14id: f14id,
						f15: f15,
						f15id: f15id,
						f16: buyer,
						f16id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 16, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f17 = fifty[fk] ? fifty[fk].f17 : 0;
				var f17id = fifty[fk] ? fifty[fk].f17id : 0;
				
				if(f16 !== undefined && f17 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: f11,
						f11id: f11id,
						f12: f12,
						f12id: f12id,
						f13: f13,
						f13id: f13id,
						f14: f14,
						f14id: f14id,
						f15: f15,
						f15id: f15id,
						f16: f16,
						f16id: f16id,
						f17: buyer,
						f17id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 17, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f18 = fifty[fk] ? fifty[fk].f18 : 0;
				var f18id = fifty[fk] ? fifty[fk].f18id : 0;
				
				if(f17 !== undefined && f18 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: f11,
						f11id: f11id,
						f12: f12,
						f12id: f12id,
						f13: f13,
						f13id: f13id,
						f14: f14,
						f14id: f14id,
						f15: f15,
						f15id: f15id,
						f16: f16,
						f16id: f16id,
						f17: f17,
						f17id: f17id,
						f18: buyer,
						f18id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 18, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f19 = fifty[fk] ? fifty[fk].f19 : 0;
				var f19id = fifty[fk] ? fifty[fk].f19id : 0;
				
				if(f18 !== undefined && f19 == undefined){
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: f11,
						f11id: f11id,
						f12: f12,
						f12id: f12id,
						f13: f13,
						f13id: f13id,
						f14: f14,
						f14id: f14id,
						f15: f15,
						f15id: f15id,
						f16: f16,
						f16id: f16id,
						f17: f17,
						f17id: f17id,
						f18: f18,
						f18id: f18id,
						f19: buyer,
						f19id: buyerid
					}
					
				message.channel.send(`${buyer} bought slot number 19, and has ${newgp}gp left`);	
					
			fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
								});	
											
				};		
				
				var f20 = fifty[fk] ? fifty[fk].f20 : 0;
				var f20id = fifty[fk] ? fifty[fk].f20id : 0;
				
				if(f19 !== undefined && f20 == undefined){	
					bot.fifty[fk] = 
					{
						f1: f1,
						f1id: f1id,
						f2: f2,
						f2id: f2id,
						f3: f3,
						f3id: f3id,
						f4: f4,
						f4id: f4id,
						f5: f5,
						f5id: f5id,
						f6: f6,
						f6id: f6id,
						f7: f7,
						f7id: f7id,
						f8: f8,
						f8id: f8id,
						f9: f9,
						f9id: f9id,
						f10: f10,
						f10id: f10id,
						f11: f11,
						f11id: f11id,
						f12: f12,
						f12id: f12id,
						f13: f13,
						f13id: f13id,
						f14: f14,
						f14id: f14id,
						f15: f15,
						f15id: f15id,
						f16: f16,
						f16id: f16id,
						f17: f17,
						f17id: f17id,
						f18: f18,
						f18id: f18id,
						f19: f19,
						f19id: f19id,
						f20: buyer,
						f20id: buyerid
					}
				
				fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
			if(err) throw err;		
	
			message.channel.send(`${buyer} bought slot number 20, and has ${newgp}gp left`);

				});	
					//random number between 0 and 100
					let min1 = 1
					let max1 = 20
					let range1 = (max1 - min1) + 1;     
					let chance1 = (Math.floor(Math.random() * range1) + min1);								
					let pull = (`f${chance1}`)
					let pullid = (`${pull}id`)
					
			if('f1' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f1 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f1id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
					
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;
				
				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f2' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f2 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f2id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);			
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;
				
				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f3' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f3 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f3id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;
				
				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f4' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f4 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f4id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);			
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;
				

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}

			if('f5' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f5 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f5id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}

			if('f6' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f6 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f6id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f7' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f7 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f7id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}				

			if('f8' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f8 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f8id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}				

			if('f9' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f9 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f9id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}				

			if('f10' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f10 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f10id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}				

			if('f11' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f11 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f11id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
							
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f12' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f12 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f12id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
							
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;
				

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}

			if('f13' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f13 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f13id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}				

			if('f14' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f14 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f14id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f15' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f15 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f15id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f16' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f16 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f16id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
							
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f17' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f17 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f17id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
							
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f18' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f18 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f18id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
							
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f19' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f19 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f19id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
			}	

			if('f20' == pull){
				var winner = fifty['500k'] ? fifty['500k'].f20 : 0;
				var winnerid = fifty['500k'] ? fifty['500k'].f20id : 0;
					
				message.channel.send(`Number ${chance1} Wins!, ${winner} has Won the 50/50 Pot of 5m!!, @${winner} 5m has been add to you Clan Bank account. @everyone Get your tickets now for the next 50/50`);	
						
				var winnergp = points4[winnerid] ? points4[winnerid].gp : 0;
				var RecruitBy2 = points4[winnerid] ? points4[winnerid].RecruitBy : 0;
				var RecruitByid2 = points4[winnerid] ? points4[winnerid].RecruitByid : 0;
				var joindate2 = points4[winnerid] ? points4[winnerid].joined : 0;
				var totalevents2 = points4[winnerid] ? points4[winnerid].totalevents : 0;
				var totalcap2 = points4[winnerid] ? points4[winnerid].caps : 0;
				var recruits2 = points4[winnerid] ? points4[winnerid].recruited : 0;

				bot.points[winnerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: winner,
						time: userTime4,
						joined: joindate2,
						points: userPoints4,
						gp: (winnergp + 5000000),
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					};
				fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
				if(err) throw err;		
	
							});	
					}	
			
			
				//delete the event from the current list of 50/50
				delete bot.fifty
				bot.fifty = {}
								
				fs.writeFileSync("./50n50.json", JSON.stringify(bot.fifty, null, 4), err => {
				if(err) throw err;		
								});	
											
				};		
																																																								
		break;}

		case 'buy':{
			//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later')
            
			if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
			}			
		
			var buyer = (message.author.username);
			var buyerid = (message.author.id);
			let points5 = JSON.parse(fs.readFileSync("./pointsystem.json", "utf8"));
			//points saved on file
			let userPoints5 = points5[buyerid] ? points5[buyerid].points : 0;
			let userTime5 = points5[buyerid] ? points5[buyerid].time : 0;
			let usergp5 = points5[buyerid] ? points5[buyerid].gp : 0;
			var RecruitBy2 = points5[buyerid] ? points5[buyerid].RecruitBy : 0;
			var RecruitByid2 = points5[buyerid] ? points5[buyerid].RecruitByid : 0;
			var joindate2 = points5[buyerid] ? points5[buyerid].joined : 0;
			var totalevents2 = points5[buyerid] ? points5[buyerid].totalevents : 0;
			var totalcap2 = points5[buyerid] ? points5[buyerid].caps : 0;
			var recruits2 = points5[buyerid] ? points5[buyerid].recruited : 0;


			if(args[1].toLocaleLowerCase() == '1m'){
				if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
				}
				bot.points[buyerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: buyer,
						time: userTime5,
						joined: joindate2,
						points: userPoints5 - 150,
						gp: usergp5 + 1000000,
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					}
					
					message.channel.send(`${buyer} spent 150 Clan Loyalty Points for 1m in Clan Bank account, You can CashOut at anytime`);
					
					fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
					if(err) throw err;
							});
			}
			
			if(args[1].toLocaleLowerCase() == '5m'){
				if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
				}
				bot.points[buyerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: buyer,
						time: userTime5,
						joined: joindate2,
						points: userPoints5 - 675,
						gp: usergp5 + 5000000,
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					}
					
					message.channel.send(`${buyer} spent 675 Clan Loyalty Points for 5m in Clan Bank account, You can CashOut at anytime`);
					
					fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
					if(err) throw err;
							});
			}
			
			if(args[1].toLocaleLowerCase() == 'corporal'){
				if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
				}
				//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
				// Check if they have one of many roles
				if(!message.member.roles.some(r=>["Recruit"].includes(r.name)) ) {
				// doesnt have one of the roles
				return message.channel.send('You are not a Recruit');
				}
				if(totalcap2 < 1) return message.channel.send(`you have capped ${totalcap2} times and you need to have at least capped 1 time to buy this rank`);
				if(totalevents2 < 2) return message.channel.send(`You haven't gone to enough clan events to buy this rank, you have gone to ${totalevents2} and need to have gone to at least 2`);
				if(userPoints5 < 50) return message.channel.send('You dont have enought Clan Loyalty Points to buy this Rank');
				
				bot.points[buyerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: buyer,
						time: userTime5,
						joined: joindate2,
						points: userPoints5 - 50,
						gp: usergp5,
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					}
					
					message.channel.send(`${buyer}, Congrats on Ranking up to Corporal!`);
					
					fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
					if(err) throw err;
							});
					let recruitrole = message.guild.roles.find("name", "Recruit");
					var corporalrole = message.guild.roles.find("name", "Corporal");
					var member1 = (message.member.guild.members.find('id', buyerid))
					member1.addRole(corporalrole).catch(console.error);
					//member.send('Congratz you are now a Corporal');
					
					// Remove Recruite role
					member1.removeRole(recruitrole).catch(console.error);
					
					//get admin channels info
					let admin = message.member.guild.channels.find('name','admin')
					//sends to the admin's channel
					admin.send(`@everyone ${buyer} has just Ranked up to Corporal, please update their RuneScape rank and put a message on here once you have done so. Thank you!`)
			}	

			if(args[1].toLocaleLowerCase() == 'sergeant'){
				if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
				}
				//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
				// Check if they have one of many roles
				if(!message.member.roles.some(r=>["Corporal"].includes(r.name)) ) {
				// doesnt have one of the roles
				return message.channel.send('You are not a Corporal');
				}
				if(totalcap2 < 3) return message.channel.send(`you have capped ${totalcap2} times and you need to have at least capped 3 time total to buy this rank`);
				if(totalevents2 < 3) return message.channel.send(`You haven't gone to enough clan events to buy this rank, you have gone to ${totalevents2} and need to have gone to at least 3 total`);
				if(userPoints5 < 50) return message.channel.send('You dont have enought Clan Loyalty Points to buy this Rank');
				
				bot.points[buyerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: buyer,
						time: userTime5,
						joined: joindate2,
						points: userPoints5 - 50,
						gp: usergp5,
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					}
					
					message.channel.send(`${buyer}, Congrats on Ranking up to Sergeant!`);
					
					fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
					if(err) throw err;
							});
					
					var corporalrole = message.guild.roles.find("name", "Corporal");
					var sergeantrole = message.guild.roles.find("name", "Sergeant");
					var member1 = (message.member.guild.members.find('id', buyerid))
					member1.addRole(sergeantrole).catch(console.error);
					//member.send('Congratz you are now a Corporal');
					
					// Remove Recruite role
					member1.removeRole(corporalrole).catch(console.error);
					
					//get admin channels info
					let admin = message.member.guild.channels.find('name','admin')
					//sends to the admin's channel
					admin.send(`@everyone ${buyer} has just Ranked up to Sergeant, please update their RuneScape rank and put a message on here once you have done so. Thank you!`)
			}	
			
			if(args[1].toLocaleLowerCase() == 'lieutenant'){
				if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
				}
				//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
				// Check if they have one of many roles
				if(!message.member.roles.some(r=>["Sergeant"].includes(r.name)) ) {
				// doesnt have one of the roles
				return message.channel.send('You are not a Sergeant');
				}
				if(totalcap2 < 5) return message.channel.send(`you have capped ${totalcap2} times and you need to have at least capped 5 time total to buy this rank`);
				if(recruits2 < 1) return message.channel.send(`You haven't recruited a new clan members yet to buy this rank`);
				if(userPoints5 < 75) return message.channel.send('You dont have enought Clan Loyalty Points to buy this Rank');
				
				bot.points[buyerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: buyer,
						time: userTime5,
						joined: joindate2,
						points: userPoints5 - 75,
						gp: usergp5,
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					}
					
					message.channel.send(`${buyer}, Congrats on Ranking up to Lieutenant!`);
					
					fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
					if(err) throw err;
							});
					
					var lieutenantrole = message.guild.roles.find("name", "Lieutenant");
					var sergeantrole = message.guild.roles.find("name", "Sergeant");
					var member1 = (message.member.guild.members.find('id', buyerid))
					member1.addRole(lieutenantrole).catch(console.error);
					//member.send('Congratz you are now a Corporal');
					
					// Remove Recruite role
					member1.removeRole(sergeantrole).catch(console.error);
					
					//get admin channels info
					let admin = message.member.guild.channels.find('name','admin')
					//sends to the admin's channel
					admin.send(`@everyone ${buyer} has just Ranked up to Lieutenant, please update their RuneScape rank and put a message on here once you have done so. Thank you!`)
			}	
			
			if(args[1].toLocaleLowerCase() == 'captain'){
				if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
				}
				//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
				// Check if they have one of many roles
				if(!message.member.roles.some(r=>["Lieutenant"].includes(r.name)) ) {
				// doesnt have one of the roles
				return message.channel.send('You are not a Lieutenant');
				}
				if(totalcap2 < 6) return message.channel.send(`you have capped ${totalcap2} times and you need to have at least capped 6 time total to buy this rank`);
				if(totalevents2 < 6) return message.channel.send(`You haven't gone to enough clan events to buy this rank, you have gone to ${totalevents2} and need to have gone to at least 6 total`);
				if(userPoints5 < 75) return message.channel.send('You dont have enought Clan Loyalty Points to buy this Rank');
				
				bot.points[buyerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: buyer,
						time: userTime5,
						joined: joindate2,
						points: userPoints5 - 75,
						gp: usergp5,
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					}
					
					message.channel.send(`${buyer}, Congrats on Ranking up to Captain!`);
					
					fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
					if(err) throw err;
							});
					
					var lieutenantrole = message.guild.roles.find("name", "Lieutenant");
					var captainrole = message.guild.roles.find("name", "Captain");
					var member1 = (message.member.guild.members.find('id', buyerid))
					member1.addRole(captainrole).catch(console.error);
					//member.send('Congratz you are now a Corporal');
					
					// Remove Recruite role
					member1.removeRole(lieutenantrole).catch(console.error);
					
					//get admin channels info
					let admin = message.member.guild.channels.find('name','admin')
					//sends to the admin's channel
					admin.send(`@everyone ${buyer} has just Ranked up to Captain, please update their RuneScape rank and put a message on here once you have done so. Thank you!`)
			}	
			if(args[1].toLocaleLowerCase() == 'general'){
				if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
				}
				//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
				// Check if they have one of many roles
				if(!message.member.roles.some(r=>["Captain"].includes(r.name)) ) {
				// doesnt have one of the roles
				return message.channel.send('You are not a Captain');
				}
				if(totalcap2 < 8) return message.channel.send(`you have capped ${totalcap2} times and you need to have at least capped 8 time total to buy this rank`);
				if(totalevents2 < 9) return message.channel.send(`You haven't gone to enough clan events to buy this rank, you have gone to ${totalevents2} and need to have gone to at least 9 total`);
				if(userPoints5 < 100) return message.channel.send('You dont have enought Clan Loyalty Points to buy this Rank');
				
				bot.points[buyerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: buyer,
						time: userTime5,
						joined: joindate2,
						points: userPoints5 - 100,
						gp: usergp5,
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					}
					
					message.channel.send(`${buyer}, Congrats on Ranking up to General!`);
					
					fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
					if(err) throw err;
							});
					
					var generalrole = message.guild.roles.find("name", "General");
					var captainrole = message.guild.roles.find("name", "Captain");
					var member1 = (message.member.guild.members.find('id', buyerid))
					member1.addRole(generalrole).catch(console.error);
					//member.send('Congratz you are now a Corporal');
					
					// Remove Recruite role
					member1.removeRole(captainrole).catch(console.error);
					
					//get admin channels info
					let admin = message.member.guild.channels.find('name','admin')
					//sends to the admin's channel
					admin.send(`@everyone ${buyer} has just Ranked up to General, please update their RuneScape rank and put a message on here once you have done so. Thank you!`)
			}	
			
			if(args[1].toLocaleLowerCase() == 'admin'){
				if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
				}
				//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later');
				// Check if they have one of many roles
				if(!message.member.roles.some(r=>["General"].includes(r.name)) ) {
				// doesnt have one of the roles
				return message.channel.send('You are not a General');
				}
				if(totalcap2 < 12) return message.channel.send(`you have capped ${totalcap2} times and you need to have at least capped 12 time total to buy this rank`);
				if(totalevents2 < 12) return message.channel.send(`You haven't gone to enough clan events to buy this rank, you have gone to ${totalevents2} and need to have gone to at least 12 total`);
				if(userPoints5 < 150) return message.channel.send('You dont have enought Clan Loyalty Points to buy this Rank');
				if(recruits2 < 6) return message.channel.send(`You haven't recruited enough new clan members yet to buy this rank; you have Recruited ${recruites2}, and need a total of 6 to buy this rank`);
				
				bot.points[buyerid] = 
					{
						guild: message.guild.id,
						RecruitBy: RecruitBy2,
						RecruitByid: RecruitByid2,
						username: buyer,
						time: userTime5,
						joined: joindate2,
						points: userPoints5 - 150,
						gp: usergp5,
						caps: totalcap2,
						totalevents: totalevents2,
						recruited: recruits2
					}
					
					message.channel.send(`${buyer}, Congrats on Ranking up to Admin!`);
					
					fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
					if(err) throw err;
							});
					
					var generalrole = message.guild.roles.find("name", "General");
					var adminrole = message.guild.roles.find("name", "Admin");
					var member1 = (message.member.guild.members.find('id', buyerid))
					member1.addRole(adminrole).catch(console.error);
					//member.send('Congratz you are now a Corporal');
					
					// Remove Recruite role
					member1.removeRole(generalrole).catch(console.error);
					
					//get admin channels info
					let admin = message.member.guild.channels.find('name','admin')
					//sends to the admin's channel
					admin.send(`@everyone ${buyer} has just Ranked up to Admin, please update their RuneScape rank and put a message on here once you have done so. Thank you!`)
					admin.send(`Welcome to the Admin Channel ${buyer}, you are now in the heart of the clan thank you for all of your hard work!`);
			}
			
		break;}

		case 'cashout':{
		//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later')
            
		
		if(message.channel.id !== '389835788910723082') {
				message.delete()
				message.author.send('Please only use this in the Store channel, Thank you');
				return;
			}	
			
			let limbo = JSON.parse(fs.readFileSync("./limbo.json", "utf8"));
			let points5 = JSON.parse(fs.readFileSync("./pointsystem.json", "utf8"));
			
			var buyer = (message.author.username);
			var buyerid = (message.author.id);			
			
			let userPoints5 = points5[buyerid] ? points5[buyerid].points : 0;
			let userTime5 = points5[buyerid] ? points5[buyerid].time : 0;
			var RecruitBy2 = points5[buyerid] ? points5[buyerid].RecruitBy : 0;
			var RecruitByid2 = points5[buyerid] ? points5[buyerid].RecruitByid : 0;
			var joindate2 = points5[buyerid] ? points5[buyerid].joined : 0;
			var totalevents2 = points5[buyerid] ? points5[buyerid].totalevents : 0;
			var totalcap2 = points5[buyerid] ? points5[buyerid].caps : 0;
			var recruits2 = points5[buyerid] ? points5[buyerid].recruited : 0;
			
			let buyergp = points5[buyerid] ? points5[buyerid].gp : 0;
			if(isNaN(args[1])) return message.channel.send('please pick an amount to Withdraw from yor account');
			if(buyergp < args[1]) return message.channel.send('you dont have enough gp in your clan account to do this, please check your funds and try again');
			var newgp = (buyergp - args[1])

			bot.points[buyerid] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: buyer,
					time: userTime5,
					joined: joindate2,
					points: userPoints5,
					gp: newgp,
					caps: totalcap2,
					totalevents: totalevents2,
					recruited: recruits2
				};
				
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;		
								});
			var owedamount = limbo[buyer] ? limbo[buyer].owed : 0;
			var owed = parseInt(args[1])
			var newowed = owed + owedamount
			
			bot.limbo[buyer] = 
				{
					guild: message.guild.id,
					id: buyerid,
					owed: newowed
				};
				
			fs.writeFile("./limbo.json", JSON.stringify(bot.limbo, null, 4), err => {
			if(err) throw err;		
								});
			
			message.channel.send(`Thank you ${buyer}, your request is being processed`)
			
			//get admin channels info
					let admin = message.member.guild.channels.find('name','admin')
					//sends to the admin's channel
					admin.send(`@everyone ${buyer} wants to withdraw ${newowed} from there clan account, if you have the money and Ower or Deps are not on please pay them and the money will be added to your clan account, after you pay them do $paid ${buyer}, Thank you!`)
			
		break;}
		
		case 'account':{
			if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later')
           
	   if(message.channel.id !== '388418687977390081') {
				message.delete()
				message.author.send('Please only use this in the Admin channel, Thank you');
				return;
			}	
	   
	   
			let limbo1 = JSON.parse(fs.readFileSync("./limbo.json", "utf8"));
			
			if(!args[1]) return message.channel.send('please put who you payed')
			var owe = args[1]
			
			if(!limbo1[owe]) return message.channel.send('there is no one waiting to be payed out with that name');
			
		var owed = limbo1[owe] ? limbo1[owe].owed : 0;
		var buyer = (message.author.username);
		
			delete bot.limbo[owe]
	
			fs.writeFileSync('limbo.json', JSON.stringify(bot.limbo, null, 4));
			message.channel.send(`${buyer} has paid ${owe} using the Clan Account`);
	
		
		break;}
		
		case 'paid':{
			//if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later')
           
	   if(message.channel.id !== '388418687977390081') {
				message.delete()
				message.author.send('Please only use this in the Admin channel, Thank you');
				return;
			}	
	   
	   
			let limbo1 = JSON.parse(fs.readFileSync("./limbo.json", "utf8"));
			
			if(!args[1]) return message.channel.send('please put who you payed')
			var owe = (args[1].toLocaleLowerCase())
			
			if(!limbo1[owe]) return message.channel.send('there is no one waiting to be payed out with that name');
			
		var owed = limbo1[owe] ? limbo1[owe].owed : 0;
		
		let points6 = JSON.parse(fs.readFileSync("./pointsystem.json", "utf8"));
			
			var buyer = (message.author.username);
			var buyerid = (message.author.id);			
			
			let userPoints6 = points6[buyerid] ? points6[buyerid].points : 0;
			let userTime6 = points6[buyerid] ? points6[buyerid].time : 0;
			var RecruitBy2 = points6[buyerid] ? points6[buyerid].RecruitBy : 0;
			var RecruitByid2 = points6[buyerid] ? points6[buyerid].RecruitByid : 0;
			var joindate2 = points6[buyerid] ? points6[buyerid].joined : 0;
			var totalevents2 = points6[buyerid] ? points6[buyerid].totalevents : 0;
			var totalcap2 = points6[buyerid] ? points6[buyerid].caps : 0;
			var recruits2 = points6[buyerid] ? points6[buyerid].recruited : 0;
			
			let buyergp = points6[buyerid] ? points6[buyerid].gp : 0;
			
			bot.points[buyerid] = 
				{
					guild: message.guild.id,
					RecruitBy: RecruitBy2,
					RecruitByid: RecruitByid2,
					username: buyer,
					time: userTime6,
					joined: joindate2,
					points: userPoints6,
					gp: buyergp + owed,
					caps: totalcap2,
					totalevents: totalevents2,
					recruited: recruits2
				};
				
			fs.writeFile("./pointsystem.json", JSON.stringify(bot.points, null, 4), err => {
			if(err) throw err;		
								});
								
			delete bot.limbo[owe]
	
			fs.writeFileSync('limbo.json', JSON.stringify(bot.limbo, null, 4));
			message.channel.send(`${buyer} has got ${owed} add to there clan bank accout for paying ${owe}`);
	
		
		break;}
		
		case 'delete':{
			if(message.author.id !== BotSettings.Ownerid) return message.channel.send('this function is not set to release yet try back later')
            message.channel.bulkDelete(100)
		break;}

        default:
            message.channel.sendMessage('Invalid command');

    }
});

bot.login(BotSettings.Token);
/** music



function play(connection, message) {
    var Channels = channel[message.guild.id];

    Channels.dispatcher = connection.playstream(YTDL(Channels.queue[0], { filter: 'audioonly'));

    Channels.queue.shift();

    Channels.dispatcher.on('end', function () {
        if (Channels.queue[0]) play(connection, message)
        else connection.disconnect();

    });
}



var Channels = [];



//Bot looking for a word, and then will replay
bot.on('message', (message) => {
    if (message.content =='ping') {
    //message.reply('pong');
        message.channel.sendMessage('pong');
    }
});



//Music Functions of the bot
  case '.play'; {
    if (!args[1]) {
        message.channel.sendMessage('please provide a link');
        return

    }

    if (!message.member.vociechannel) {
        message.channel.sendmassage('you must be in a vocie channel');
        return
    }

    if (!channel[message.guild.id]) channel[message.guild.id] = {
        queue: []

    };

    var Channels = channel[message.guild.id];

    Channels.queue.push(args[1]);

    if (!message.guild.voiceconnection) message.member.vociechannel.join().then(function (connection) {
        play(connection, message);

    });
    break;
}
  case '.skip'; {
        var Channels = channel[message.guild.id];

        if (Channels.dispatcher) Channels.dispatcher.end();
        break;
    }
case '.stop'; {
    var Channels = channel[message.guild.id];

    if (massage.guild.voiceconnection) message.guild.voiceconnection.disconnect();

break;
  }



*/