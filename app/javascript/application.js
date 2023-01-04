import 'core-js/stable'
import 'regenerator-runtime/runtime'
import gameSearch from 'modules/new_game_search'
import 'modules/friend_search'
// Support component names relative to this directory:
var componentRequireContext = require.context('components', true)
var ReactRailsUJS = require('react_ujs')
ReactRailsUJS.useContext(componentRequireContext)
