import jwt, {JwtPayload} from 'jsonwebtoken'

let tokenManager: TokenManager = null

class TokenManager {
  private _secret: string

  constructor(secret: string) {
    this._secret = secret
  }

  async generateToken(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this._secret, {expiresIn: '1h'}, (error, token) => {
        if (error) {
          return reject(error)
        }
        resolve(token)
      })
    })
  }

  async decodeToken(token: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this._secret, (error, decoded) => {
        if (error) {
          return reject(error)
        }
        resolve(decoded as JwtPayload)
      })
    })
  }
}


export default function(secret: string) {
  if (!tokenManager) {
    tokenManager = new TokenManager(secret)
  }
  return tokenManager
}