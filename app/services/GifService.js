import { AppState } from "../AppState.js"
import { gifApi } from "./AxiosService.js"

class GifService {
  async getGif(data) {
    console.log(data.url)
    const res = await gifApi(`/search?q=${data.url}`)
    AppState.results = res.data.data
    console.log(AppState.results)
  }
}

export const gifService = new GifService()