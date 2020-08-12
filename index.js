/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

const sendUserInvitation = require('./lib/sendUserInvitation')
const commentWithStatus = require('./lib/commentWithStatus')

module.exports = (app) => {
  app.log('Yay, the app was loaded!')

  app.on('issue_comment.created', async (context) => {
    const bot = context.isBot
    const { body } = context.payload.comment
    const containsCommand = body.includes('/add-me')
    try {
      if (!bot && containsCommand) {
        await sendUserInvitation(context)

        await commentWithStatus(context)

        // return { inviteResp, commentResp }
      }
      if (bot) {
        return false
      }
    } catch (error) {
      app.log(error.message)
    }
  })
}
