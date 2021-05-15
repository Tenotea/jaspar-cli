import boxen from 'boxen'
import chalk from 'chalk'
import pm2 from 'pm2'
import { exit } from 'process'

const cmd_jaspar_stop = () => {
  pm2.delete('jaspar', (error) => {
    const msg = chalk.yellowBright.bold(`${chalk.green('√') + chalk.green('√')} jaspar ${chalk.green('√') + chalk.green('√')} \n\n status: ${chalk.red.bold('offline')} \n Thank you for using jaspar \n\n Find me on GitHub: ${chalk.blue.bold('https://github.com/tenotea')} 
`)
	
		console.log(boxen(msg, {
			padding: 1,
			margin: 1,
			borderStyle: 'bold',
			borderColor: 'greenBright'
		}))
      exit(0)
  })
}

export default cmd_jaspar_stop
