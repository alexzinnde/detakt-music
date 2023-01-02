import jwt, {JwtPayload} from 'jsonwebtoken'

type TokenPayload = {
  isAdmin: boolean
}

type DecodedToken = JwtPayload & {
  [k: string]: string | boolean
}

export default class TokenManager {
  private _secret: string

  constructor(secret: string) {
    this._secret = secret
  }

  async generateToken(payload: TokenPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this._secret, {expiresIn: '1h'}, (error, token) => {
        if (error) {
          return reject(error)
        }
        resolve(token)
      })
    })
  }

  async decodeToken(token: string): Promise<DecodedToken> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this._secret, (error, decoded) => {
        if (error) {
          return reject(error)
        }
        resolve(decoded as DecodedToken)
      })
    })
  }
}
