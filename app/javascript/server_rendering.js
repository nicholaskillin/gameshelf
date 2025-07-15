// By default, this pack is loaded for server-side rendering.
// It must expose react_ujs as `ReactRailsUJS` and prepare a require context.
import ReactRailsUJS from "react_ujs";

// Import all React components with explicit extensions
import AppProvider from './components/AppProvider.tsx'
import Index from './components/Views/Games/Index.tsx'
import NewGameModal from './components/shared/NewGameModal.tsx'
import ProfileHeader from './components/shared/ProfileHeader.tsx'
import GameDetailsModal from './components/Games/GameDetailsModal.jsx'
import DeleteUserButton from './components/delete_user_button.jsx'

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

ReactRailsUJS.useContext(componentRequireContext);
