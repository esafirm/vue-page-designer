const generate = require('nanoid/generate')

export default {
  // Selected components and unselected
  select (state, payload) {
    state.uuid = payload.uuid
    if (payload.uuid === -1) {
      state.activeElement = state.page
      state.type = 'page'
    } else {
      let widget = state.widgets.find(w => w.uuid === payload.uuid)
      state.activeElement = widget
      state.type = widget.type
    }
  },

  // Set the initial value of the mousemove operation
  initmove (state, payload) {
    state.startX = payload.startX
    state.startY = payload.startY
    state.originX = payload.originX
    state.originY = payload.originY
    state.moving = true
  },

  // End of component movement
  stopmove (state) {
    state.moving = false
  },

  // Moving element
  move (state, payload) {
    var target = state.activeElement
    var dx = payload.x - state.startX
    var dy = payload.y - state.startY
    var left = state.originX + Math.floor(dx * 100 / state.zoom)
    var top = state.originY + Math.floor(dy * 100 / state.zoom)

    target.left = left > 0 ? left : 0
    target.top = top > 0 ? top : 0
  },

  // Adjust component size
  resize (state, payload) {
    var dx = payload.x - state.startX
    var dy = payload.y - state.startY
    var value

    if (payload.type === 'right') {
      value = state.originX + Math.floor(dx * 100 / state.zoom)
      state.activeElement.width = value > 10 ? value : 10
      return
    }

    if (payload.type === 'down') {
      value = state.originX + Math.floor(dy * 100 / state.zoom)
      state.activeElement.height = value > 10 ? value : 10
      return
    }

    if (payload.type === 'left') {
      var left = state.originX + Math.floor(dx * 100 / state.zoom)
      var width = state.originY - Math.floor(dx * 100 / state.zoom)
      state.activeElement.left = left > 0 ? left : 0
      state.activeElement.width = width > 10 ? width : 10
      return
    }

    if (payload.type === 'up') {
      var top = state.originX + Math.floor(dy * 100 / state.zoom)
      var height = state.originY - Math.floor(dy * 100 / state.zoom)
      state.activeElement.top = top > 0 ? top : 0
      state.activeElement.height = height > 10 ? height : 10
    }
  },

  // Copy Component
  copy (state, payload) {
    if (state.type !== 'page') {
      var copy = Object.assign({}, state.activeElement, {top: state.top, uuid: generate('1234567890abcdef', 10)})

      // Since the name of the container must be unique, copying the container requires processing
      if (state.activeElement.isContainer) {
        var name = state.activeElement.name
        if (name) {
          // Set the name of the container copy
          var copyName = name.split('-')[0] + '-' + state.counter
          copy.name = copyName

          // Copy pictures and text in the container
          for (var i = 0, len = state.widgets.length; i < len; i++) {
            if (state.widgets[i].belong === name) {
              state.widgets.push(
                Object.assign({}, state.widgets[i], { belong: copyName })
              )
            }
          }

          state.counter += 1
        }
      }

      state.widgets.push(copy)
    }
  },

  // Update the initial top value of the component
  updateSrollTop (state, top) {
    state.top = top
  },

  // Page zoom
  zoom (state, val) {
    state.zoom = val
  },

  // Initialize the selected object
  initActive (state) {
    state.activeElement = state.page
  },

  // Delete selected components
  delete (state) {
    var type = state.type
    if (type === 'page') return

    // If the container is deleted, the internal components must be combined
    if (state.activeElement.isContainer) {
      var name = state.activeElement.name

      for (var i = 0; i < state.widgets.length; i++) {
        if (state.widgets[i].belong === name) {
          state.widgets.splice(i, 1)
        }
      }
    }

    // Delete component
    state.widgets.splice(state.index, 1)

    // Reset activeElement
    state.activeElement = state.page
    // state.type = 'page'
    state.uuid = -1
  },

  // Add components
  addWidget (state, { data: data = null, item }) {
    let def = { top: state.top, uuid: generate('1234567890abcdef', 10) }
    let setting = JSON.parse(JSON.stringify(item.setting))

    if (setting.isContainer) {
      setting.name = def.uuid
    }

    if (data) {
      data.forEach(function (val) {
        state.widgets.push(Object.assign(setting, val, def))
      })
    } else {
      state.widgets.push(Object.assign(setting, def))
    }
  },

  // Replace picture
  replaceImage (state, payload) {
    state.activeElement.width = payload[0].width
    state.activeElement.url = payload[0].url
  },

  // Add container background image
  addContainerBackPic (state, payload) {
    state.activeElement.backPic = payload[0].url
    state.activeElement.backPicUrl = payload[0].src
    state.activeElement.width = payload[0].width
    state.activeElement.height = payload[0].height
  },

  // Add background image
  addBackPic (state, payload) {
    state.activeElement.backPic = payload[0].url
    state.activeElement.backPicUrl = payload[0].src
  },

  // Add animation
  addAnimation (state) {
    state.animation.push({
      name: '',
      duration: 3,
      delay: 0,
      iteration: 1,
      timing: 'linear',
      direction: 'normal',
      fill: 'none',
      keyframes: [
        {
          stop: 0,
          css: ''
        }
      ]
    })
  },

  // Add keyframe for animation
  addkeyframe (state, name) {
    state.animation.map(val => {
      if (val.name === name) {
        val.keyframes.push({
          stop: 0,
          css: ''
        })
      }
    })
  },

  // Animation play and stop
  setAnimation (state, status) {
    state.playState = status
  },

  updateData (state, {uuid, key, value}) {
    let widget = state.widgets.find(w => w.uuid === uuid)
    widget[key] = value
  }
}
