import pm2 from 'pm2'
import { exit } from 'process'
import chalk from 'chalk'
import path from 'path'
import boxen from 'boxen'
import { localNetwork } from '..'

const instanceAlreadyExists = chalk.yellowBright.bold('Failed to start jaspar \n\n') 
  + chalk.whiteBright.bgRed.bold("× An active jaspar instance already exists!") 
  + chalk.yellowBright(`\n\n use: ${chalk.green.bold('jaspar stop')} \n to close the active instance and try again.`)

const failedProcess = (message:string) :string => chalk.yellowBright.bold('Failed to start jaspar \n\n') 
+ chalk.whiteBright.bgRed.bold("× " + message) 
+ chalk.yellowBright(`\n\n use: ${chalk.green.bold('jaspar run --port <port>')} \n to start a jaspar instance.`)

const boxenMessage = (msg:string) => {
  return boxen(msg, {
    padding: 1,
    margin: 1,
    borderStyle: 'bold',
    borderColor: 'red'
  })
}

const cmd_jaspar_run = (args: any) => {
  pm2.connect((error) => {
    if (error) {
      console.log(boxenMessage(failedProcess(error.message)))
    } else {
      pm2.list((error, processes) => {
        if (!error) {
          const jasparInstance = processes.find((pid) => pid.name === 'jaspar')
          if (jasparInstance) {
            console.log(boxenMessage(instanceAlreadyExists))
            exit(0)
          } else {
            pm2.start({
              name: 'jaspar',
              script: path.join(__dirname, '../server.js'),
              env: {
                jaspar_PORT: args.port
              }
            }, (error, proc:any) => {
              if (error) {
                console.log(boxenMessage(failedProcess(error.message)))
                exit(0)
              } else {
                const msg = chalk.yellowBright.bold(`${chalk.green('√') + chalk.green('√')} jaspar ${chalk.green('√') + chalk.green('√')}
    
    status: ${chalk.blue.bold(proc[0].pm2_env.status)}
    >>> http://${localNetwork}${args.port ? `:${args.port}` : ''} <<<
        
    Thank you for using jaspar
    Find me on GitHub: ${chalk.blue.bold('https://github.com/tenotea')}
    `)
        console.log(boxen(msg, {
          padding: 1,
          margin: 1,
          borderStyle: 'bold',
          borderColor: 'greenBright'
        }))
                exit(0)
              }
            })
          }
        } else {
          console.log(boxenMessage(failedProcess('Failed to list existing processes')))
        }
      })
    }
  })
}

export default cmd_jaspar_run
