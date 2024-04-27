"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(response) {
    return new Response(JSON.stringify(response), {
        headers: { "content-type": "application/json" },
    });
}
exports.default = default_1;
//# sourceMappingURL=respond.js.map