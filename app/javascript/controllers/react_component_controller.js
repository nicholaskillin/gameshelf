import { Controller } from "@hotwired/stimulus"
import { createElement } from "react"
import { createRoot } from "react-dom/client"

// Import all React components
import AppProvider from '../components/AppProvider.tsx'
import Index from '../components/Views/Games/Index.tsx'
import NewGameModal from '../components/shared/NewGameModal.tsx'
import ProfileHeader from '../components/shared/ProfileHeader.tsx'
import GameDetailsModal from '../components/Games/GameDetailsModal.jsx'
import DeleteUserButton from '../components/delete_user_button.jsx'

// Component registry
const components = {
  'AppProvider': AppProvider,
  'Views/Games/Index': Index,
  'shared/ProfileHeader': ProfileHeader,
  'shared/NewGameModal': NewGameModal,
  'Games/GameDetailsModal': GameDetailsModal,
  'delete_user_button': DeleteUserButton,
}

// Connects to data-controller="react-component"
export default class extends Controller {
  static values = { 
    component: String,
    props: Object 
  }

  connect() {
    this.mountComponent()
  }

  disconnect() {
    if (this.root) {
      this.root.unmount()
    }
  }

  mountComponent() {
    const Component = components[this.componentValue]
    
    if (!Component) {
      console.error(`React component "${this.componentValue}" not found`)
      return
    }

    const element = createElement(Component, this.propsValue || {})
    this.root = createRoot(this.element)
    this.root.render(element)
  }
}