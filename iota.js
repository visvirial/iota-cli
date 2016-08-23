#!/usr/bin/env node

var util = require('util');
var request = require('request');

var config = {
	url: process.env.IOTA_URL || 'http://localhost:14265',
};

const commands = {
	analyzeTransactions: {
		args: [],
		lists: ['trytes'],
		description: 'Decode trits-encoded transaction data.',
	},
	attachToTangle: {
		args: ['trunkTransaction', 'branchTransaction', '+minWeightMagnitude'],
		lists: ['trytes'],
		description: 'Attach transactions to a specified trunk/branch transaction.',
	},
	findTransactions: {
		args: [],
		lists: ['bundles', 'addresses', 'digests', 'approvees'],
		description: 'Search transactions.',
	},
	getAddress: {
		args: [],
		lists: ['publicKeys'],
		description: 'Compute addresses from specified public keys.',
	},
	getBundle: {
		args: ['transaction'],
		lists: [],
		description: 'Get the list of transactions bundled to a specified transaction.',
	},
	getInclusionStates: {
		args: [],
		lists: ['transactions', 'tips'],
		description: '',
	},
	getMilestone: {
		args: ['+index'],
		lists: [],
		description: 'Get milestone for specified index.',
	},
	getNewAddress: {
		args: ['seed', '+securityLevel'],
		lists: [],
		description: 'Derive a new address from the given seed.',
	},
	getNodeInfo: {
		args: [],
		lists: [],
		description: 'Get node information.',
	},
	getPeers: {
		args: [],
		lists: [],
		description: 'Get connected peer list.',
	},
	getPublicKey: {
		args: ['privateKey'],
		lists: [],
		description: 'Compute the public key from the given private key.',
	},
	getTips: {
		args: [],
		lists: [],
		description: 'Get current waiting tips.',
	},
	getTransactionsToApprove: {
		args: ['milestone'],
		lists: [],
		description: 'Get waiting transactions to be approved.',
	},
	getTransfers: {
		args: ['seed', '+securityLevel'],
		lists: [],
		description: 'Get list of transactions issued by a given seed.',
	},
	getTrytes: {
		args: [],
		lists: ['hashes'],
		description: 'Get trytes-encoded transactions from tx hashes.',
	},
	prepareTransfers: {
		args: ['seed', '+securityLevel'],
		lists: ['transfers'],
		description: 'Construct transaction data.',
	},
	pushTransactions: {
		args: [],
		lists: ['trytes'],
		description: 'Broadcast given transactions.',
	},
	pullTransactions: {
		args: [],
		lists: ['hashes'],
		description: 'Try to fetch transaction data from IOTA network.',
	},
	replayTransfer: {
		args: ['transaction'],
		lists: [],
		description: 'Re-broadcast transaction.',
	},
	storeTransactions: {
		args: [],
		lists: ['trytes'],
		description: 'Store given transactions locally.',
	},
	transfer: {
		args: ['seed', '+securityLevel', 'address', '+value', 'message', '+minWeightMagnitude'],
		lists: [],
		description: 'Transfer account balance.',
	},
};

var callApi = function(param, cb) {
	var body = JSON.stringify(param);
	var options = {
		url: config.url,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(body),
		},
		body: body,
	};
	request(options, function(err, res, body) {
		if(err) {
			console.error(err);
			throw new Error('Failed to connect to the IOTA server.');
		}
		cb(JSON.parse(body));
	});
};

var printGenericHelp = function(cmd) {
	console.log('Usage: iota COMMAND [PARAMS..]\n');
	console.log('Available commands are:\n');
	for(var cmd in commands) {
		console.log(util.format('%s - %s', cmd, commands[cmd].description));
	}
	console.log('\nSee details:\n\tiota help COMMAND\n');
};

if(process.argv.length < 3) {
	printGenericHelp();
	process.exit(1);
}

var idx = 2;
var cmd = process.argv[idx++];
var param = {
	command: cmd,
};

if(cmd == 'help') {
	var c = process.argv[idx++];
	if(!commands[c]) {
		printGenericHelp();
		process.exit(0);
	}
	var msg = '';
	msg += util.format('%s - %s\n\n', c, commands[c].description);
	msg += util.format('usage:\n\tiota %s ', c);
	commands[c].args.forEach(function(arg) {
		msg += util.format('%s ', arg);
	});
	if(commands[c].lists.length == 1) {
		var arg = commands[c].lists[0];
		msg += util.format('%s1 [%s2 ..]', arg, arg);
	} else {
		commands[c].lists.forEach(function(arg) {
			msg += util.format('%s=DATA1 [%s=DATA2 ..]', arg, arg);
		});
	}
	msg += '\n\n';
	console.log(msg);
	process.exit(0);
}

if(!commands[cmd]) {
	console.error('No such command.');
	process.exit(2);
}

// Process args.
for(var i in commands[cmd].args) {
	var a = commands[cmd].args[i];
	if(a[0] == '+') {
		param[a.substr(1)] = +process.argv[idx++];
	} else {
		param[a] = process.argv[idx++];
	}
}

// Process lists.
if(commands[cmd].lists.length == 1) {
	var a = commands[cmd].lists[0];
	param[a] = [];
	for(; idx<process.argv.length; idx++) {
		params[a].push(process.argv[idx]);
	}
} else {
	for(var i in commands[cmd].lists) {
		param[commands[cmd].lists[i]] = [];
	}
	for(; idx<process.argv.length; idx++) {
		var arg = process.argv[idx].split('=');
		if(arg.length != 2) {
			throw new Error('argument is malformed.');
		}
		param[arg[0]].push(arg[1]);
	}
}

callApi(param, function(data) {
	console.log(JSON.stringify(data, null, '\t'));
});

