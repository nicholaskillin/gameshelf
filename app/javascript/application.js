import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'modules/friend_search'

// Support component names relative to this directory:
const componentRequireContext = require.context('components', true)
const ReactRailsUJS = require('react_ujs')

ReactRailsUJS.useContext(componentRequireContext)
