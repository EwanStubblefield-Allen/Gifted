import { AppState } from "../AppState.js";
import { giftService } from "../services/GiftService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawGifts() {
  const gifts = AppState.gifts
  let template = ''
  gifts.forEach(g => {
    if (!g.opened) {
      template += g.ClosedTemplate
    } else {
      template += g.GiftTemplate
    }
  })
  setHTML('gifts', template)
  console.log(AppState.gifts)
}

export class GiftController {
  constructor() {
    console.log('Gift Controller Loaded')

    AppState.on('account', this.getGifts)
    AppState.on('gifts', _drawGifts)
  }

  async getGifts() {
    try {
      await giftService.getGifts()
    } catch (error) {
      console.error(error);
      Pop.error(error.message)
    }
  }

  async createGifts(event) {
    try {
      event.preventDefault()
      let form = event.target
      await giftService.createGifts(getFormData(form))
      form.reset()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async openGift(giftId) {
    try {
      await giftService.openGift(giftId)
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }

  async deleteGift(giftId) {
    try {
      let isSure = await Pop.confirm('Are you sure you want to delete?')
      if (!isSure) {
        return
      }
      await giftService.deleteGift(giftId)
    } catch (error) {
      console.log(error)
      Pop.error(error.message)
    }
  }
}