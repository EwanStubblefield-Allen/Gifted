import { AppState } from "../AppState.js"
import { generateId } from "../utils/generateId.js"

export class Gift {
  constructor(data) {
    this.id = data.id || generateId()
    this.tag = data.tag
    this.url = data.url
    this.opened = data.opened || false
    this.creatorId = data.creatorId || ''
  }

  get GiftTemplate() {
    return `
    <div class="col-3 mx-2 p-2">
      <div class="card p-2" style="width: 14rem; min-height: 35vh;">
        <img class="card-img-top card-img"
          src="${this.url}"
          alt="Card image cap">
        <div class="card-body">
          <p class="card-text">${this.tag} 
          ${this.CheckUser}
        </div>
      </div>
    </div>`
  }

  get CheckUser() {
    let account = AppState.account
    console.log('account', account)
    console.log('creator id', this.creatorId)
    if (!account || account.id != this.creatorId) {
      return ''
    }
    return `<button onclick="app.GiftController.deleteGift('${this.id}')" class="mdi mdi-delete"></button></p>`
  }

  get ClosedTemplate() {
    return `
    <div class="col-3 mx-2 p-2 d-flex">
      <div onclick="app.GiftController.openGift('${this.id}')" class="card p-2 selectable" style="width: 14rem; min-height: 35vh;">
        <div class="card-body closed-img d-flex justify-content-center align-items-center">
          <p class="card-text bg-secondary p-2 rounded">${this.tag}</p>
        </div>
      </div>
    </div>`
  }
}