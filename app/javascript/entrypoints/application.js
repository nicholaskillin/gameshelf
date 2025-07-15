import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css'

// Import jQuery and make it global for legacy code
import $ from 'jquery'
window.$ = window.jQuery = $

// Import React UJS
import ReactRailsUJS from 'react_ujs'

// Import all React components with explicit extensions
import AppProvider from '../components/AppProvider.tsx'
import Index from '../components/Views/Games/Index.tsx'
import NewGameModal from '../components/shared/NewGameModal.tsx'
import ProfileHeader from '../components/shared/ProfileHeader.tsx'
import GameDetailsModal from '../components/Games/GameDetailsModal.jsx'
import DeleteUserButton from '../components/delete_user_button.jsx'

// Create a context function that mimics webpack's require.context
const componentMap = {
  './AppProvider': AppProvider,
  './Views/Games/Index': Index,
  './shared/ProfileHeader': ProfileHeader,
  './shared/NewGameModal': NewGameModal,
  './Games/GameDetailsModal': GameDetailsModal,
  './delete_user_button': DeleteUserButton,
}

const componentRequireContext = (path) => componentMap[path]
componentRequireContext.keys = () => Object.keys(componentMap)

// Make ReactRailsUJS globally available
window.ReactRailsUJS = ReactRailsUJS

// Use the context-based registration
ReactRailsUJS.useContext(componentRequireContext)

console.log('React UJS initialized with components:', componentRequireContext.keys())

// Import friend_search after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  import('../modules/friend_search')
})
