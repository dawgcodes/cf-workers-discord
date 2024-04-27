"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const types_1 = require("./types");
const authorize = (applicationId, permissions) => async () => {
    const urlSearchParams = new URLSearchParams({
        client_id: applicationId,
        scope: 'bot applications.commands',
        permissions: permissions.compute(),
    });
    const redirectURL = new URL(types_1.OAuth2Routes.authorizationURL);
    redirectURL.search = urlSearchParams.toString();
    return new Response(null, {
        status: 302,
        headers: { Location: redirectURL.toString() },
    });
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map