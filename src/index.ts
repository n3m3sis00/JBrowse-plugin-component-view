import Plugin from "@gmod/jbrowse-core/Plugin";
import PluginManager from "@gmod/jbrowse-core/PluginManager";
import ViewType from "@gmod/jbrowse-core/pluggableElementTypes/ViewType";
import ReactComponent from "./components";
import {
  AbstractViewContainer,
  isAbstractMenuManager,
} from "@gmod/jbrowse-core/util";

export default class ArcRendererPlugin extends Plugin {
  name = "PhyloTreePlugin";
  install(pluginManager: PluginManager) {
    const { types } = pluginManager.lib["mobx-state-tree"];
    const stateModel = types
      .model({ type: types.literal("PhyloTreeView") })
      .actions(() => ({
        setWidth() {
          // unused but required by your view
        },
      }));

    pluginManager.addViewType(
      () => new ViewType({ name: "PhyloTreeView", stateModel, ReactComponent })
    );
  }
}