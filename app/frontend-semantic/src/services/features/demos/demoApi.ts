import axios from "axios"

class DemoApi {
  async getAllDemos() {
    return axios.get('/demo')
  }
}

export default new DemoApi()