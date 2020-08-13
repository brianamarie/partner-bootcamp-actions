async function sendUserInvitation (context) {
  const repoPayload = {
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    username: context.payload.comment.user.login
  }
  try {
    console.log('you are in sendUser invitation')
    const inviteResult = await context.github.repos.addCollaborator(
      repoPayload
    )
    if (inviteResult) {
      if (inviteResult.status === 201) {
        console.log('invite successful')
        return 'invitation sucessfully sent'
      } else if (inviteResult.status === 204) {
        console.log('invite failed to send')
        return 'User is already a collaborator'
      }
    }
  } catch (error) {
    if (error.status === 404) {
      throw new Error('Oops, something went horribly wrong!')
    }
  }
}

module.exports = sendUserInvitation
