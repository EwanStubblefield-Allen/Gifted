import { AppState } from "../AppState.js"
import { gifService } from "../services/GifService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawGifs() {
  let template = ''
  AppState.results.forEach(r => template += `<img onclick="app.GifController.selectGif('${r.images.downsized.url}')" class="w-100 img-fluid my-2 selectable" src="${r.images.downsized.url}" alt="${r.id}"></img>`)
  console.log(template)
  setHTML('results', template)
}

export class GifController {
  constructor() {
    console.log('Gif Controller Loaded')

    AppState.on('results', _drawGifs)
  }

  selectGif(url) {
    setHTML('inputUrl', `<input type="text" name="url" id="urlId" value="${url}" required></input>`)
  }

  async getGif(event) {
    try {
      event.preventDefault()
      let form = event.target
      await gifService.getGif(getFormData(form))
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}