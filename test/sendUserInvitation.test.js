const nock = require('nock')

const { GitHubAPI } = require('probot')

const sendUserInvitation = require('../lib/sendUserInvitation')

describe('sendUserInvitation Method', () => {
  let context

  beforeEach(() => {
    nock.disableNetConnect()
    context = {
      payload: {
        repository: {
          name: 'octocorp',
          owner: {
            login: 'mona'
          }
        },
        comment: {
          user: {
            login: 'lisa'
          }
        }
      },
      github: new GitHubAPI()
    }
  })

  it('sucessfully sends a collaborator invite', async () => {
    const scopedNock = nock('https://api.github.com')
      .put('/repos/mona/octocorp/collaborators/lisa')
      .reply(201)

    const res = await sendUserInvitation(context)
    expect(scopedNock.isDone()).toBe(true)
    expect(res).toBe('invitation sucessfully sent')
  })

  it('does nothing if user is already a collaborator', async () => {
    const scopedNock = nock('https://api.github.com')
      .put('/repos/mona/octocorp/collaborators/lisa')
      .reply(204)

    const res = await sendUserInvitation(context)
    expect(scopedNock.isDone()).toBe(true)
    expect(res).toBe('User is already a collaborator')
  })

  it('throws with the expected error on a 404', async () => {
    const scopedNock = nock('https://api.github.com')
      .put('/repos/mona/octocorp/collaborators/lisa')
      .reply(404)

    await expect(sendUserInvitation(context)).rejects.toThrowError(
      'Oops, something went horribly wrong!'
    )
    expect(scopedNock.isDone()).toBe(true)
  })
  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
})
