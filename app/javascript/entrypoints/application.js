import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css'

// Import jQuery and make it global for legacy code
import $ from 'jquery'
window.$ = window.jQuery = $

// Import Stimulus
import '../controllers'

// Import friend_search after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  import('../modules/friend_search')
})
