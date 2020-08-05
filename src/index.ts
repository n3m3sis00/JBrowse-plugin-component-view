import Plugin from '@gmod/jbrowse-core/Plugin'
import PluginManager from '@gmod/jbrowse-core/PluginManager'
import ViewType from '@gmod/jbrowse-core/pluggableElementTypes/ViewType'
import {
  AbstractViewContainer,
  isAbstractMenuManager,
} from '@gmod/jbrowse-core/util'
import componentFactory from './components'





export default class ArcRendererPlugin extends Plugin {
  name = 'BarChartPlugin'
  install(pluginManager: PluginManager) {
    const {types} = pluginManager.lib['mobx-state-tree']
    const stateModel = types.model({ type: types.literal('BarChartView') }).actions(() => ({
      setWidth() {
        // unused but required by your view
      }
    }))
    const ReactComponent = componentFactory(pluginManager)

    pluginManager.addViewType(
       () => new ViewType({ name: 'BarChartView', stateModel, ReactComponent })
    )
  }
}
