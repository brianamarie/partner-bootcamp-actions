const nock = require('nock')

const { GitHubAPI } = require('probot')

const commentWithStatus = require('../lib/commentWithStatus')
const commentBody = {
  body:
    'lisa you have been added as a collaborator, please check your email an accept the invitation'
}
describe('commentWithStatus Method', () => {
  let context

  beforeEach(() => {
    nock.disableNetConnect()
    context = {
      payload: {
        issue: {
          number: 2,
          user: {
            login: 'mona'
          }
        },
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

  it('comments with expected body content', async () => {
    const scopedNock = nock('https://api.github.com')
      .post('/repos/mona/octocorp/issues/2/comments', (body) => {
        expect(body).toMatchObject(commentBody)
        return true
      })
      .reply(201)

    const res = await commentWithStatus(context)
    expect(scopedNock.isDone()).toBe(true)
    expect(res).toBe('comment successfully creaated')
  })

  it('throws with the expected error on a 404', async () => {
    const scopedNock = nock('https://api.github.com')
      .post('/repos/mona/octocorp/issues/2/comments', (body) => {
        expect(body).toMatchObject(commentBody)
        return true
      })
      .reply(404)

    await expect(commentWithStatus(context)).rejects.toThrowError(
      'Oops, something went horribly wrong!'
    )
    expect(scopedNock.isDone()).toBe(true)
  })
  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
})
