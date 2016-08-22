#!/usr/bin/env node

var request = require('request');

var config = {
	url: process.env.IOTA_URL || 'http://localhost:14265',
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
		cb(JSON.parse(body));
	});
};

if(process.argv.length < 3) {
	console.log('Usage: iota COMMAND [PARAMS..]');
	process.exit(1);
}

var idx = 2;
var command = process.argv[idx++];
var param = {
	command: command,
};
switch(command) {
	case 'setConfig':
		param.lines = [];
		for(; idx<process.argv.length; idx++) {
			params.lines.push(process.argv[idx]);
		}
		break;
	case 'getTransfers':
		param.seed = process.argv[idx++];
		param.securityLevel = +process.argv[idx++];
		break;
	case 'findTransactions':
		param.bundles = [];
		param.addresses = [];
		param.digests = [];
		param.approvees = [];
		for(; idx<process.argv.length; idx++) {
			var arg = process.argv[idx].split('=');
			if(arg.length != 2) {
				throw new Error('argument is malformed.');
			}
			param[arg[0]].push(arg[1]);
		}
		break;
	case 'getBundle':
		param.transaction = process.argv[idx++];
		break;
	case 'getTrytes':
		param.hashes = [];
		for(; idx<process.argv.length; idx++) {
			params.hashes.push(process.argv[idx]);
		}
		break;
	case 'analyzeTransactions':
		param.trytes = [];
		for(; idx<process.argv.length; idx++) {
			params.trytes.push(process.argv[idx]);
		}
		break;
	case 'getNewAddress':
		param.seed = process.argv[idx++];
		param.securityLevel = +process.argv[idx++];
		break;
	case 'prepareTransfers':
		param.seed = process.argv[idx++];
		param.securityLevel = +process.argv[idx++];
		param.transfers = [];
		for(; idx<process.argv.length; idx++) {
			params.transfers.push(process.argv[idx]);
		}
		break;
	case 'getTransactionsToApprove':
		param.trunkTransactionToApprove = process.argv[idx++];
		param.branchTransactionToApprove = process.argv[idx++];
		param.minWeightMagnitude = +process.argv[idx++];
		param.trytes = [];
		for(; idx<process.argv.length; idx++) {
			params.trytes.push(process.argv[idx]);
		}
		break;
	case 'boradcastTransactions':
		param.trytes = [];
		for(; idx<process.argv.length; idx++) {
			params.trytes.push(process.argv[idx]);
		}
		break;
	case 'storeTransactions':
		param.trytes = [];
		for(; idx<process.argv.length; idx++) {
			params.trytes.push(process.argv[idx]);
		}
		break;
	case 'transfer':
		console.warn('Warning: this command will be removed!');
		param.seed = process.argv[idx++];
		param.address = process.argv[idx++];
		param.value = +process.argv[idx++];
		param.message = process.argv[idx++];
		param.securityLevel = +process.argv[idx++];
		param.minWeightMagnitude = +process.argv[idx++];
		param.trytes = [];
		for(; idx<process.argv.length; idx++) {
			params.trytes.push(process.argv[idx]);
		}
		break;
	case 'replayTransfer':
		param.transaction = process.argv[idx++];
		break;
	default:
}

callApi(param, function(data) {
	console.log(data);
});

