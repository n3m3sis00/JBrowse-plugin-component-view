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
      setWidth(width:number) {
      }
    }))
    const ReactComponent = componentFactory(pluginManager)

    // const ReactComponent = () => {
    //   return <h1>"Hello bioinformatics world!"</h1>
    // }
    console.log('here')

    pluginManager.addViewType(
       () => new ViewType({ name: 'BarChartView', stateModel, ReactComponent })
    )
  }

  // configure(pluginManager: PluginManager) {
  //   if (isAbstractMenuManager(pluginManager.rootModel)) {
  //     pluginManager.rootModel.appendToSubMenu(['File', 'Add'], {
  //       label: 'Bar chart view',
  //       onClick: (session: AbstractViewContainer) => {
  //         session.addView('BarChartView', {})
  //       },
  //     })
  //   }
  // }
}
