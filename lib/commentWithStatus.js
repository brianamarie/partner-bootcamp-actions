async function commentWithStatus (context) {
  const commentPayload = {
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    issue_number: context.payload.issue.number,
    body: `${context.payload.comment.user.login} you have been added as a collaborator, please check your email an accept the invitation`
  }
  try {
    console.log(
      'attempting to create repsonse comment using commentWithStatus'
    )
    const commentResult = await context.github.issues.createComment(
      commentPayload
    )
    if (commentResult && commentResult.status === 201) {
      return 'comment successfully created'
    }
  } catch (error) {
    if (error.status === 404) {
      throw new Error('Oops, something went horribly wrong!')
    }
    console.log(error)
  }
}

module.exports = commentWithStatus
