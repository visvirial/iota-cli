iota-cli
========

IOTA command line tool written in Node.js.

Install
-------

`iota-cli` can be installed via npm.

```
$ sudo npm install -g iota-cli
```

Usage
-----

```
$ iota help
```

to see available commands.

```
$ iota help COMMAND
```

to see argument list for that command.

For more specific API details, please see https://iota.readme.io/docs (caution: there are many undocumented APIs).

Sample usage:

```
$ iota getNodeInfo
{ appName: 'IRI',
  appVersion: '1.0.3',
  jreAvailableProcessors: 4,
  jreFreeMemory: 6217864,
  jreMaxMemory: 33030144,
  jreTotalMemory: 33030144,
  milestoneIndex: 6435,
  peers: 87,
  time: 1471873092296,
  tips: 20905,
  transactionsToRequest: 20,
  duration: 78 }

$ iota getTransfers AAA999999999999999999999999999999999999999999999999999999999999999999999999999999 1 
{ transfers: 
   [ { hash: 'EPKEODGOK9UFFQGBHWHQJGAKV9LQQAJPERCSFJPDPEYPFXLHQYDCKFFRIPAYMEVNIXIELAM9KOBWD9999',
       timestamp: '1464290097',
       address: 'BFWDAOEFAJPPIBZ9GVGXHQSLWWUESALE9ETMGRIPGJJYTKCEFYNCGFVZNKOXQSHSNGLRB9GZSKNNHQSWK',
       value: '0',
       persistence: 0 },
  (snip)
     { hash: 'SRQKA9ZLNNPXQEBZAWNWSHODWYEIYBBUSMMMHTZIBGYFTSYWPZHMWOXVLQGZTSQUUTZWZGQTMTR9W9999',
       timestamp: '1468967503',
       address: 'HZEMRJQHA9YQJZUXYUEQWDTESREWCFIMSXKO9GGDXCKXU9OFIZNVQOECWEHPCDTQOPJFFZFVFOHOBOZOK',
       value: '0',
       persistence: 100 } ],
  duration: 22595 }
```

