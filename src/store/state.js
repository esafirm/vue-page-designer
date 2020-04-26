export default {
  top: 0, // Add the initial ordinate of the component
  zoom: 64, // Canvas zoom percentage
  type: 'page', // Selected element type
  index: -1, // Selected element index
  uuid: null, // Selected element UUID
  counter: 0, // Counter to avoid duplication when naming the container copy

  originX: 0, // Horizontal initial value of selected element
  originY: 0, // Vertical initial value of selected element
  startX: 0, // Horizontal coord when the mouse is pressed
  startY: 0, // Vertical coord when the mouse is pressed
  moving: false, // Whether the component is moving (the reference line is only displayed when the component is moved)

  animation: [], // Animation library
  playState: false, // Animation playback state

  activeElement: {}, // The selected object is either a component or a page
  page: {
    page: true,
    title: 'Test Page', // Page title
    height: 1500, // Canvas height
    endTime: new Date(), // Deadline
    backgroundColor: '#fff'
  },
  widgets: [] // Elements
}
