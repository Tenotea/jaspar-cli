#!/usr/bin/env node
import Yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import os from 'os'
import cmd_jaspar_run from './commands/run'
import cmd_jaspar_stop from './commands/stop'

export const localNetwork = os.networkInterfaces()['Wi-Fi']?.find(ni => ni.family === 'IPv4')?.address

export const yargs = Yargs(hideBin(process.argv))
.usage(`Usage: jaspar [-port, -dir]`)
.option('port', {
  alias: 'p',
  type: 'string',
  description: 'Tells jaspar on what port the local server should run'
})
.command('run', 'Starts the jaspar explorer', ({ argv }) => {
  cmd_jaspar_run(argv)
}).command('stop', 'Shuts down the jaspar explorer server', () => {
  cmd_jaspar_stop()
}).argv
