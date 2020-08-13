/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

const sendUserInvitation = require('./lib/sendUserInvitation')
const commentWithStatus = require('./lib/commentWithStatus')

module.exports = (app) => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issue_comment.created', async (context) => {
    const bot = context.isBot
    const { body } = context.payload.comment
    const containsCommand = body.includes('/add-me')

    try {
      app.log('you are inside issue_comment.created')
      if (!bot && containsCommand) {
        console.log('from index... trying to invoke sendUserInvitation')
        const inviteResp = await sendUserInvitation(context)
        console.log('from index... trying to invoke commentWithStatus')
        const commentResp = await commentWithStatus(context)
        return { inviteResp, commentResp }
      }
    } catch (error) {
      app.log(error)
    }
  })
}
