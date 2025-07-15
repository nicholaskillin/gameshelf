// Import and register all your controllers from the importmap under controllers/*

import { application } from "./application"

// Register controllers here
import ReactComponentController from "./react_component_controller"
application.register("react-component", ReactComponentController)