import chalk from 'chalk'

export default ({ io }) => {
  io.on(`connection`, socket => {
    console.log(chalk.yellow(
      `⚡ New connection!`
    ))
  })
}
