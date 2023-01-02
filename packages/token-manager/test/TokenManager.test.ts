import TokenManager from '../src/TokenManager'

describe('TokenManager', () => {
  const tokenManager = new TokenManager('some-secret')
  it('generates a token string', async () => {
    const token = await tokenManager.generateToken({isAdmin: true})

    expect(token).not.toBe(undefined)
    expect(typeof token).toBe('string')
  })

  it('decodes a token string', async () => {
    const token = await tokenManager.generateToken({isAdmin: true})
    const decoded = await tokenManager.decodeToken(token)

    expect(decoded).not.toBe(undefined)
    expect(typeof decoded).toBe('object')
    expect(decoded.isAdmin).toBe(true)
  })
})
