const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.C7FCoQrj.js","app":"_app/immutable/entry/app.Cb_Wybp9.js","imports":["_app/immutable/entry/start.C7FCoQrj.js","_app/immutable/chunks/entry.CPcRmZXC.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.Cb_Wybp9.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.DFTQtrJW.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-BOBooGNx.js')),
			__memo(() => import('./chunks/1-7hl3NAA2.js')),
			__memo(() => import('./chunks/2-BniLQ-Qq.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
