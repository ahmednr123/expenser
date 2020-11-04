const GlobalScopeModule = {
    HOME_SCREEN: "home_screen",
    SEARCH_SCREEN: "search_screen",
    TAGS_SCREEN: "tags_screen",
    ACCOUNT_SCREEN: "account_screen",

    POPUP: "popup"
};

const GlobalScopeHandler = {

    _globalScope: {},

    isValidModule: function (module) {
        for (let m in GlobalScopeModule) {
            if (GlobalScopeModule[m] == module) {
                return true;
            }
        }
        return false;
    },

    addScope: function (module, scope) {
        if (this.isValidModule(module)) {
            this._globalScope[module] = scope;
        }
    },

    getScope: function (module) {
        if (this.isValidModule(module)) {
            return this._globalScope[module];
        }
    }
}

export {GlobalScopeModule, GlobalScopeHandler};