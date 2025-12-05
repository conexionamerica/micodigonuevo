// vite.config.js
import path3 from "node:path";
import react from "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/node_modules/@vitejs/plugin-react/dist/index.js";
import { createLogger, defineConfig } from "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/node_modules/vite/dist/node/index.js";

// plugins/visual-editor/vite-plugin-react-inline-editor.js
import path2 from "path";
import { parse as parse2 } from "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/node_modules/@babel/parser/lib/index.js";
import traverseBabel2 from "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/node_modules/@babel/traverse/lib/index.js";
import * as t from "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/node_modules/@babel/types/lib/index.js";
import fs2 from "fs";

// plugins/utils/ast-utils.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import generate from "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/node_modules/@babel/generator/lib/index.js";
import { parse } from "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/node_modules/@babel/parser/lib/index.js";
import traverseBabel from "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/node_modules/@babel/traverse/lib/index.js";
import {
  isJSXIdentifier,
  isJSXMemberExpression
} from "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/node_modules/@babel/types/lib/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/plugins/utils/ast-utils.js";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname2 = path.dirname(__filename);
var VITE_PROJECT_ROOT = path.resolve(__dirname2, "../..");
function validateFilePath(filePath) {
  if (!filePath) {
    return { isValid: false, error: "Missing filePath" };
  }
  const absoluteFilePath = path.resolve(VITE_PROJECT_ROOT, filePath);
  if (filePath.includes("..") || !absoluteFilePath.startsWith(VITE_PROJECT_ROOT) || absoluteFilePath.includes("node_modules")) {
    return { isValid: false, error: "Invalid path" };
  }
  if (!fs.existsSync(absoluteFilePath)) {
    return { isValid: false, error: "File not found" };
  }
  return { isValid: true, absolutePath: absoluteFilePath };
}
function parseFileToAST(absoluteFilePath) {
  const content = fs.readFileSync(absoluteFilePath, "utf-8");
  return parse(content, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
    errorRecovery: true
  });
}
function findJSXElementAtPosition(ast, line, column) {
  let targetNodePath = null;
  let closestNodePath = null;
  let closestDistance = Infinity;
  const allNodesOnLine = [];
  const visitor = {
    JSXOpeningElement(path4) {
      const node = path4.node;
      if (node.loc) {
        if (node.loc.start.line === line && Math.abs(node.loc.start.column - column) <= 1) {
          targetNodePath = path4;
          path4.stop();
          return;
        }
        if (node.loc.start.line === line) {
          allNodesOnLine.push({
            path: path4,
            column: node.loc.start.column,
            distance: Math.abs(node.loc.start.column - column)
          });
        }
        if (node.loc.start.line === line) {
          const distance = Math.abs(node.loc.start.column - column);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestNodePath = path4;
          }
        }
      }
    },
    // Also check JSXElement nodes that contain the position
    JSXElement(path4) {
      var _a;
      const node = path4.node;
      if (!node.loc) {
        return;
      }
      if (node.loc.start.line > line || node.loc.end.line < line) {
        return;
      }
      if (!((_a = path4.node.openingElement) == null ? void 0 : _a.loc)) {
        return;
      }
      const openingLine = path4.node.openingElement.loc.start.line;
      const openingCol = path4.node.openingElement.loc.start.column;
      if (openingLine === line) {
        const distance = Math.abs(openingCol - column);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestNodePath = path4.get("openingElement");
        }
        return;
      }
      if (openingLine < line) {
        const distance = (line - openingLine) * 100;
        if (distance < closestDistance) {
          closestDistance = distance;
          closestNodePath = path4.get("openingElement");
        }
      }
    }
  };
  traverseBabel.default(ast, visitor);
  const threshold = closestDistance < 100 ? 50 : 500;
  return targetNodePath || (closestDistance <= threshold ? closestNodePath : null);
}
function generateCode(node, options = {}) {
  const generateFunction = generate.default || generate;
  const output = generateFunction(node, options);
  return output.code;
}
function generateSourceWithMap(ast, sourceFileName, originalCode) {
  const generateFunction = generate.default || generate;
  return generateFunction(ast, {
    sourceMaps: true,
    sourceFileName
  }, originalCode);
}

// plugins/visual-editor/vite-plugin-react-inline-editor.js
var EDITABLE_HTML_TAGS = ["a", "Button", "button", "p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "label", "Label", "img"];
function parseEditId(editId) {
  const parts = editId.split(":");
  if (parts.length < 3) {
    return null;
  }
  const column = parseInt(parts.at(-1), 10);
  const line = parseInt(parts.at(-2), 10);
  const filePath = parts.slice(0, -2).join(":");
  if (!filePath || isNaN(line) || isNaN(column)) {
    return null;
  }
  return { filePath, line, column };
}
function checkTagNameEditable(openingElementNode, editableTagsList) {
  if (!openingElementNode || !openingElementNode.name)
    return false;
  const nameNode = openingElementNode.name;
  if (nameNode.type === "JSXIdentifier" && editableTagsList.includes(nameNode.name)) {
    return true;
  }
  if (nameNode.type === "JSXMemberExpression" && nameNode.property && nameNode.property.type === "JSXIdentifier" && editableTagsList.includes(nameNode.property.name)) {
    return true;
  }
  return false;
}
function validateImageSrc(openingNode) {
  if (!openingNode || !openingNode.name || openingNode.name.name !== "img") {
    return { isValid: true, reason: null };
  }
  const hasPropsSpread = openingNode.attributes.some(
    (attr) => t.isJSXSpreadAttribute(attr) && attr.argument && t.isIdentifier(attr.argument) && attr.argument.name === "props"
  );
  if (hasPropsSpread) {
    return { isValid: false, reason: "props-spread" };
  }
  const srcAttr = openingNode.attributes.find(
    (attr) => t.isJSXAttribute(attr) && attr.name && attr.name.name === "src"
  );
  if (!srcAttr) {
    return { isValid: false, reason: "missing-src" };
  }
  if (!t.isStringLiteral(srcAttr.value)) {
    return { isValid: false, reason: "dynamic-src" };
  }
  if (!srcAttr.value.value || srcAttr.value.value.trim() === "") {
    return { isValid: false, reason: "empty-src" };
  }
  return { isValid: true, reason: null };
}
function inlineEditPlugin() {
  return {
    name: "vite-inline-edit-plugin",
    enforce: "pre",
    transform(code, id) {
      if (!/\.(jsx|tsx)$/.test(id) || !id.startsWith(VITE_PROJECT_ROOT) || id.includes("node_modules")) {
        return null;
      }
      const relativeFilePath = path2.relative(VITE_PROJECT_ROOT, id);
      const webRelativeFilePath = relativeFilePath.split(path2.sep).join("/");
      try {
        const babelAst = parse2(code, {
          sourceType: "module",
          plugins: ["jsx", "typescript"],
          errorRecovery: true
        });
        let attributesAdded = 0;
        traverseBabel2.default(babelAst, {
          enter(path4) {
            if (path4.isJSXOpeningElement()) {
              const openingNode = path4.node;
              const elementNode = path4.parentPath.node;
              if (!openingNode.loc) {
                return;
              }
              const alreadyHasId = openingNode.attributes.some(
                (attr) => t.isJSXAttribute(attr) && attr.name.name === "data-edit-id"
              );
              if (alreadyHasId) {
                return;
              }
              const isCurrentElementEditable = checkTagNameEditable(openingNode, EDITABLE_HTML_TAGS);
              if (!isCurrentElementEditable) {
                return;
              }
              const imageValidation = validateImageSrc(openingNode);
              if (!imageValidation.isValid) {
                const disabledAttribute = t.jsxAttribute(
                  t.jsxIdentifier("data-edit-disabled"),
                  t.stringLiteral("true")
                );
                openingNode.attributes.push(disabledAttribute);
                attributesAdded++;
                return;
              }
              let shouldBeDisabledDueToChildren = false;
              if (t.isJSXElement(elementNode) && elementNode.children) {
                const hasPropsSpread = openingNode.attributes.some(
                  (attr) => t.isJSXSpreadAttribute(attr) && attr.argument && t.isIdentifier(attr.argument) && attr.argument.name === "props"
                );
                const hasDynamicChild = elementNode.children.some(
                  (child) => t.isJSXExpressionContainer(child)
                );
                if (hasDynamicChild || hasPropsSpread) {
                  shouldBeDisabledDueToChildren = true;
                }
              }
              if (!shouldBeDisabledDueToChildren && t.isJSXElement(elementNode) && elementNode.children) {
                const hasEditableJsxChild = elementNode.children.some((child) => {
                  if (t.isJSXElement(child)) {
                    return checkTagNameEditable(child.openingElement, EDITABLE_HTML_TAGS);
                  }
                  return false;
                });
                if (hasEditableJsxChild) {
                  shouldBeDisabledDueToChildren = true;
                }
              }
              if (shouldBeDisabledDueToChildren) {
                const disabledAttribute = t.jsxAttribute(
                  t.jsxIdentifier("data-edit-disabled"),
                  t.stringLiteral("true")
                );
                openingNode.attributes.push(disabledAttribute);
                attributesAdded++;
                return;
              }
              if (t.isJSXElement(elementNode) && elementNode.children && elementNode.children.length > 0) {
                let hasNonEditableJsxChild = false;
                for (const child of elementNode.children) {
                  if (t.isJSXElement(child)) {
                    if (!checkTagNameEditable(child.openingElement, EDITABLE_HTML_TAGS)) {
                      hasNonEditableJsxChild = true;
                      break;
                    }
                  }
                }
                if (hasNonEditableJsxChild) {
                  const disabledAttribute = t.jsxAttribute(
                    t.jsxIdentifier("data-edit-disabled"),
                    t.stringLiteral("true")
                  );
                  openingNode.attributes.push(disabledAttribute);
                  attributesAdded++;
                  return;
                }
              }
              let currentAncestorCandidatePath = path4.parentPath.parentPath;
              while (currentAncestorCandidatePath) {
                const ancestorJsxElementPath = currentAncestorCandidatePath.isJSXElement() ? currentAncestorCandidatePath : currentAncestorCandidatePath.findParent((p) => p.isJSXElement());
                if (!ancestorJsxElementPath) {
                  break;
                }
                if (checkTagNameEditable(ancestorJsxElementPath.node.openingElement, EDITABLE_HTML_TAGS)) {
                  return;
                }
                currentAncestorCandidatePath = ancestorJsxElementPath.parentPath;
              }
              const line = openingNode.loc.start.line;
              const column = openingNode.loc.start.column + 1;
              const editId = `${webRelativeFilePath}:${line}:${column}`;
              const idAttribute = t.jsxAttribute(
                t.jsxIdentifier("data-edit-id"),
                t.stringLiteral(editId)
              );
              openingNode.attributes.push(idAttribute);
              attributesAdded++;
            }
          }
        });
        if (attributesAdded > 0) {
          const output = generateSourceWithMap(babelAst, webRelativeFilePath, code);
          return { code: output.code, map: output.map };
        }
        return null;
      } catch (error) {
        console.error(`[vite][visual-editor] Error transforming ${id}:`, error);
        return null;
      }
    },
    // Updates source code based on the changes received from the client
    configureServer(server) {
      server.middlewares.use("/api/apply-edit", async (req, res, next) => {
        if (req.method !== "POST")
          return next();
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", async () => {
          var _a;
          let absoluteFilePath = "";
          try {
            const { editId, newFullText } = JSON.parse(body);
            if (!editId || typeof newFullText === "undefined") {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Missing editId or newFullText" }));
            }
            const parsedId = parseEditId(editId);
            if (!parsedId) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Invalid editId format (filePath:line:column)" }));
            }
            const { filePath, line, column } = parsedId;
            const validation = validateFilePath(filePath);
            if (!validation.isValid) {
              res.writeHead(400, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: validation.error }));
            }
            absoluteFilePath = validation.absolutePath;
            const originalContent = fs2.readFileSync(absoluteFilePath, "utf-8");
            const babelAst = parseFileToAST(absoluteFilePath);
            const targetNodePath = findJSXElementAtPosition(babelAst, line, column + 1);
            if (!targetNodePath) {
              res.writeHead(404, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Target node not found by line/column", editId }));
            }
            const targetOpeningElement = targetNodePath.node;
            const parentElementNode = (_a = targetNodePath.parentPath) == null ? void 0 : _a.node;
            const isImageElement = targetOpeningElement.name && targetOpeningElement.name.name === "img";
            let beforeCode = "";
            let afterCode = "";
            let modified = false;
            if (isImageElement) {
              beforeCode = generateCode(targetOpeningElement);
              const srcAttr = targetOpeningElement.attributes.find(
                (attr) => t.isJSXAttribute(attr) && attr.name && attr.name.name === "src"
              );
              if (srcAttr && t.isStringLiteral(srcAttr.value)) {
                srcAttr.value = t.stringLiteral(newFullText);
                modified = true;
                afterCode = generateCode(targetOpeningElement);
              }
            } else {
              if (parentElementNode && t.isJSXElement(parentElementNode)) {
                beforeCode = generateCode(parentElementNode);
                parentElementNode.children = [];
                if (newFullText && newFullText.trim() !== "") {
                  const newTextNode = t.jsxText(newFullText);
                  parentElementNode.children.push(newTextNode);
                }
                modified = true;
                afterCode = generateCode(parentElementNode);
              }
            }
            if (!modified) {
              res.writeHead(409, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ error: "Could not apply changes to AST." }));
            }
            const webRelativeFilePath = path2.relative(VITE_PROJECT_ROOT, absoluteFilePath).split(path2.sep).join("/");
            const output = generateSourceWithMap(babelAst, webRelativeFilePath, originalContent);
            const newContent = output.code;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              success: true,
              newFileContent: newContent,
              beforeCode,
              afterCode
            }));
          } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal server error during edit application." }));
          }
        });
      });
    }
  };
}

// plugins/visual-editor/vite-plugin-edit-mode.js
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// plugins/visual-editor/visual-editor-config.js
var EDIT_MODE_STYLES = `
	#root[data-edit-mode-enabled="true"] [data-edit-id] {
		cursor: pointer; 
		outline: 2px dashed #357DF9; 
		outline-offset: 2px;
		min-height: 1em;
	}
	#root[data-edit-mode-enabled="true"] img[data-edit-id] {
		outline-offset: -2px;
	}
	#root[data-edit-mode-enabled="true"] {
		cursor: pointer;
	}
	#root[data-edit-mode-enabled="true"] [data-edit-id]:hover {
		background-color: #357DF933;
		outline-color: #357DF9; 
	}

	@keyframes fadeInTooltip {
		from {
			opacity: 0;
			transform: translateY(5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	#inline-editor-disabled-tooltip {
		display: none; 
		opacity: 0; 
		position: absolute;
		background-color: #1D1E20;
		color: white;
		padding: 4px 8px;
		border-radius: 8px;
		z-index: 10001;
		font-size: 14px;
		border: 1px solid #3B3D4A;
		max-width: 184px;
		text-align: center;
	}

	#inline-editor-disabled-tooltip.tooltip-active {
		display: block;
		animation: fadeInTooltip 0.2s ease-out forwards;
	}
`;

// plugins/visual-editor/vite-plugin-edit-mode.js
var __vite_injected_original_import_meta_url2 = "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/plugins/visual-editor/vite-plugin-edit-mode.js";
var __filename2 = fileURLToPath2(__vite_injected_original_import_meta_url2);
var __dirname3 = resolve(__filename2, "..");
function inlineEditDevPlugin() {
  return {
    name: "vite:inline-edit-dev",
    apply: "serve",
    transformIndexHtml() {
      const scriptPath = resolve(__dirname3, "edit-mode-script.js");
      const scriptContent = readFileSync(scriptPath, "utf-8");
      return [
        {
          tag: "script",
          attrs: { type: "module" },
          children: scriptContent,
          injectTo: "body"
        },
        {
          tag: "style",
          children: EDIT_MODE_STYLES,
          injectTo: "head"
        }
      ];
    }
  };
}

// plugins/vite-plugin-iframe-route-restoration.js
function iframeRouteRestorationPlugin() {
  return {
    name: "vite:iframe-route-restoration",
    apply: "serve",
    transformIndexHtml() {
      const script = `
      const ALLOWED_PARENT_ORIGINS = [
          "https://horizons.hostinger.com",
          "https://horizons.hostinger.dev",
          "https://horizons-frontend-local.hostinger.dev",
      ];

        // Check to see if the page is in an iframe
        if (window.self !== window.top) {
          const STORAGE_KEY = 'horizons-iframe-saved-route';

          const getCurrentRoute = () => location.pathname + location.search + location.hash;

          const save = () => {
            try {
              const currentRoute = getCurrentRoute();
              sessionStorage.setItem(STORAGE_KEY, currentRoute);
              window.parent.postMessage({message: 'route-changed', route: currentRoute}, '*');
            } catch {}
          };

          const replaceHistoryState = (url) => {
            try {
              history.replaceState(null, '', url);
              window.dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
              return true;
            } catch {}
            return false;
          };

          const restore = () => {
            try {
              const saved = sessionStorage.getItem(STORAGE_KEY);
              if (!saved) return;

              if (!saved.startsWith('/')) {
                sessionStorage.removeItem(STORAGE_KEY);
                return;
              }

              const current = getCurrentRoute();
              if (current !== saved) {
                if (!replaceHistoryState(saved)) {
                  replaceHistoryState('/');
                }

                requestAnimationFrame(() => setTimeout(() => {
                  try {
                    const text = (document.body?.innerText || '').trim();

                    // If the restored route results in too little content, assume it is invalid and navigate home
                    if (text.length < 50) {
                      replaceHistoryState('/');
                    }
                  } catch {}
                }, 1000));
              }
            } catch {}
          };

          const originalPushState = history.pushState;
          history.pushState = function(...args) {
            originalPushState.apply(this, args);
            save();
          };

          const originalReplaceState = history.replaceState;
          history.replaceState = function(...args) {
            originalReplaceState.apply(this, args);
            save();
          };

          const getParentOrigin = () => {
              if (
                  window.location.ancestorOrigins &&
                  window.location.ancestorOrigins.length > 0
              ) {
                  return window.location.ancestorOrigins[0];
              }

              if (document.referrer) {
                  try {
                      return new URL(document.referrer).origin;
                  } catch (e) {
                      console.warn("Invalid referrer URL:", document.referrer);
                  }
              }

              return null;
          };

          window.addEventListener('popstate', save);
          window.addEventListener('hashchange', save);
          window.addEventListener("message", function (event) {
              const parentOrigin = getParentOrigin();

              if (event.data?.type === "redirect-home" && parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) {
                const saved = sessionStorage.getItem(STORAGE_KEY);

                if(saved && saved !== '/') {
                  replaceHistoryState('/')
                }
              }
          });

          restore();
        }
      `;
      return [
        {
          tag: "script",
          attrs: { type: "module" },
          children: script,
          injectTo: "head"
        }
      ];
    }
  };
}

// plugins/selection-mode/vite-plugin-selection-mode.js
import { readFileSync as readFileSync2 } from "node:fs";
import { resolve as resolve2 } from "node:path";
import { fileURLToPath as fileURLToPath3 } from "node:url";
var __vite_injected_original_import_meta_url3 = "file:///C:/Users/USER/Downloads/horizons-export-5codigo%20para%20git97-257016665a0b%20(2)/plugins/selection-mode/vite-plugin-selection-mode.js";
var __filename3 = fileURLToPath3(__vite_injected_original_import_meta_url3);
var __dirname4 = resolve2(__filename3, "..");
function selectionModePlugin() {
  return {
    name: "vite:selection-mode",
    apply: "serve",
    transformIndexHtml() {
      const scriptPath = resolve2(__dirname4, "selection-mode-script.js");
      const scriptContent = readFileSync2(scriptPath, "utf-8");
      return [
        {
          tag: "script",
          attrs: { type: "module" },
          children: scriptContent,
          injectTo: "body"
        }
      ];
    }
  };
}

// vite.config.js
var __vite_injected_original_dirname = "C:\\Users\\USER\\Downloads\\horizons-export-5codigo para git97-257016665a0b (2)";
var isDev = process.env.NODE_ENV !== "production";
var configHorizonsViteErrorHandler = `
const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const addedNode of mutation.addedNodes) {
			if (
				addedNode.nodeType === Node.ELEMENT_NODE &&
				(
					addedNode.tagName?.toLowerCase() === 'vite-error-overlay' ||
					addedNode.classList?.contains('backdrop')
				)
			) {
				handleViteOverlay(addedNode);
			}
		}
	}
});

observer.observe(document.documentElement, {
	childList: true,
	subtree: true
});

function handleViteOverlay(node) {
	if (!node.shadowRoot) {
		return;
	}

	const backdrop = node.shadowRoot.querySelector('.backdrop');

	if (backdrop) {
		const overlayHtml = backdrop.outerHTML;
		const parser = new DOMParser();
		const doc = parser.parseFromString(overlayHtml, 'text/html');
		const messageBodyElement = doc.querySelector('.message-body');
		const fileElement = doc.querySelector('.file');
		const messageText = messageBodyElement ? messageBodyElement.textContent.trim() : '';
		const fileText = fileElement ? fileElement.textContent.trim() : '';
		const error = messageText + (fileText ? ' File:' + fileText : '');

		window.parent.postMessage({
			type: 'horizons-vite-error',
			error,
		}, '*');
	}
}
`;
var configHorizonsRuntimeErrorHandler = `
window.onerror = (message, source, lineno, colno, errorObj) => {
	const errorDetails = errorObj ? JSON.stringify({
		name: errorObj.name,
		message: errorObj.message,
		stack: errorObj.stack,
		source,
		lineno,
		colno,
	}) : null;

	window.parent.postMessage({
		type: 'horizons-runtime-error',
		message,
		error: errorDetails
	}, '*');
};
`;
var configHorizonsConsoleErrroHandler = `
const originalConsoleError = console.error;
console.error = function(...args) {
	originalConsoleError.apply(console, args);

	let errorString = '';

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg instanceof Error) {
			errorString = arg.stack || \`\${arg.name}: \${arg.message}\`;
			break;
		}
	}

	if (!errorString) {
		errorString = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
	}

	window.parent.postMessage({
		type: 'horizons-console-error',
		error: errorString
	}, '*');
};
`;
var configWindowFetchMonkeyPatch = `
const originalFetch = window.fetch;

window.fetch = function(...args) {
	const url = args[0] instanceof Request ? args[0].url : args[0];

	// Skip WebSocket URLs
	if (url.startsWith('ws:') || url.startsWith('wss:')) {
		return originalFetch.apply(this, args);
	}

	return originalFetch.apply(this, args)
		.then(async response => {
			const contentType = response.headers.get('Content-Type') || '';

			// Exclude HTML document responses
			const isDocumentResponse =
				contentType.includes('text/html') ||
				contentType.includes('application/xhtml+xml');

			if (!response.ok && !isDocumentResponse) {
					const responseClone = response.clone();
					const errorFromRes = await responseClone.text();
					const requestUrl = response.url;
					console.error(\`Fetch error from \${requestUrl}: \${errorFromRes}\`);
			}

			return response;
		})
		.catch(error => {
			if (!url.match(/.html?$/i)) {
				console.error(error);
			}

			throw error;
		});
};
`;
var configNavigationHandler = `
if (window.navigation && window.self !== window.top) {
	window.navigation.addEventListener('navigate', (event) => {
		const url = event.destination.url;

		try {
			const destinationUrl = new URL(url);
			const destinationOrigin = destinationUrl.origin;
			const currentOrigin = window.location.origin;

			if (destinationOrigin === currentOrigin) {
				return;
			}
		} catch (error) {
			return;
		}

		window.parent.postMessage({
			type: 'horizons-navigation-error',
			url,
		}, '*');
	});
}
`;
var addTransformIndexHtml = {
  name: "add-transform-index-html",
  transformIndexHtml(html) {
    const tags = [
      {
        tag: "script",
        attrs: { type: "module" },
        children: configHorizonsRuntimeErrorHandler,
        injectTo: "head"
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configHorizonsViteErrorHandler,
        injectTo: "head"
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configHorizonsConsoleErrroHandler,
        injectTo: "head"
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configWindowFetchMonkeyPatch,
        injectTo: "head"
      },
      {
        tag: "script",
        attrs: { type: "module" },
        children: configNavigationHandler,
        injectTo: "head"
      }
    ];
    if (!isDev && process.env.TEMPLATE_BANNER_SCRIPT_URL && process.env.TEMPLATE_REDIRECT_URL) {
      tags.push(
        {
          tag: "script",
          attrs: {
            src: process.env.TEMPLATE_BANNER_SCRIPT_URL,
            "template-redirect-url": process.env.TEMPLATE_REDIRECT_URL
          },
          injectTo: "head"
        }
      );
    }
    return {
      html,
      tags
    };
  }
};
console.warn = () => {
};
var logger = createLogger();
var loggerError = logger.error;
logger.error = (msg, options) => {
  var _a;
  if ((_a = options == null ? void 0 : options.error) == null ? void 0 : _a.toString().includes("CssSyntaxError: [postcss]")) {
    return;
  }
  loggerError(msg, options);
};
var vite_config_default = defineConfig({
  customLogger: logger,
  plugins: [
    ...isDev ? [inlineEditPlugin(), inlineEditDevPlugin(), iframeRouteRestorationPlugin(), selectionModePlugin()] : [],
    react(),
    addTransformIndexHtml
  ],
  server: {
    cors: true,
    headers: {
      "Cross-Origin-Embedder-Policy": "credentialless"
    },
    allowedHosts: true
  },
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts", ".json"],
    alias: {
      "@": path3.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      external: [
        "@babel/parser",
        "@babel/traverse",
        "@babel/generator",
        "@babel/types"
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGx1Z2lucy92aXN1YWwtZWRpdG9yL3ZpdGUtcGx1Z2luLXJlYWN0LWlubGluZS1lZGl0b3IuanMiLCAicGx1Z2lucy91dGlscy9hc3QtdXRpbHMuanMiLCAicGx1Z2lucy92aXN1YWwtZWRpdG9yL3ZpdGUtcGx1Z2luLWVkaXQtbW9kZS5qcyIsICJwbHVnaW5zL3Zpc3VhbC1lZGl0b3IvdmlzdWFsLWVkaXRvci1jb25maWcuanMiLCAicGx1Z2lucy92aXRlLXBsdWdpbi1pZnJhbWUtcm91dGUtcmVzdG9yYXRpb24uanMiLCAicGx1Z2lucy9zZWxlY3Rpb24tbW9kZS92aXRlLXBsdWdpbi1zZWxlY3Rpb24tbW9kZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVTRVJcXFxcRG93bmxvYWRzXFxcXGhvcml6b25zLWV4cG9ydC01Y29kaWdvIHBhcmEgZ2l0OTctMjU3MDE2NjY1YTBiICgyKVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxEb3dubG9hZHNcXFxcaG9yaXpvbnMtZXhwb3J0LTVjb2RpZ28gcGFyYSBnaXQ5Ny0yNTcwMTY2NjVhMGIgKDIpXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9VU0VSL0Rvd25sb2Fkcy9ob3Jpem9ucy1leHBvcnQtNWNvZGlnbyUyMHBhcmElMjBnaXQ5Ny0yNTcwMTY2NjVhMGIlMjAoMikvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciwgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgaW5saW5lRWRpdFBsdWdpbiBmcm9tICcuL3BsdWdpbnMvdmlzdWFsLWVkaXRvci92aXRlLXBsdWdpbi1yZWFjdC1pbmxpbmUtZWRpdG9yLmpzJztcbmltcG9ydCBlZGl0TW9kZURldlBsdWdpbiBmcm9tICcuL3BsdWdpbnMvdmlzdWFsLWVkaXRvci92aXRlLXBsdWdpbi1lZGl0LW1vZGUuanMnO1xuaW1wb3J0IGlmcmFtZVJvdXRlUmVzdG9yYXRpb25QbHVnaW4gZnJvbSAnLi9wbHVnaW5zL3ZpdGUtcGx1Z2luLWlmcmFtZS1yb3V0ZS1yZXN0b3JhdGlvbi5qcyc7XG5pbXBvcnQgc2VsZWN0aW9uTW9kZVBsdWdpbiBmcm9tICcuL3BsdWdpbnMvc2VsZWN0aW9uLW1vZGUvdml0ZS1wbHVnaW4tc2VsZWN0aW9uLW1vZGUuanMnO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbmNvbnN0IGNvbmZpZ0hvcml6b25zVml0ZUVycm9ySGFuZGxlciA9IGBcbmNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuXHRmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuXHRcdGZvciAoY29uc3QgYWRkZWROb2RlIG9mIG11dGF0aW9uLmFkZGVkTm9kZXMpIHtcblx0XHRcdGlmIChcblx0XHRcdFx0YWRkZWROb2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJlxuXHRcdFx0XHQoXG5cdFx0XHRcdFx0YWRkZWROb2RlLnRhZ05hbWU/LnRvTG93ZXJDYXNlKCkgPT09ICd2aXRlLWVycm9yLW92ZXJsYXknIHx8XG5cdFx0XHRcdFx0YWRkZWROb2RlLmNsYXNzTGlzdD8uY29udGFpbnMoJ2JhY2tkcm9wJylcblx0XHRcdFx0KVxuXHRcdFx0KSB7XG5cdFx0XHRcdGhhbmRsZVZpdGVPdmVybGF5KGFkZGVkTm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59KTtcblxub2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcblx0Y2hpbGRMaXN0OiB0cnVlLFxuXHRzdWJ0cmVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gaGFuZGxlVml0ZU92ZXJsYXkobm9kZSkge1xuXHRpZiAoIW5vZGUuc2hhZG93Um9vdCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGJhY2tkcm9wID0gbm9kZS5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpO1xuXG5cdGlmIChiYWNrZHJvcCkge1xuXHRcdGNvbnN0IG92ZXJsYXlIdG1sID0gYmFja2Ryb3Aub3V0ZXJIVE1MO1xuXHRcdGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcblx0XHRjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKG92ZXJsYXlIdG1sLCAndGV4dC9odG1sJyk7XG5cdFx0Y29uc3QgbWVzc2FnZUJvZHlFbGVtZW50ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlLWJvZHknKTtcblx0XHRjb25zdCBmaWxlRWxlbWVudCA9IGRvYy5xdWVyeVNlbGVjdG9yKCcuZmlsZScpO1xuXHRcdGNvbnN0IG1lc3NhZ2VUZXh0ID0gbWVzc2FnZUJvZHlFbGVtZW50ID8gbWVzc2FnZUJvZHlFbGVtZW50LnRleHRDb250ZW50LnRyaW0oKSA6ICcnO1xuXHRcdGNvbnN0IGZpbGVUZXh0ID0gZmlsZUVsZW1lbnQgPyBmaWxlRWxlbWVudC50ZXh0Q29udGVudC50cmltKCkgOiAnJztcblx0XHRjb25zdCBlcnJvciA9IG1lc3NhZ2VUZXh0ICsgKGZpbGVUZXh0ID8gJyBGaWxlOicgKyBmaWxlVGV4dCA6ICcnKTtcblxuXHRcdHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0dHlwZTogJ2hvcml6b25zLXZpdGUtZXJyb3InLFxuXHRcdFx0ZXJyb3IsXG5cdFx0fSwgJyonKTtcblx0fVxufVxuYDtcblxuY29uc3QgY29uZmlnSG9yaXpvbnNSdW50aW1lRXJyb3JIYW5kbGVyID0gYFxud2luZG93Lm9uZXJyb3IgPSAobWVzc2FnZSwgc291cmNlLCBsaW5lbm8sIGNvbG5vLCBlcnJvck9iaikgPT4ge1xuXHRjb25zdCBlcnJvckRldGFpbHMgPSBlcnJvck9iaiA/IEpTT04uc3RyaW5naWZ5KHtcblx0XHRuYW1lOiBlcnJvck9iai5uYW1lLFxuXHRcdG1lc3NhZ2U6IGVycm9yT2JqLm1lc3NhZ2UsXG5cdFx0c3RhY2s6IGVycm9yT2JqLnN0YWNrLFxuXHRcdHNvdXJjZSxcblx0XHRsaW5lbm8sXG5cdFx0Y29sbm8sXG5cdH0pIDogbnVsbDtcblxuXHR3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcblx0XHR0eXBlOiAnaG9yaXpvbnMtcnVudGltZS1lcnJvcicsXG5cdFx0bWVzc2FnZSxcblx0XHRlcnJvcjogZXJyb3JEZXRhaWxzXG5cdH0sICcqJyk7XG59O1xuYDtcblxuY29uc3QgY29uZmlnSG9yaXpvbnNDb25zb2xlRXJycm9IYW5kbGVyID0gYFxuY29uc3Qgb3JpZ2luYWxDb25zb2xlRXJyb3IgPSBjb25zb2xlLmVycm9yO1xuY29uc29sZS5lcnJvciA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcblx0b3JpZ2luYWxDb25zb2xlRXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XG5cblx0bGV0IGVycm9yU3RyaW5nID0gJyc7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgYXJnID0gYXJnc1tpXTtcblx0XHRpZiAoYXJnIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRcdGVycm9yU3RyaW5nID0gYXJnLnN0YWNrIHx8IFxcYFxcJHthcmcubmFtZX06IFxcJHthcmcubWVzc2FnZX1cXGA7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRpZiAoIWVycm9yU3RyaW5nKSB7XG5cdFx0ZXJyb3JTdHJpbmcgPSBhcmdzLm1hcChhcmcgPT4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeShhcmcpIDogU3RyaW5nKGFyZykpLmpvaW4oJyAnKTtcblx0fVxuXG5cdHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuXHRcdHR5cGU6ICdob3Jpem9ucy1jb25zb2xlLWVycm9yJyxcblx0XHRlcnJvcjogZXJyb3JTdHJpbmdcblx0fSwgJyonKTtcbn07XG5gO1xuXG5jb25zdCBjb25maWdXaW5kb3dGZXRjaE1vbmtleVBhdGNoID0gYFxuY29uc3Qgb3JpZ2luYWxGZXRjaCA9IHdpbmRvdy5mZXRjaDtcblxud2luZG93LmZldGNoID0gZnVuY3Rpb24oLi4uYXJncykge1xuXHRjb25zdCB1cmwgPSBhcmdzWzBdIGluc3RhbmNlb2YgUmVxdWVzdCA/IGFyZ3NbMF0udXJsIDogYXJnc1swXTtcblxuXHQvLyBTa2lwIFdlYlNvY2tldCBVUkxzXG5cdGlmICh1cmwuc3RhcnRzV2l0aCgnd3M6JykgfHwgdXJsLnN0YXJ0c1dpdGgoJ3dzczonKSkge1xuXHRcdHJldHVybiBvcmlnaW5hbEZldGNoLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9XG5cblx0cmV0dXJuIG9yaWdpbmFsRmV0Y2guYXBwbHkodGhpcywgYXJncylcblx0XHQudGhlbihhc3luYyByZXNwb25zZSA9PiB7XG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSB8fCAnJztcblxuXHRcdFx0Ly8gRXhjbHVkZSBIVE1MIGRvY3VtZW50IHJlc3BvbnNlc1xuXHRcdFx0Y29uc3QgaXNEb2N1bWVudFJlc3BvbnNlID1cblx0XHRcdFx0Y29udGVudFR5cGUuaW5jbHVkZXMoJ3RleHQvaHRtbCcpIHx8XG5cdFx0XHRcdGNvbnRlbnRUeXBlLmluY2x1ZGVzKCdhcHBsaWNhdGlvbi94aHRtbCt4bWwnKTtcblxuXHRcdFx0aWYgKCFyZXNwb25zZS5vayAmJiAhaXNEb2N1bWVudFJlc3BvbnNlKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2VDbG9uZSA9IHJlc3BvbnNlLmNsb25lKCk7XG5cdFx0XHRcdFx0Y29uc3QgZXJyb3JGcm9tUmVzID0gYXdhaXQgcmVzcG9uc2VDbG9uZS50ZXh0KCk7XG5cdFx0XHRcdFx0Y29uc3QgcmVxdWVzdFVybCA9IHJlc3BvbnNlLnVybDtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFxcYEZldGNoIGVycm9yIGZyb20gXFwke3JlcXVlc3RVcmx9OiBcXCR7ZXJyb3JGcm9tUmVzfVxcYCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHR9KVxuXHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRpZiAoIXVybC5tYXRjaCgvXFwuaHRtbD8kL2kpKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9KTtcbn07XG5gO1xuXG5jb25zdCBjb25maWdOYXZpZ2F0aW9uSGFuZGxlciA9IGBcbmlmICh3aW5kb3cubmF2aWdhdGlvbiAmJiB3aW5kb3cuc2VsZiAhPT0gd2luZG93LnRvcCkge1xuXHR3aW5kb3cubmF2aWdhdGlvbi5hZGRFdmVudExpc3RlbmVyKCduYXZpZ2F0ZScsIChldmVudCkgPT4ge1xuXHRcdGNvbnN0IHVybCA9IGV2ZW50LmRlc3RpbmF0aW9uLnVybDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBkZXN0aW5hdGlvblVybCA9IG5ldyBVUkwodXJsKTtcblx0XHRcdGNvbnN0IGRlc3RpbmF0aW9uT3JpZ2luID0gZGVzdGluYXRpb25Vcmwub3JpZ2luO1xuXHRcdFx0Y29uc3QgY3VycmVudE9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG5cblx0XHRcdGlmIChkZXN0aW5hdGlvbk9yaWdpbiA9PT0gY3VycmVudE9yaWdpbikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcblx0XHRcdHR5cGU6ICdob3Jpem9ucy1uYXZpZ2F0aW9uLWVycm9yJyxcblx0XHRcdHVybCxcblx0XHR9LCAnKicpO1xuXHR9KTtcbn1cbmA7XG5cbmNvbnN0IGFkZFRyYW5zZm9ybUluZGV4SHRtbCA9IHtcblx0bmFtZTogJ2FkZC10cmFuc2Zvcm0taW5kZXgtaHRtbCcsXG5cdHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XG5cdFx0Y29uc3QgdGFncyA9IFtcblx0XHRcdHtcblx0XHRcdFx0dGFnOiAnc2NyaXB0Jyxcblx0XHRcdFx0YXR0cnM6IHsgdHlwZTogJ21vZHVsZScgfSxcblx0XHRcdFx0Y2hpbGRyZW46IGNvbmZpZ0hvcml6b25zUnVudGltZUVycm9ySGFuZGxlcixcblx0XHRcdFx0aW5qZWN0VG86ICdoZWFkJyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRhZzogJ3NjcmlwdCcsXG5cdFx0XHRcdGF0dHJzOiB7IHR5cGU6ICdtb2R1bGUnIH0sXG5cdFx0XHRcdGNoaWxkcmVuOiBjb25maWdIb3Jpem9uc1ZpdGVFcnJvckhhbmRsZXIsXG5cdFx0XHRcdGluamVjdFRvOiAnaGVhZCcsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0YWc6ICdzY3JpcHQnLFxuXHRcdFx0XHRhdHRyczoge3R5cGU6ICdtb2R1bGUnfSxcblx0XHRcdFx0Y2hpbGRyZW46IGNvbmZpZ0hvcml6b25zQ29uc29sZUVycnJvSGFuZGxlcixcblx0XHRcdFx0aW5qZWN0VG86ICdoZWFkJyxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRhZzogJ3NjcmlwdCcsXG5cdFx0XHRcdGF0dHJzOiB7IHR5cGU6ICdtb2R1bGUnIH0sXG5cdFx0XHRcdGNoaWxkcmVuOiBjb25maWdXaW5kb3dGZXRjaE1vbmtleVBhdGNoLFxuXHRcdFx0XHRpbmplY3RUbzogJ2hlYWQnLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGFnOiAnc2NyaXB0Jyxcblx0XHRcdFx0YXR0cnM6IHsgdHlwZTogJ21vZHVsZScgfSxcblx0XHRcdFx0Y2hpbGRyZW46IGNvbmZpZ05hdmlnYXRpb25IYW5kbGVyLFxuXHRcdFx0XHRpbmplY3RUbzogJ2hlYWQnLFxuXHRcdFx0fSxcblx0XHRdO1xuXG5cdFx0aWYgKCFpc0RldiAmJiBwcm9jZXNzLmVudi5URU1QTEFURV9CQU5ORVJfU0NSSVBUX1VSTCAmJiBwcm9jZXNzLmVudi5URU1QTEFURV9SRURJUkVDVF9VUkwpIHtcblx0XHRcdHRhZ3MucHVzaChcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRhZzogJ3NjcmlwdCcsXG5cdFx0XHRcdFx0YXR0cnM6IHtcblx0XHRcdFx0XHRcdHNyYzogcHJvY2Vzcy5lbnYuVEVNUExBVEVfQkFOTkVSX1NDUklQVF9VUkwsXG5cdFx0XHRcdFx0XHQndGVtcGxhdGUtcmVkaXJlY3QtdXJsJzogcHJvY2Vzcy5lbnYuVEVNUExBVEVfUkVESVJFQ1RfVVJMLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aW5qZWN0VG86ICdoZWFkJyxcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0aHRtbCxcblx0XHRcdHRhZ3MsXG5cdFx0fTtcblx0fSxcbn07XG5cbmNvbnNvbGUud2FybiA9ICgpID0+IHt9O1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoKVxuY29uc3QgbG9nZ2VyRXJyb3IgPSBsb2dnZXIuZXJyb3JcblxubG9nZ2VyLmVycm9yID0gKG1zZywgb3B0aW9ucykgPT4ge1xuXHRpZiAob3B0aW9ucz8uZXJyb3I/LnRvU3RyaW5nKCkuaW5jbHVkZXMoJ0Nzc1N5bnRheEVycm9yOiBbcG9zdGNzc10nKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGxvZ2dlckVycm9yKG1zZywgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdGN1c3RvbUxvZ2dlcjogbG9nZ2VyLFxuXHRwbHVnaW5zOiBbXG5cdFx0Li4uKGlzRGV2ID8gW2lubGluZUVkaXRQbHVnaW4oKSwgZWRpdE1vZGVEZXZQbHVnaW4oKSwgaWZyYW1lUm91dGVSZXN0b3JhdGlvblBsdWdpbigpLCBzZWxlY3Rpb25Nb2RlUGx1Z2luKCldIDogW10pLFxuXHRcdHJlYWN0KCksXG5cdFx0YWRkVHJhbnNmb3JtSW5kZXhIdG1sXG5cdF0sXG5cdHNlcnZlcjoge1xuXHRcdGNvcnM6IHRydWUsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0J0Nyb3NzLU9yaWdpbi1FbWJlZGRlci1Qb2xpY3knOiAnY3JlZGVudGlhbGxlc3MnLFxuXHRcdH0sXG5cdFx0YWxsb3dlZEhvc3RzOiB0cnVlLFxuXHR9LFxuXHRyZXNvbHZlOiB7XG5cdFx0ZXh0ZW5zaW9uczogWycuanN4JywgJy5qcycsICcudHN4JywgJy50cycsICcuanNvbicsIF0sXG5cdFx0YWxpYXM6IHtcblx0XHRcdCdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG5cdFx0fSxcblx0fSxcblx0YnVpbGQ6IHtcblx0XHRyb2xsdXBPcHRpb25zOiB7XG5cdFx0XHRleHRlcm5hbDogW1xuXHRcdFx0XHQnQGJhYmVsL3BhcnNlcicsXG5cdFx0XHRcdCdAYmFiZWwvdHJhdmVyc2UnLFxuXHRcdFx0XHQnQGJhYmVsL2dlbmVyYXRvcicsXG5cdFx0XHRcdCdAYmFiZWwvdHlwZXMnXG5cdFx0XHRdXG5cdFx0fVxuXHR9XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxEb3dubG9hZHNcXFxcaG9yaXpvbnMtZXhwb3J0LTVjb2RpZ28gcGFyYSBnaXQ5Ny0yNTcwMTY2NjVhMGIgKDIpXFxcXHBsdWdpbnNcXFxcdmlzdWFsLWVkaXRvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxEb3dubG9hZHNcXFxcaG9yaXpvbnMtZXhwb3J0LTVjb2RpZ28gcGFyYSBnaXQ5Ny0yNTcwMTY2NjVhMGIgKDIpXFxcXHBsdWdpbnNcXFxcdmlzdWFsLWVkaXRvclxcXFx2aXRlLXBsdWdpbi1yZWFjdC1pbmxpbmUtZWRpdG9yLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9VU0VSL0Rvd25sb2Fkcy9ob3Jpem9ucy1leHBvcnQtNWNvZGlnbyUyMHBhcmElMjBnaXQ5Ny0yNTcwMTY2NjVhMGIlMjAoMikvcGx1Z2lucy92aXN1YWwtZWRpdG9yL3ZpdGUtcGx1Z2luLXJlYWN0LWlubGluZS1lZGl0b3IuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnQGJhYmVsL3BhcnNlcic7XG5pbXBvcnQgdHJhdmVyc2VCYWJlbCBmcm9tICdAYmFiZWwvdHJhdmVyc2UnO1xuaW1wb3J0ICogYXMgdCBmcm9tICdAYmFiZWwvdHlwZXMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IFxuXHR2YWxpZGF0ZUZpbGVQYXRoLCBcblx0cGFyc2VGaWxlVG9BU1QsIFxuXHRmaW5kSlNYRWxlbWVudEF0UG9zaXRpb24sXG5cdGdlbmVyYXRlQ29kZSxcblx0Z2VuZXJhdGVTb3VyY2VXaXRoTWFwLFxuXHRWSVRFX1BST0pFQ1RfUk9PVFxufSBmcm9tICcuLi91dGlscy9hc3QtdXRpbHMuanMnO1xuXG5jb25zdCBFRElUQUJMRV9IVE1MX1RBR1MgPSBbXCJhXCIsIFwiQnV0dG9uXCIsIFwiYnV0dG9uXCIsIFwicFwiLCBcInNwYW5cIiwgXCJoMVwiLCBcImgyXCIsIFwiaDNcIiwgXCJoNFwiLCBcImg1XCIsIFwiaDZcIiwgXCJsYWJlbFwiLCBcIkxhYmVsXCIsIFwiaW1nXCJdO1xuXG5mdW5jdGlvbiBwYXJzZUVkaXRJZChlZGl0SWQpIHtcblx0Y29uc3QgcGFydHMgPSBlZGl0SWQuc3BsaXQoJzonKTtcblxuXHRpZiAocGFydHMubGVuZ3RoIDwgMykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Y29uc3QgY29sdW1uID0gcGFyc2VJbnQocGFydHMuYXQoLTEpLCAxMCk7XG5cdGNvbnN0IGxpbmUgPSBwYXJzZUludChwYXJ0cy5hdCgtMiksIDEwKTtcblx0Y29uc3QgZmlsZVBhdGggPSBwYXJ0cy5zbGljZSgwLCAtMikuam9pbignOicpO1xuXG5cdGlmICghZmlsZVBhdGggfHwgaXNOYU4obGluZSkgfHwgaXNOYU4oY29sdW1uKSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIHsgZmlsZVBhdGgsIGxpbmUsIGNvbHVtbiB9O1xufVxuXG5mdW5jdGlvbiBjaGVja1RhZ05hbWVFZGl0YWJsZShvcGVuaW5nRWxlbWVudE5vZGUsIGVkaXRhYmxlVGFnc0xpc3QpIHtcblx0aWYgKCFvcGVuaW5nRWxlbWVudE5vZGUgfHwgIW9wZW5pbmdFbGVtZW50Tm9kZS5uYW1lKSByZXR1cm4gZmFsc2U7XG5cdGNvbnN0IG5hbWVOb2RlID0gb3BlbmluZ0VsZW1lbnROb2RlLm5hbWU7XG5cblx0Ly8gQ2hlY2sgMTogRGlyZWN0IG5hbWUgKGZvciA8cD4sIDxCdXR0b24+KVxuXHRpZiAobmFtZU5vZGUudHlwZSA9PT0gJ0pTWElkZW50aWZpZXInICYmIGVkaXRhYmxlVGFnc0xpc3QuaW5jbHVkZXMobmFtZU5vZGUubmFtZSkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIENoZWNrIDI6IFByb3BlcnR5IG5hbWUgb2YgYSBtZW1iZXIgZXhwcmVzc2lvbiAoZm9yIDxtb3Rpb24uaDE+LCBjaGVjayBpZiBcImgxXCIgaXMgaW4gZWRpdGFibGVUYWdzTGlzdClcblx0aWYgKG5hbWVOb2RlLnR5cGUgPT09ICdKU1hNZW1iZXJFeHByZXNzaW9uJyAmJiBuYW1lTm9kZS5wcm9wZXJ0eSAmJiBuYW1lTm9kZS5wcm9wZXJ0eS50eXBlID09PSAnSlNYSWRlbnRpZmllcicgJiYgZWRpdGFibGVUYWdzTGlzdC5pbmNsdWRlcyhuYW1lTm9kZS5wcm9wZXJ0eS5uYW1lKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUltYWdlU3JjKG9wZW5pbmdOb2RlKSB7XG5cdGlmICghb3BlbmluZ05vZGUgfHwgIW9wZW5pbmdOb2RlLm5hbWUgfHwgb3BlbmluZ05vZGUubmFtZS5uYW1lICE9PSAnaW1nJykge1xuXHRcdHJldHVybiB7IGlzVmFsaWQ6IHRydWUsIHJlYXNvbjogbnVsbCB9OyAvLyBOb3QgYW4gaW1hZ2UsIHNraXAgdmFsaWRhdGlvblxuXHR9XG5cblx0Y29uc3QgaGFzUHJvcHNTcHJlYWQgPSBvcGVuaW5nTm9kZS5hdHRyaWJ1dGVzLnNvbWUoYXR0ciA9PlxuXHRcdHQuaXNKU1hTcHJlYWRBdHRyaWJ1dGUoYXR0cikgJiZcblx0XHRhdHRyLmFyZ3VtZW50ICYmXG5cdFx0dC5pc0lkZW50aWZpZXIoYXR0ci5hcmd1bWVudCkgJiZcblx0XHRhdHRyLmFyZ3VtZW50Lm5hbWUgPT09ICdwcm9wcydcblx0KTtcblxuXHRpZiAoaGFzUHJvcHNTcHJlYWQpIHtcblx0XHRyZXR1cm4geyBpc1ZhbGlkOiBmYWxzZSwgcmVhc29uOiAncHJvcHMtc3ByZWFkJyB9O1xuXHR9XG5cblx0Y29uc3Qgc3JjQXR0ciA9IG9wZW5pbmdOb2RlLmF0dHJpYnV0ZXMuZmluZChhdHRyID0+XG5cdFx0dC5pc0pTWEF0dHJpYnV0ZShhdHRyKSAmJlxuXHRcdGF0dHIubmFtZSAmJlxuXHRcdGF0dHIubmFtZS5uYW1lID09PSAnc3JjJ1xuXHQpO1xuXG5cdGlmICghc3JjQXR0cikge1xuXHRcdHJldHVybiB7IGlzVmFsaWQ6IGZhbHNlLCByZWFzb246ICdtaXNzaW5nLXNyYycgfTtcblx0fVxuXG5cdGlmICghdC5pc1N0cmluZ0xpdGVyYWwoc3JjQXR0ci52YWx1ZSkpIHtcblx0XHRyZXR1cm4geyBpc1ZhbGlkOiBmYWxzZSwgcmVhc29uOiAnZHluYW1pYy1zcmMnIH07XG5cdH1cblxuXHRpZiAoIXNyY0F0dHIudmFsdWUudmFsdWUgfHwgc3JjQXR0ci52YWx1ZS52YWx1ZS50cmltKCkgPT09ICcnKSB7XG5cdFx0cmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIHJlYXNvbjogJ2VtcHR5LXNyYycgfTtcblx0fVxuXG5cdHJldHVybiB7IGlzVmFsaWQ6IHRydWUsIHJlYXNvbjogbnVsbCB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbmxpbmVFZGl0UGx1Z2luKCkge1xuXHRyZXR1cm4ge1xuXHRcdG5hbWU6ICd2aXRlLWlubGluZS1lZGl0LXBsdWdpbicsXG5cdFx0ZW5mb3JjZTogJ3ByZScsXG5cblx0XHR0cmFuc2Zvcm0oY29kZSwgaWQpIHtcblx0XHRcdGlmICghL1xcLihqc3h8dHN4KSQvLnRlc3QoaWQpIHx8ICFpZC5zdGFydHNXaXRoKFZJVEVfUFJPSkVDVF9ST09UKSB8fCBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHJlbGF0aXZlRmlsZVBhdGggPSBwYXRoLnJlbGF0aXZlKFZJVEVfUFJPSkVDVF9ST09ULCBpZCk7XG5cdFx0XHRjb25zdCB3ZWJSZWxhdGl2ZUZpbGVQYXRoID0gcmVsYXRpdmVGaWxlUGF0aC5zcGxpdChwYXRoLnNlcCkuam9pbignLycpO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBiYWJlbEFzdCA9IHBhcnNlKGNvZGUsIHtcblx0XHRcdFx0XHRzb3VyY2VUeXBlOiAnbW9kdWxlJyxcblx0XHRcdFx0XHRwbHVnaW5zOiBbJ2pzeCcsICd0eXBlc2NyaXB0J10sXG5cdFx0XHRcdFx0ZXJyb3JSZWNvdmVyeTogdHJ1ZVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRsZXQgYXR0cmlidXRlc0FkZGVkID0gMDtcblxuXHRcdFx0XHR0cmF2ZXJzZUJhYmVsLmRlZmF1bHQoYmFiZWxBc3QsIHtcblx0XHRcdFx0XHRlbnRlcihwYXRoKSB7XG5cdFx0XHRcdFx0XHRpZiAocGF0aC5pc0pTWE9wZW5pbmdFbGVtZW50KCkpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgb3BlbmluZ05vZGUgPSBwYXRoLm5vZGU7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVsZW1lbnROb2RlID0gcGF0aC5wYXJlbnRQYXRoLm5vZGU7IC8vIFRoZSBKU1hFbGVtZW50IGl0c2VsZlxuXG5cdFx0XHRcdFx0XHRcdGlmICghb3BlbmluZ05vZGUubG9jKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgYWxyZWFkeUhhc0lkID0gb3BlbmluZ05vZGUuYXR0cmlidXRlcy5zb21lKFxuXHRcdFx0XHRcdFx0XHRcdChhdHRyKSA9PiB0LmlzSlNYQXR0cmlidXRlKGF0dHIpICYmIGF0dHIubmFtZS5uYW1lID09PSAnZGF0YS1lZGl0LWlkJ1xuXHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChhbHJlYWR5SGFzSWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBDb25kaXRpb24gMTogSXMgdGhlIGN1cnJlbnQgZWxlbWVudCB0YWcgdHlwZSBlZGl0YWJsZT9cblx0XHRcdFx0XHRcdFx0Y29uc3QgaXNDdXJyZW50RWxlbWVudEVkaXRhYmxlID0gY2hlY2tUYWdOYW1lRWRpdGFibGUob3BlbmluZ05vZGUsIEVESVRBQkxFX0hUTUxfVEFHUyk7XG5cdFx0XHRcdFx0XHRcdGlmICghaXNDdXJyZW50RWxlbWVudEVkaXRhYmxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgaW1hZ2VWYWxpZGF0aW9uID0gdmFsaWRhdGVJbWFnZVNyYyhvcGVuaW5nTm9kZSk7XG5cdFx0XHRcdFx0XHRcdGlmICghaW1hZ2VWYWxpZGF0aW9uLmlzVmFsaWQpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBkaXNhYmxlZEF0dHJpYnV0ZSA9IHQuanN4QXR0cmlidXRlKFxuXHRcdFx0XHRcdFx0XHRcdFx0dC5qc3hJZGVudGlmaWVyKCdkYXRhLWVkaXQtZGlzYWJsZWQnKSxcblx0XHRcdFx0XHRcdFx0XHRcdHQuc3RyaW5nTGl0ZXJhbCgndHJ1ZScpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRvcGVuaW5nTm9kZS5hdHRyaWJ1dGVzLnB1c2goZGlzYWJsZWRBdHRyaWJ1dGUpO1xuXHRcdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXNBZGRlZCsrO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGxldCBzaG91bGRCZURpc2FibGVkRHVlVG9DaGlsZHJlbiA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0XHRcdC8vIENvbmRpdGlvbiAyOiBEb2VzIHRoZSBlbGVtZW50IGhhdmUgZHluYW1pYyBvciBlZGl0YWJsZSBjaGlsZHJlblxuXHRcdFx0XHRcdFx0XHRpZiAodC5pc0pTWEVsZW1lbnQoZWxlbWVudE5vZGUpICYmIGVsZW1lbnROb2RlLmNoaWxkcmVuKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgZWxlbWVudCBoYXMgey4uLnByb3BzfSBzcHJlYWQgYXR0cmlidXRlIC0gZGlzYWJsZSBlZGl0aW5nIGlmIGl0IGRvZXNcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBoYXNQcm9wc1NwcmVhZCA9IG9wZW5pbmdOb2RlLmF0dHJpYnV0ZXMuc29tZShhdHRyID0+IHQuaXNKU1hTcHJlYWRBdHRyaWJ1dGUoYXR0cilcblx0XHRcdFx0XHRcdFx0XHRcdCYmIGF0dHIuYXJndW1lbnRcblx0XHRcdFx0XHRcdFx0XHRcdCYmIHQuaXNJZGVudGlmaWVyKGF0dHIuYXJndW1lbnQpXG5cdFx0XHRcdFx0XHRcdFx0XHQmJiBhdHRyLmFyZ3VtZW50Lm5hbWUgPT09ICdwcm9wcydcblx0XHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgaGFzRHluYW1pY0NoaWxkID0gZWxlbWVudE5vZGUuY2hpbGRyZW4uc29tZShjaGlsZCA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0dC5pc0pTWEV4cHJlc3Npb25Db250YWluZXIoY2hpbGQpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChoYXNEeW5hbWljQ2hpbGQgfHwgaGFzUHJvcHNTcHJlYWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNob3VsZEJlRGlzYWJsZWREdWVUb0NoaWxkcmVuID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoIXNob3VsZEJlRGlzYWJsZWREdWVUb0NoaWxkcmVuICYmIHQuaXNKU1hFbGVtZW50KGVsZW1lbnROb2RlKSAmJiBlbGVtZW50Tm9kZS5jaGlsZHJlbikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGhhc0VkaXRhYmxlSnN4Q2hpbGQgPSBlbGVtZW50Tm9kZS5jaGlsZHJlbi5zb21lKGNoaWxkID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0LmlzSlNYRWxlbWVudChjaGlsZCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNoZWNrVGFnTmFtZUVkaXRhYmxlKGNoaWxkLm9wZW5pbmdFbGVtZW50LCBFRElUQUJMRV9IVE1MX1RBR1MpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoaGFzRWRpdGFibGVKc3hDaGlsZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2hvdWxkQmVEaXNhYmxlZER1ZVRvQ2hpbGRyZW4gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChzaG91bGRCZURpc2FibGVkRHVlVG9DaGlsZHJlbikge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGRpc2FibGVkQXR0cmlidXRlID0gdC5qc3hBdHRyaWJ1dGUoXG5cdFx0XHRcdFx0XHRcdFx0XHR0LmpzeElkZW50aWZpZXIoJ2RhdGEtZWRpdC1kaXNhYmxlZCcpLFxuXHRcdFx0XHRcdFx0XHRcdFx0dC5zdHJpbmdMaXRlcmFsKCd0cnVlJylcblx0XHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdFx0b3BlbmluZ05vZGUuYXR0cmlidXRlcy5wdXNoKGRpc2FibGVkQXR0cmlidXRlKTtcblx0XHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzQWRkZWQrKztcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBDb25kaXRpb24gMzogUGFyZW50IGlzIG5vbi1lZGl0YWJsZSBpZiBBVCBMRUFTVCBPTkUgY2hpbGQgSlNYRWxlbWVudCBpcyBhIG5vbi1lZGl0YWJsZSB0eXBlLlxuXHRcdFx0XHRcdFx0XHRpZiAodC5pc0pTWEVsZW1lbnQoZWxlbWVudE5vZGUpICYmIGVsZW1lbnROb2RlLmNoaWxkcmVuICYmIGVsZW1lbnROb2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgaGFzTm9uRWRpdGFibGVKc3hDaGlsZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgY2hpbGQgb2YgZWxlbWVudE5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0LmlzSlNYRWxlbWVudChjaGlsZCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFjaGVja1RhZ05hbWVFZGl0YWJsZShjaGlsZC5vcGVuaW5nRWxlbWVudCwgRURJVEFCTEVfSFRNTF9UQUdTKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGhhc05vbkVkaXRhYmxlSnN4Q2hpbGQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmIChoYXNOb25FZGl0YWJsZUpzeENoaWxkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBkaXNhYmxlZEF0dHJpYnV0ZSA9IHQuanN4QXR0cmlidXRlKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0LmpzeElkZW50aWZpZXIoJ2RhdGEtZWRpdC1kaXNhYmxlZCcpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0LnN0cmluZ0xpdGVyYWwoXCJ0cnVlXCIpXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0b3BlbmluZ05vZGUuYXR0cmlidXRlcy5wdXNoKGRpc2FibGVkQXR0cmlidXRlKTtcblx0XHRcdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXNBZGRlZCsrO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIENvbmRpdGlvbiA0OiBJcyBhbnkgYW5jZXN0b3IgSlNYRWxlbWVudCBhbHNvIGVkaXRhYmxlP1xuXHRcdFx0XHRcdFx0XHRsZXQgY3VycmVudEFuY2VzdG9yQ2FuZGlkYXRlUGF0aCA9IHBhdGgucGFyZW50UGF0aC5wYXJlbnRQYXRoO1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoY3VycmVudEFuY2VzdG9yQ2FuZGlkYXRlUGF0aCkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGFuY2VzdG9ySnN4RWxlbWVudFBhdGggPSBjdXJyZW50QW5jZXN0b3JDYW5kaWRhdGVQYXRoLmlzSlNYRWxlbWVudCgpXG5cdFx0XHRcdFx0XHRcdFx0XHQ/IGN1cnJlbnRBbmNlc3RvckNhbmRpZGF0ZVBhdGhcblx0XHRcdFx0XHRcdFx0XHRcdDogY3VycmVudEFuY2VzdG9yQ2FuZGlkYXRlUGF0aC5maW5kUGFyZW50KHAgPT4gcC5pc0pTWEVsZW1lbnQoKSk7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoIWFuY2VzdG9ySnN4RWxlbWVudFBhdGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGlmIChjaGVja1RhZ05hbWVFZGl0YWJsZShhbmNlc3RvckpzeEVsZW1lbnRQYXRoLm5vZGUub3BlbmluZ0VsZW1lbnQsIEVESVRBQkxFX0hUTUxfVEFHUykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudEFuY2VzdG9yQ2FuZGlkYXRlUGF0aCA9IGFuY2VzdG9ySnN4RWxlbWVudFBhdGgucGFyZW50UGF0aDtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IGxpbmUgPSBvcGVuaW5nTm9kZS5sb2Muc3RhcnQubGluZTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgY29sdW1uID0gb3BlbmluZ05vZGUubG9jLnN0YXJ0LmNvbHVtbiArIDE7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGVkaXRJZCA9IGAke3dlYlJlbGF0aXZlRmlsZVBhdGh9OiR7bGluZX06JHtjb2x1bW59YDtcblxuXHRcdFx0XHRcdFx0XHRjb25zdCBpZEF0dHJpYnV0ZSA9IHQuanN4QXR0cmlidXRlKFxuXHRcdFx0XHRcdFx0XHRcdHQuanN4SWRlbnRpZmllcignZGF0YS1lZGl0LWlkJyksXG5cdFx0XHRcdFx0XHRcdFx0dC5zdHJpbmdMaXRlcmFsKGVkaXRJZClcblx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHRvcGVuaW5nTm9kZS5hdHRyaWJ1dGVzLnB1c2goaWRBdHRyaWJ1dGUpO1xuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzQWRkZWQrKztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChhdHRyaWJ1dGVzQWRkZWQgPiAwKSB7XG5cdFx0XHRcdFx0Y29uc3Qgb3V0cHV0ID0gZ2VuZXJhdGVTb3VyY2VXaXRoTWFwKGJhYmVsQXN0LCB3ZWJSZWxhdGl2ZUZpbGVQYXRoLCBjb2RlKTtcblx0XHRcdFx0XHRyZXR1cm4geyBjb2RlOiBvdXRwdXQuY29kZSwgbWFwOiBvdXRwdXQubWFwIH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoYFt2aXRlXVt2aXN1YWwtZWRpdG9yXSBFcnJvciB0cmFuc2Zvcm1pbmcgJHtpZH06YCwgZXJyb3IpO1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHR9LFxuXG5cblx0XHQvLyBVcGRhdGVzIHNvdXJjZSBjb2RlIGJhc2VkIG9uIHRoZSBjaGFuZ2VzIHJlY2VpdmVkIGZyb20gdGhlIGNsaWVudFxuXHRcdGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcblx0XHRcdHNlcnZlci5taWRkbGV3YXJlcy51c2UoJy9hcGkvYXBwbHktZWRpdCcsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuXHRcdFx0XHRpZiAocmVxLm1ldGhvZCAhPT0gJ1BPU1QnKSByZXR1cm4gbmV4dCgpO1xuXG5cdFx0XHRcdGxldCBib2R5ID0gJyc7XG5cdFx0XHRcdHJlcS5vbignZGF0YScsIGNodW5rID0+IHsgYm9keSArPSBjaHVuay50b1N0cmluZygpOyB9KTtcblxuXHRcdFx0XHRyZXEub24oJ2VuZCcsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRsZXQgYWJzb2x1dGVGaWxlUGF0aCA9ICcnO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCB7IGVkaXRJZCwgbmV3RnVsbFRleHQgfSA9IEpTT04ucGFyc2UoYm9keSk7XG5cblx0XHRcdFx0XHRcdGlmICghZWRpdElkIHx8IHR5cGVvZiBuZXdGdWxsVGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0cmVzLndyaXRlSGVhZCg0MDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ01pc3NpbmcgZWRpdElkIG9yIG5ld0Z1bGxUZXh0JyB9KSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IHBhcnNlZElkID0gcGFyc2VFZGl0SWQoZWRpdElkKTtcblx0XHRcdFx0XHRcdGlmICghcGFyc2VkSWQpIHtcblx0XHRcdFx0XHRcdFx0cmVzLndyaXRlSGVhZCg0MDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0ludmFsaWQgZWRpdElkIGZvcm1hdCAoZmlsZVBhdGg6bGluZTpjb2x1bW4pJyB9KSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IHsgZmlsZVBhdGgsIGxpbmUsIGNvbHVtbiB9ID0gcGFyc2VkSWQ7XG5cblx0XHRcdFx0XHRcdC8vIFZhbGlkYXRlIGZpbGUgcGF0aFxuXHRcdFx0XHRcdFx0Y29uc3QgdmFsaWRhdGlvbiA9IHZhbGlkYXRlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXHRcdFx0XHRcdFx0aWYgKCF2YWxpZGF0aW9uLmlzVmFsaWQpIHtcblx0XHRcdFx0XHRcdFx0cmVzLndyaXRlSGVhZCg0MDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogdmFsaWRhdGlvbi5lcnJvciB9KSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhYnNvbHV0ZUZpbGVQYXRoID0gdmFsaWRhdGlvbi5hYnNvbHV0ZVBhdGg7XG5cblx0XHRcdFx0XHRcdC8vIFBhcnNlIEFTVFxuXHRcdFx0XHRcdFx0Y29uc3Qgb3JpZ2luYWxDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGFic29sdXRlRmlsZVBhdGgsICd1dGYtOCcpO1xuXHRcdFx0XHRcdFx0Y29uc3QgYmFiZWxBc3QgPSBwYXJzZUZpbGVUb0FTVChhYnNvbHV0ZUZpbGVQYXRoKTtcblxuXHRcdFx0XHRcdFx0Ly8gRmluZCB0YXJnZXQgbm9kZSAobm90ZTogYXBwbHktZWRpdCB1c2VzIGNvbHVtbisxKVxuXHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0Tm9kZVBhdGggPSBmaW5kSlNYRWxlbWVudEF0UG9zaXRpb24oYmFiZWxBc3QsIGxpbmUsIGNvbHVtbiArIDEpO1xuXG5cdFx0XHRcdFx0XHRpZiAoIXRhcmdldE5vZGVQYXRoKSB7XG5cdFx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoNDA0LCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdUYXJnZXQgbm9kZSBub3QgZm91bmQgYnkgbGluZS9jb2x1bW4nLCBlZGl0SWQgfSkpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjb25zdCB0YXJnZXRPcGVuaW5nRWxlbWVudCA9IHRhcmdldE5vZGVQYXRoLm5vZGU7XG5cdFx0XHRcdFx0XHRjb25zdCBwYXJlbnRFbGVtZW50Tm9kZSA9IHRhcmdldE5vZGVQYXRoLnBhcmVudFBhdGg/Lm5vZGU7XG5cblx0XHRcdFx0XHRcdGNvbnN0IGlzSW1hZ2VFbGVtZW50ID0gdGFyZ2V0T3BlbmluZ0VsZW1lbnQubmFtZSAmJiB0YXJnZXRPcGVuaW5nRWxlbWVudC5uYW1lLm5hbWUgPT09ICdpbWcnO1xuXG5cdFx0XHRcdFx0XHRsZXQgYmVmb3JlQ29kZSA9ICcnO1xuXHRcdFx0XHRcdFx0bGV0IGFmdGVyQ29kZSA9ICcnO1xuXHRcdFx0XHRcdFx0bGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cblx0XHRcdFx0XHRcdGlmIChpc0ltYWdlRWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgaW1hZ2Ugc3JjIGF0dHJpYnV0ZSB1cGRhdGVcblx0XHRcdFx0XHRcdFx0YmVmb3JlQ29kZSA9IGdlbmVyYXRlQ29kZSh0YXJnZXRPcGVuaW5nRWxlbWVudCk7XG5cblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3JjQXR0ciA9IHRhcmdldE9wZW5pbmdFbGVtZW50LmF0dHJpYnV0ZXMuZmluZChhdHRyID0+XG5cdFx0XHRcdFx0XHRcdFx0dC5pc0pTWEF0dHJpYnV0ZShhdHRyKSAmJiBhdHRyLm5hbWUgJiYgYXR0ci5uYW1lLm5hbWUgPT09ICdzcmMnXG5cdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHNyY0F0dHIgJiYgdC5pc1N0cmluZ0xpdGVyYWwoc3JjQXR0ci52YWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRzcmNBdHRyLnZhbHVlID0gdC5zdHJpbmdMaXRlcmFsKG5ld0Z1bGxUZXh0KTtcblx0XHRcdFx0XHRcdFx0XHRtb2RpZmllZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0YWZ0ZXJDb2RlID0gZ2VuZXJhdGVDb2RlKHRhcmdldE9wZW5pbmdFbGVtZW50KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aWYgKHBhcmVudEVsZW1lbnROb2RlICYmIHQuaXNKU1hFbGVtZW50KHBhcmVudEVsZW1lbnROb2RlKSkge1xuXHRcdFx0XHRcdFx0XHRcdGJlZm9yZUNvZGUgPSBnZW5lcmF0ZUNvZGUocGFyZW50RWxlbWVudE5vZGUpO1xuXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50RWxlbWVudE5vZGUuY2hpbGRyZW4gPSBbXTtcblx0XHRcdFx0XHRcdFx0XHRpZiAobmV3RnVsbFRleHQgJiYgbmV3RnVsbFRleHQudHJpbSgpICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmV3VGV4dE5vZGUgPSB0LmpzeFRleHQobmV3RnVsbFRleHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cGFyZW50RWxlbWVudE5vZGUuY2hpbGRyZW4ucHVzaChuZXdUZXh0Tm9kZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdG1vZGlmaWVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRhZnRlckNvZGUgPSBnZW5lcmF0ZUNvZGUocGFyZW50RWxlbWVudE5vZGUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICghbW9kaWZpZWQpIHtcblx0XHRcdFx0XHRcdFx0cmVzLndyaXRlSGVhZCg0MDksIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0NvdWxkIG5vdCBhcHBseSBjaGFuZ2VzIHRvIEFTVC4nIH0pKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y29uc3Qgd2ViUmVsYXRpdmVGaWxlUGF0aCA9IHBhdGgucmVsYXRpdmUoVklURV9QUk9KRUNUX1JPT1QsIGFic29sdXRlRmlsZVBhdGgpLnNwbGl0KHBhdGguc2VwKS5qb2luKCcvJyk7XG5cdFx0XHRcdFx0XHRjb25zdCBvdXRwdXQgPSBnZW5lcmF0ZVNvdXJjZVdpdGhNYXAoYmFiZWxBc3QsIHdlYlJlbGF0aXZlRmlsZVBhdGgsIG9yaWdpbmFsQ29udGVudCk7XG5cdFx0XHRcdFx0XHRjb25zdCBuZXdDb250ZW50ID0gb3V0cHV0LmNvZGU7XG5cblx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG5cdFx0XHRcdFx0XHRyZXMuZW5kKEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0XHRcdFx0c3VjY2VzczogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0bmV3RmlsZUNvbnRlbnQ6IG5ld0NvbnRlbnQsXG5cdFx0XHRcdFx0XHRcdGJlZm9yZUNvZGUsXG5cdFx0XHRcdFx0XHRcdGFmdGVyQ29kZSxcblx0XHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZXMud3JpdGVIZWFkKDUwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuXHRcdFx0XHRcdFx0cmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yIGR1cmluZyBlZGl0IGFwcGxpY2F0aW9uLicgfSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXERvd25sb2Fkc1xcXFxob3Jpem9ucy1leHBvcnQtNWNvZGlnbyBwYXJhIGdpdDk3LTI1NzAxNjY2NWEwYiAoMilcXFxccGx1Z2luc1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxEb3dubG9hZHNcXFxcaG9yaXpvbnMtZXhwb3J0LTVjb2RpZ28gcGFyYSBnaXQ5Ny0yNTcwMTY2NjVhMGIgKDIpXFxcXHBsdWdpbnNcXFxcdXRpbHNcXFxcYXN0LXV0aWxzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9VU0VSL0Rvd25sb2Fkcy9ob3Jpem9ucy1leHBvcnQtNWNvZGlnbyUyMHBhcmElMjBnaXQ5Ny0yNTcwMTY2NjVhMGIlMjAoMikvcGx1Z2lucy91dGlscy9hc3QtdXRpbHMuanNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJztcbmltcG9ydCBnZW5lcmF0ZSBmcm9tICdAYmFiZWwvZ2VuZXJhdG9yJztcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnQGJhYmVsL3BhcnNlcic7XG5pbXBvcnQgdHJhdmVyc2VCYWJlbCBmcm9tICdAYmFiZWwvdHJhdmVyc2UnO1xuaW1wb3J0IHtcblx0aXNKU1hJZGVudGlmaWVyLFxuXHRpc0pTWE1lbWJlckV4cHJlc3Npb24sXG59IGZyb20gJ0BiYWJlbC90eXBlcyc7XG5cbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG5jb25zdCBWSVRFX1BST0pFQ1RfUk9PVCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLicpO1xuXG4vLyBCbGFja2xpc3Qgb2YgY29tcG9uZW50cyB0aGF0IHNob3VsZCBub3QgYmUgZXh0cmFjdGVkICh1dGlsaXR5L25vbi12aXN1YWwgY29tcG9uZW50cylcbmNvbnN0IENPTVBPTkVOVF9CTEFDS0xJU1QgPSBuZXcgU2V0KFtcblx0J0hlbG1ldCcsXG5cdCdIZWxtZXRQcm92aWRlcicsXG5cdCdIZWFkJyxcblx0J2hlYWQnLFxuXHQnTWV0YScsXG5cdCdtZXRhJyxcblx0J1NjcmlwdCcsXG5cdCdzY3JpcHQnLFxuXHQnTm9TY3JpcHQnLFxuXHQnbm9zY3JpcHQnLFxuXHQnU3R5bGUnLFxuXHQnc3R5bGUnLFxuXHQndGl0bGUnLFxuXHQnVGl0bGUnLFxuXHQnbGluaycsXG5cdCdMaW5rJyxcbl0pO1xuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IGEgZmlsZSBwYXRoIGlzIHNhZmUgdG8gYWNjZXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGggLSBSZWxhdGl2ZSBmaWxlIHBhdGhcbiAqIEByZXR1cm5zIHt7IGlzVmFsaWQ6IGJvb2xlYW4sIGFic29sdXRlUGF0aD86IHN0cmluZywgZXJyb3I/OiBzdHJpbmcgfX0gLSBPYmplY3QgY29udGFpbmluZyB2YWxpZGF0aW9uIHJlc3VsdFxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVGaWxlUGF0aChmaWxlUGF0aCkge1xuXHRpZiAoIWZpbGVQYXRoKSB7XG5cdFx0cmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIGVycm9yOiAnTWlzc2luZyBmaWxlUGF0aCcgfTtcblx0fVxuXG5cdGNvbnN0IGFic29sdXRlRmlsZVBhdGggPSBwYXRoLnJlc29sdmUoVklURV9QUk9KRUNUX1JPT1QsIGZpbGVQYXRoKTtcblxuXHRpZiAoZmlsZVBhdGguaW5jbHVkZXMoJy4uJylcblx0XHR8fCAhYWJzb2x1dGVGaWxlUGF0aC5zdGFydHNXaXRoKFZJVEVfUFJPSkVDVF9ST09UKVxuXHRcdHx8IGFic29sdXRlRmlsZVBhdGguaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG5cdFx0cmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIGVycm9yOiAnSW52YWxpZCBwYXRoJyB9O1xuXHR9XG5cblx0aWYgKCFmcy5leGlzdHNTeW5jKGFic29sdXRlRmlsZVBhdGgpKSB7XG5cdFx0cmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIGVycm9yOiAnRmlsZSBub3QgZm91bmQnIH07XG5cdH1cblxuXHRyZXR1cm4geyBpc1ZhbGlkOiB0cnVlLCBhYnNvbHV0ZVBhdGg6IGFic29sdXRlRmlsZVBhdGggfTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgYSBmaWxlIGludG8gYSBCYWJlbCBBU1RcbiAqIEBwYXJhbSB7c3RyaW5nfSBhYnNvbHV0ZUZpbGVQYXRoIC0gQWJzb2x1dGUgcGF0aCB0byBmaWxlXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBCYWJlbCBBU1RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmlsZVRvQVNUKGFic29sdXRlRmlsZVBhdGgpIHtcblx0Y29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhhYnNvbHV0ZUZpbGVQYXRoLCAndXRmLTgnKTtcblxuXHRyZXR1cm4gcGFyc2UoY29udGVudCwge1xuXHRcdHNvdXJjZVR5cGU6ICdtb2R1bGUnLFxuXHRcdHBsdWdpbnM6IFsnanN4JywgJ3R5cGVzY3JpcHQnXSxcblx0XHRlcnJvclJlY292ZXJ5OiB0cnVlLFxuXHR9KTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhIEpTWCBvcGVuaW5nIGVsZW1lbnQgYXQgYSBzcGVjaWZpYyBsaW5lIGFuZCBjb2x1bW5cbiAqIEBwYXJhbSB7b2JqZWN0fSBhc3QgLSBCYWJlbCBBU1RcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lIC0gTGluZSBudW1iZXIgKDEtaW5kZXhlZClcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW4gLSBDb2x1bW4gbnVtYmVyICgwLWluZGV4ZWQgZm9yIGdldC1jb2RlLWJsb2NrLCAxLWluZGV4ZWQgZm9yIGFwcGx5LWVkaXQpXG4gKiBAcmV0dXJucyB7b2JqZWN0IHwgbnVsbH0gQmFiZWwgcGF0aCB0byB0aGUgSlNYIG9wZW5pbmcgZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEpTWEVsZW1lbnRBdFBvc2l0aW9uKGFzdCwgbGluZSwgY29sdW1uKSB7XG5cdGxldCB0YXJnZXROb2RlUGF0aCA9IG51bGw7XG5cdGxldCBjbG9zZXN0Tm9kZVBhdGggPSBudWxsO1xuXHRsZXQgY2xvc2VzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cdGNvbnN0IGFsbE5vZGVzT25MaW5lID0gW107XG5cblx0Y29uc3QgdmlzaXRvciA9IHtcblx0XHRKU1hPcGVuaW5nRWxlbWVudChwYXRoKSB7XG5cdFx0XHRjb25zdCBub2RlID0gcGF0aC5ub2RlO1xuXHRcdFx0aWYgKG5vZGUubG9jKSB7XG5cdFx0XHRcdC8vIEV4YWN0IG1hdGNoICh3aXRoIHRvbGVyYW5jZSBmb3Igb2ZmLWJ5LW9uZSBjb2x1bW4gZGlmZmVyZW5jZXMpXG5cdFx0XHRcdGlmIChub2RlLmxvYy5zdGFydC5saW5lID09PSBsaW5lXG5cdFx0XHRcdFx0JiYgTWF0aC5hYnMobm9kZS5sb2Muc3RhcnQuY29sdW1uIC0gY29sdW1uKSA8PSAxKSB7XG5cdFx0XHRcdFx0dGFyZ2V0Tm9kZVBhdGggPSBwYXRoO1xuXHRcdFx0XHRcdHBhdGguc3RvcCgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYWNrIGFsbCBub2RlcyBvbiB0aGUgc2FtZSBsaW5lXG5cdFx0XHRcdGlmIChub2RlLmxvYy5zdGFydC5saW5lID09PSBsaW5lKSB7XG5cdFx0XHRcdFx0YWxsTm9kZXNPbkxpbmUucHVzaCh7XG5cdFx0XHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRcdFx0Y29sdW1uOiBub2RlLmxvYy5zdGFydC5jb2x1bW4sXG5cdFx0XHRcdFx0XHRkaXN0YW5jZTogTWF0aC5hYnMobm9kZS5sb2Muc3RhcnQuY29sdW1uIC0gY29sdW1uKSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYWNrIGNsb3Nlc3QgbWF0Y2ggb24gdGhlIHNhbWUgbGluZSBmb3IgZmFsbGJhY2tcblx0XHRcdFx0aWYgKG5vZGUubG9jLnN0YXJ0LmxpbmUgPT09IGxpbmUpIHtcblx0XHRcdFx0XHRjb25zdCBkaXN0YW5jZSA9IE1hdGguYWJzKG5vZGUubG9jLnN0YXJ0LmNvbHVtbiAtIGNvbHVtbik7XG5cdFx0XHRcdFx0aWYgKGRpc3RhbmNlIDwgY2xvc2VzdERpc3RhbmNlKSB7XG5cdFx0XHRcdFx0XHRjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdFx0XHRcdGNsb3Nlc3ROb2RlUGF0aCA9IHBhdGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBBbHNvIGNoZWNrIEpTWEVsZW1lbnQgbm9kZXMgdGhhdCBjb250YWluIHRoZSBwb3NpdGlvblxuXHRcdEpTWEVsZW1lbnQocGF0aCkge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHBhdGgubm9kZTtcblx0XHRcdGlmICghbm9kZS5sb2MpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayBpZiB0aGlzIGVsZW1lbnQgc3BhbnMgdGhlIHRhcmdldCBsaW5lIChmb3IgbXVsdGktbGluZSBlbGVtZW50cylcblx0XHRcdGlmIChub2RlLmxvYy5zdGFydC5saW5lID4gbGluZSB8fCBub2RlLmxvYy5lbmQubGluZSA8IGxpbmUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB3ZSdyZSBpbnNpZGUgdGhpcyBlbGVtZW50J3MgcmFuZ2UsIGNvbnNpZGVyIGl0cyBvcGVuaW5nIGVsZW1lbnRcblx0XHRcdGlmICghcGF0aC5ub2RlLm9wZW5pbmdFbGVtZW50Py5sb2MpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBvcGVuaW5nTGluZSA9IHBhdGgubm9kZS5vcGVuaW5nRWxlbWVudC5sb2Muc3RhcnQubGluZTtcblx0XHRcdGNvbnN0IG9wZW5pbmdDb2wgPSBwYXRoLm5vZGUub3BlbmluZ0VsZW1lbnQubG9jLnN0YXJ0LmNvbHVtbjtcblxuXHRcdFx0Ly8gUHJlZmVyIGVsZW1lbnRzIHRoYXQgc3RhcnQgb24gdGhlIGV4YWN0IGxpbmVcblx0XHRcdGlmIChvcGVuaW5nTGluZSA9PT0gbGluZSkge1xuXHRcdFx0XHRjb25zdCBkaXN0YW5jZSA9IE1hdGguYWJzKG9wZW5pbmdDb2wgLSBjb2x1bW4pO1xuXHRcdFx0XHRpZiAoZGlzdGFuY2UgPCBjbG9zZXN0RGlzdGFuY2UpIHtcblx0XHRcdFx0XHRjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdFx0XHRjbG9zZXN0Tm9kZVBhdGggPSBwYXRoLmdldCgnb3BlbmluZ0VsZW1lbnQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEhhbmRsZSBlbGVtZW50cyB0aGF0IHN0YXJ0IGJlZm9yZSB0aGUgdGFyZ2V0IGxpbmVcblx0XHRcdGlmIChvcGVuaW5nTGluZSA8IGxpbmUpIHtcblx0XHRcdFx0Y29uc3QgZGlzdGFuY2UgPSAobGluZSAtIG9wZW5pbmdMaW5lKSAqIDEwMDsgLy8gUGVuYWxpemUgYnkgbGluZSBkaXN0YW5jZVxuXHRcdFx0XHRpZiAoZGlzdGFuY2UgPCBjbG9zZXN0RGlzdGFuY2UpIHtcblx0XHRcdFx0XHRjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdFx0XHRjbG9zZXN0Tm9kZVBhdGggPSBwYXRoLmdldCgnb3BlbmluZ0VsZW1lbnQnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG5cblx0dHJhdmVyc2VCYWJlbC5kZWZhdWx0KGFzdCwgdmlzaXRvcik7XG5cblx0Ly8gUmV0dXJuIGV4YWN0IG1hdGNoIGlmIGZvdW5kLCBvdGhlcndpc2UgcmV0dXJuIGNsb3Nlc3QgbWF0Y2ggaWYgd2l0aGluIHJlYXNvbmFibGUgZGlzdGFuY2Vcblx0Ly8gVXNlIGxhcmdlciB0aHJlc2hvbGQgKDUwIGNoYXJzKSBmb3Igc2FtZS1saW5lIGVsZW1lbnRzLCA1IGxpbmVzIGZvciBtdWx0aS1saW5lIGVsZW1lbnRzXG5cdGNvbnN0IHRocmVzaG9sZCA9IGNsb3Nlc3REaXN0YW5jZSA8IDEwMCA/IDUwIDogNTAwO1xuXHRyZXR1cm4gdGFyZ2V0Tm9kZVBhdGggfHwgKGNsb3Nlc3REaXN0YW5jZSA8PSB0aHJlc2hvbGQgPyBjbG9zZXN0Tm9kZVBhdGggOiBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBKU1ggZWxlbWVudCBuYW1lIGlzIGJsYWNrbGlzdGVkXG4gKiBAcGFyYW0ge29iamVjdH0ganN4T3BlbmluZ0VsZW1lbnQgLSBCYWJlbCBKU1ggb3BlbmluZyBlbGVtZW50IG5vZGVcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGJsYWNrbGlzdGVkXG4gKi9cbmZ1bmN0aW9uIGlzQmxhY2tsaXN0ZWRDb21wb25lbnQoanN4T3BlbmluZ0VsZW1lbnQpIHtcblx0aWYgKCFqc3hPcGVuaW5nRWxlbWVudCB8fCAhanN4T3BlbmluZ0VsZW1lbnQubmFtZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIEhhbmRsZSBKU1hJZGVudGlmaWVyIChlLmcuLCA8SGVsbWV0Pilcblx0aWYgKGlzSlNYSWRlbnRpZmllcihqc3hPcGVuaW5nRWxlbWVudC5uYW1lKSkge1xuXHRcdHJldHVybiBDT01QT05FTlRfQkxBQ0tMSVNULmhhcyhqc3hPcGVuaW5nRWxlbWVudC5uYW1lLm5hbWUpO1xuXHR9XG5cblx0Ly8gSGFuZGxlIEpTWE1lbWJlckV4cHJlc3Npb24gKGUuZy4sIDxSZWFjdC5GcmFnbWVudD4pXG5cdGlmIChpc0pTWE1lbWJlckV4cHJlc3Npb24oanN4T3BlbmluZ0VsZW1lbnQubmFtZSkpIHtcblx0XHRsZXQgY3VycmVudCA9IGpzeE9wZW5pbmdFbGVtZW50Lm5hbWU7XG5cdFx0d2hpbGUgKGlzSlNYTWVtYmVyRXhwcmVzc2lvbihjdXJyZW50KSkge1xuXHRcdFx0Y3VycmVudCA9IGN1cnJlbnQucHJvcGVydHk7XG5cdFx0fVxuXHRcdGlmIChpc0pTWElkZW50aWZpZXIoY3VycmVudCkpIHtcblx0XHRcdHJldHVybiBDT01QT05FTlRfQkxBQ0tMSVNULmhhcyhjdXJyZW50Lm5hbWUpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgY29kZSBmcm9tIGFuIEFTVCBub2RlXG4gKiBAcGFyYW0ge29iamVjdH0gbm9kZSAtIEJhYmVsIEFTVCBub2RlXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIEdlbmVyYXRvciBvcHRpb25zXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBHZW5lcmF0ZWQgY29kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDb2RlKG5vZGUsIG9wdGlvbnMgPSB7fSkge1xuXHRjb25zdCBnZW5lcmF0ZUZ1bmN0aW9uID0gZ2VuZXJhdGUuZGVmYXVsdCB8fCBnZW5lcmF0ZTtcblx0Y29uc3Qgb3V0cHV0ID0gZ2VuZXJhdGVGdW5jdGlvbihub2RlLCBvcHRpb25zKTtcblx0cmV0dXJuIG91dHB1dC5jb2RlO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGZ1bGwgc291cmNlIGZpbGUgZnJvbSBBU1Qgd2l0aCBzb3VyY2UgbWFwc1xuICogQHBhcmFtIHtvYmplY3R9IGFzdCAtIEJhYmVsIEFTVFxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZUZpbGVOYW1lIC0gU291cmNlIGZpbGUgbmFtZSBmb3Igc291cmNlIG1hcFxuICogQHBhcmFtIHtzdHJpbmd9IG9yaWdpbmFsQ29kZSAtIE9yaWdpbmFsIHNvdXJjZSBjb2RlXG4gKiBAcmV0dXJucyB7e2NvZGU6IHN0cmluZywgbWFwOiBvYmplY3R9fSAtIE9iamVjdCBjb250YWluaW5nIGdlbmVyYXRlZCBjb2RlIGFuZCBzb3VyY2UgbWFwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNvdXJjZVdpdGhNYXAoYXN0LCBzb3VyY2VGaWxlTmFtZSwgb3JpZ2luYWxDb2RlKSB7XG5cdGNvbnN0IGdlbmVyYXRlRnVuY3Rpb24gPSBnZW5lcmF0ZS5kZWZhdWx0IHx8IGdlbmVyYXRlO1xuXHRyZXR1cm4gZ2VuZXJhdGVGdW5jdGlvbihhc3QsIHtcblx0XHRzb3VyY2VNYXBzOiB0cnVlLFxuXHRcdHNvdXJjZUZpbGVOYW1lLFxuXHR9LCBvcmlnaW5hbENvZGUpO1xufVxuXG4vKipcbiAqIEV4dHJhY3RzIGNvZGUgYmxvY2tzIGZyb20gYSBKU1ggZWxlbWVudCBhdCBhIHNwZWNpZmljIGxvY2F0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGggLSBSZWxhdGl2ZSBmaWxlIHBhdGhcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lIC0gTGluZSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2x1bW4gLSBDb2x1bW4gbnVtYmVyXG4gKiBAcGFyYW0ge29iamVjdH0gW2RvbUNvbnRleHRdIC0gT3B0aW9uYWwgRE9NIGNvbnRleHQgdG8gcmV0dXJuIG9uIGZhaWx1cmVcbiAqIEByZXR1cm5zIHt7c3VjY2VzczogYm9vbGVhbiwgZmlsZVBhdGg/OiBzdHJpbmcsIHNwZWNpZmljTGluZT86IHN0cmluZywgZXJyb3I/OiBzdHJpbmcsIGRvbUNvbnRleHQ/OiBvYmplY3R9fSAtIE9iamVjdCB3aXRoIG1ldGFkYXRhIGZvciBMTE1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RDb2RlQmxvY2tzKGZpbGVQYXRoLCBsaW5lLCBjb2x1bW4sIGRvbUNvbnRleHQpIHtcblx0dHJ5IHtcblx0XHQvLyBWYWxpZGF0ZSBmaWxlIHBhdGhcblx0XHRjb25zdCB2YWxpZGF0aW9uID0gdmFsaWRhdGVGaWxlUGF0aChmaWxlUGF0aCk7XG5cdFx0aWYgKCF2YWxpZGF0aW9uLmlzVmFsaWQpIHtcblx0XHRcdHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogdmFsaWRhdGlvbi5lcnJvciwgZG9tQ29udGV4dCB9O1xuXHRcdH1cblxuXHRcdC8vIFBhcnNlIEFTVFxuXHRcdGNvbnN0IGFzdCA9IHBhcnNlRmlsZVRvQVNUKHZhbGlkYXRpb24uYWJzb2x1dGVQYXRoKTtcblxuXHRcdC8vIEZpbmQgdGFyZ2V0IG5vZGVcblx0XHRjb25zdCB0YXJnZXROb2RlUGF0aCA9IGZpbmRKU1hFbGVtZW50QXRQb3NpdGlvbihhc3QsIGxpbmUsIGNvbHVtbik7XG5cblx0XHRpZiAoIXRhcmdldE5vZGVQYXRoKSB7XG5cdFx0XHRyZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdUYXJnZXQgbm9kZSBub3QgZm91bmQgYXQgc3BlY2lmaWVkIGxpbmUvY29sdW1uJywgZG9tQ29udGV4dCB9O1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGlmIHRoZSB0YXJnZXQgbm9kZSBpcyBhIGJsYWNrbGlzdGVkIGNvbXBvbmVudFxuXHRcdGNvbnN0IGlzQmxhY2tsaXN0ZWQgPSBpc0JsYWNrbGlzdGVkQ29tcG9uZW50KHRhcmdldE5vZGVQYXRoLm5vZGUpO1xuXG5cdFx0aWYgKGlzQmxhY2tsaXN0ZWQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHN1Y2Nlc3M6IHRydWUsXG5cdFx0XHRcdGZpbGVQYXRoLFxuXHRcdFx0XHRzcGVjaWZpY0xpbmU6ICcnLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBHZXQgc3BlY2lmaWMgbGluZSBjb2RlXG5cdFx0Y29uc3Qgc3BlY2lmaWNMaW5lID0gZ2VuZXJhdGVDb2RlKHRhcmdldE5vZGVQYXRoLnBhcmVudFBhdGg/Lm5vZGUgfHwgdGFyZ2V0Tm9kZVBhdGgubm9kZSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0c3VjY2VzczogdHJ1ZSxcblx0XHRcdGZpbGVQYXRoLFxuXHRcdFx0c3BlY2lmaWNMaW5lLFxuXHRcdH07XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Y29uc29sZS5lcnJvcignW2FzdC11dGlsc10gRXJyb3IgZXh0cmFjdGluZyBjb2RlIGJsb2NrczonLCBlcnJvcik7XG5cdFx0cmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIGV4dHJhY3QgY29kZSBibG9ja3MnLCBkb21Db250ZXh0IH07XG5cdH1cbn1cblxuLyoqXG4gKiBQcm9qZWN0IHJvb3QgcGF0aFxuICovXG5leHBvcnQgeyBWSVRFX1BST0pFQ1RfUk9PVCB9O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXERvd25sb2Fkc1xcXFxob3Jpem9ucy1leHBvcnQtNWNvZGlnbyBwYXJhIGdpdDk3LTI1NzAxNjY2NWEwYiAoMilcXFxccGx1Z2luc1xcXFx2aXN1YWwtZWRpdG9yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXERvd25sb2Fkc1xcXFxob3Jpem9ucy1leHBvcnQtNWNvZGlnbyBwYXJhIGdpdDk3LTI1NzAxNjY2NWEwYiAoMilcXFxccGx1Z2luc1xcXFx2aXN1YWwtZWRpdG9yXFxcXHZpdGUtcGx1Z2luLWVkaXQtbW9kZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVVNFUi9Eb3dubG9hZHMvaG9yaXpvbnMtZXhwb3J0LTVjb2RpZ28lMjBwYXJhJTIwZ2l0OTctMjU3MDE2NjY1YTBiJTIwKDIpL3BsdWdpbnMvdmlzdWFsLWVkaXRvci92aXRlLXBsdWdpbi1lZGl0LW1vZGUuanNcIjtpbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IEVESVRfTU9ERV9TVFlMRVMgfSBmcm9tICcuL3Zpc3VhbC1lZGl0b3ItY29uZmlnJztcblxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcbmNvbnN0IF9fZGlybmFtZSA9IHJlc29sdmUoX19maWxlbmFtZSwgJy4uJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlubGluZUVkaXREZXZQbHVnaW4oKSB7XG5cdHJldHVybiB7XG5cdFx0bmFtZTogJ3ZpdGU6aW5saW5lLWVkaXQtZGV2Jyxcblx0XHRhcHBseTogJ3NlcnZlJyxcblx0XHR0cmFuc2Zvcm1JbmRleEh0bWwoKSB7XG5cdFx0XHRjb25zdCBzY3JpcHRQYXRoID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdlZGl0LW1vZGUtc2NyaXB0LmpzJyk7XG5cdFx0XHRjb25zdCBzY3JpcHRDb250ZW50ID0gcmVhZEZpbGVTeW5jKHNjcmlwdFBhdGgsICd1dGYtOCcpO1xuXG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGFnOiAnc2NyaXB0Jyxcblx0XHRcdFx0XHRhdHRyczogeyB0eXBlOiAnbW9kdWxlJyB9LFxuXHRcdFx0XHRcdGNoaWxkcmVuOiBzY3JpcHRDb250ZW50LFxuXHRcdFx0XHRcdGluamVjdFRvOiAnYm9keSdcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRhZzogJ3N0eWxlJyxcblx0XHRcdFx0XHRjaGlsZHJlbjogRURJVF9NT0RFX1NUWUxFUyxcblx0XHRcdFx0XHRpbmplY3RUbzogJ2hlYWQnXG5cdFx0XHRcdH1cblx0XHRcdF07XG5cdFx0fVxuXHR9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXERvd25sb2Fkc1xcXFxob3Jpem9ucy1leHBvcnQtNWNvZGlnbyBwYXJhIGdpdDk3LTI1NzAxNjY2NWEwYiAoMilcXFxccGx1Z2luc1xcXFx2aXN1YWwtZWRpdG9yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXERvd25sb2Fkc1xcXFxob3Jpem9ucy1leHBvcnQtNWNvZGlnbyBwYXJhIGdpdDk3LTI1NzAxNjY2NWEwYiAoMilcXFxccGx1Z2luc1xcXFx2aXN1YWwtZWRpdG9yXFxcXHZpc3VhbC1lZGl0b3ItY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9VU0VSL0Rvd25sb2Fkcy9ob3Jpem9ucy1leHBvcnQtNWNvZGlnbyUyMHBhcmElMjBnaXQ5Ny0yNTcwMTY2NjVhMGIlMjAoMikvcGx1Z2lucy92aXN1YWwtZWRpdG9yL3Zpc3VhbC1lZGl0b3ItY29uZmlnLmpzXCI7ZXhwb3J0IGNvbnN0IFBPUFVQX1NUWUxFUyA9IGBcbiNpbmxpbmUtZWRpdG9yLXBvcHVwIHtcblx0d2lkdGg6IDM2MHB4O1xuXHRwb3NpdGlvbjogZml4ZWQ7XG5cdHotaW5kZXg6IDEwMDAwO1xuXHRiYWNrZ3JvdW5kOiAjMTYxNzE4O1xuXHRjb2xvcjogd2hpdGU7XG5cdGJvcmRlcjogMXB4IHNvbGlkICM0YTU1Njg7XG5cdGJvcmRlci1yYWRpdXM6IDE2cHg7XG5cdHBhZGRpbmc6IDhweDtcblx0Ym94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMik7XG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGdhcDogMTBweDtcblx0ZGlzcGxheTogbm9uZTtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG5cdCNpbmxpbmUtZWRpdG9yLXBvcHVwIHtcblx0XHR3aWR0aDogY2FsYygxMDAlIC0gMjBweCk7XG5cdH1cbn1cblxuI2lubGluZS1lZGl0b3ItcG9wdXAuaXMtYWN0aXZlIHtcblx0ZGlzcGxheTogZmxleDtcblx0dG9wOiA1MCU7XG5cdGxlZnQ6IDUwJTtcblx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG5cbiNpbmxpbmUtZWRpdG9yLXBvcHVwLmlzLWRpc2FibGVkLXZpZXcge1xuXHRwYWRkaW5nOiAxMHB4IDE1cHg7XG59XG5cbiNpbmxpbmUtZWRpdG9yLXBvcHVwIHRleHRhcmVhIHtcblx0aGVpZ2h0OiAxMDBweDtcblx0cGFkZGluZzogNHB4IDhweDtcblx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cdGNvbG9yOiB3aGl0ZTtcblx0Zm9udC1mYW1pbHk6IGluaGVyaXQ7XG5cdGZvbnQtc2l6ZTogMC44NzVyZW07XG5cdGxpbmUtaGVpZ2h0OiAxLjQyO1xuXHRyZXNpemU6IG5vbmU7XG5cdG91dGxpbmU6IG5vbmU7XG59XG5cbiNpbmxpbmUtZWRpdG9yLXBvcHVwIC5idXR0b24tY29udGFpbmVyIHtcblx0ZGlzcGxheTogZmxleDtcblx0anVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblx0Z2FwOiAxMHB4O1xufVxuXG4jaW5saW5lLWVkaXRvci1wb3B1cCAucG9wdXAtYnV0dG9uIHtcblx0Ym9yZGVyOiBub25lO1xuXHRwYWRkaW5nOiA2cHggMTZweDtcblx0Ym9yZGVyLXJhZGl1czogOHB4O1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cdGZvbnQtc2l6ZTogMC43NXJlbTtcblx0Zm9udC13ZWlnaHQ6IDcwMDtcblx0aGVpZ2h0OiAzNHB4O1xuXHRvdXRsaW5lOiBub25lO1xufVxuXG4jaW5saW5lLWVkaXRvci1wb3B1cCAuc2F2ZS1idXR0b24ge1xuXHRiYWNrZ3JvdW5kOiAjNjczZGU2O1xuXHRjb2xvcjogd2hpdGU7XG59XG5cbiNpbmxpbmUtZWRpdG9yLXBvcHVwIC5jYW5jZWwtYnV0dG9uIHtcblx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cdGJvcmRlcjogMXB4IHNvbGlkICMzYjNkNGE7XG5cdGNvbG9yOiB3aGl0ZTtcblxuXHQmOmhvdmVyIHtcblx0YmFja2dyb3VuZDojNDc0OTU4O1xuXHR9XG59XG5gO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9wdXBIVE1MVGVtcGxhdGUoc2F2ZUxhYmVsLCBjYW5jZWxMYWJlbCkge1xuXHRyZXR1cm4gYFxuXHQ8dGV4dGFyZWE+PC90ZXh0YXJlYT5cblx0PGRpdiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIj5cblx0XHQ8YnV0dG9uIGNsYXNzPVwicG9wdXAtYnV0dG9uIGNhbmNlbC1idXR0b25cIj4ke2NhbmNlbExhYmVsfTwvYnV0dG9uPlxuXHRcdDxidXR0b24gY2xhc3M9XCJwb3B1cC1idXR0b24gc2F2ZS1idXR0b25cIj4ke3NhdmVMYWJlbH08L2J1dHRvbj5cblx0PC9kaXY+XG5cdGA7XG59XG5cbmV4cG9ydCBjb25zdCBFRElUX01PREVfU1RZTEVTID0gYFxuXHQjcm9vdFtkYXRhLWVkaXQtbW9kZS1lbmFibGVkPVwidHJ1ZVwiXSBbZGF0YS1lZGl0LWlkXSB7XG5cdFx0Y3Vyc29yOiBwb2ludGVyOyBcblx0XHRvdXRsaW5lOiAycHggZGFzaGVkICMzNTdERjk7IFxuXHRcdG91dGxpbmUtb2Zmc2V0OiAycHg7XG5cdFx0bWluLWhlaWdodDogMWVtO1xuXHR9XG5cdCNyb290W2RhdGEtZWRpdC1tb2RlLWVuYWJsZWQ9XCJ0cnVlXCJdIGltZ1tkYXRhLWVkaXQtaWRdIHtcblx0XHRvdXRsaW5lLW9mZnNldDogLTJweDtcblx0fVxuXHQjcm9vdFtkYXRhLWVkaXQtbW9kZS1lbmFibGVkPVwidHJ1ZVwiXSB7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHR9XG5cdCNyb290W2RhdGEtZWRpdC1tb2RlLWVuYWJsZWQ9XCJ0cnVlXCJdIFtkYXRhLWVkaXQtaWRdOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMzU3REY5MzM7XG5cdFx0b3V0bGluZS1jb2xvcjogIzM1N0RGOTsgXG5cdH1cblxuXHRAa2V5ZnJhbWVzIGZhZGVJblRvb2x0aXAge1xuXHRcdGZyb20ge1xuXHRcdFx0b3BhY2l0eTogMDtcblx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWSg1cHgpO1xuXHRcdH1cblx0XHR0byB7XG5cdFx0XHRvcGFjaXR5OiAxO1xuXHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuXHRcdH1cblx0fVxuXG5cdCNpbmxpbmUtZWRpdG9yLWRpc2FibGVkLXRvb2x0aXAge1xuXHRcdGRpc3BsYXk6IG5vbmU7IFxuXHRcdG9wYWNpdHk6IDA7IFxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMUQxRTIwO1xuXHRcdGNvbG9yOiB3aGl0ZTtcblx0XHRwYWRkaW5nOiA0cHggOHB4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDhweDtcblx0XHR6LWluZGV4OiAxMDAwMTtcblx0XHRmb250LXNpemU6IDE0cHg7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzNCM0Q0QTtcblx0XHRtYXgtd2lkdGg6IDE4NHB4O1xuXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcblx0fVxuXG5cdCNpbmxpbmUtZWRpdG9yLWRpc2FibGVkLXRvb2x0aXAudG9vbHRpcC1hY3RpdmUge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGFuaW1hdGlvbjogZmFkZUluVG9vbHRpcCAwLjJzIGVhc2Utb3V0IGZvcndhcmRzO1xuXHR9XG5gO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVU0VSXFxcXERvd25sb2Fkc1xcXFxob3Jpem9ucy1leHBvcnQtNWNvZGlnbyBwYXJhIGdpdDk3LTI1NzAxNjY2NWEwYiAoMilcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxEb3dubG9hZHNcXFxcaG9yaXpvbnMtZXhwb3J0LTVjb2RpZ28gcGFyYSBnaXQ5Ny0yNTcwMTY2NjVhMGIgKDIpXFxcXHBsdWdpbnNcXFxcdml0ZS1wbHVnaW4taWZyYW1lLXJvdXRlLXJlc3RvcmF0aW9uLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9VU0VSL0Rvd25sb2Fkcy9ob3Jpem9ucy1leHBvcnQtNWNvZGlnbyUyMHBhcmElMjBnaXQ5Ny0yNTcwMTY2NjVhMGIlMjAoMikvcGx1Z2lucy92aXRlLXBsdWdpbi1pZnJhbWUtcm91dGUtcmVzdG9yYXRpb24uanNcIjtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZnJhbWVSb3V0ZVJlc3RvcmF0aW9uUGx1Z2luKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICd2aXRlOmlmcmFtZS1yb3V0ZS1yZXN0b3JhdGlvbicsXG4gICAgYXBwbHk6ICdzZXJ2ZScsXG4gICAgdHJhbnNmb3JtSW5kZXhIdG1sKCkge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gYFxuICAgICAgY29uc3QgQUxMT1dFRF9QQVJFTlRfT1JJR0lOUyA9IFtcbiAgICAgICAgICBcImh0dHBzOi8vaG9yaXpvbnMuaG9zdGluZ2VyLmNvbVwiLFxuICAgICAgICAgIFwiaHR0cHM6Ly9ob3Jpem9ucy5ob3N0aW5nZXIuZGV2XCIsXG4gICAgICAgICAgXCJodHRwczovL2hvcml6b25zLWZyb250ZW5kLWxvY2FsLmhvc3Rpbmdlci5kZXZcIixcbiAgICAgIF07XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBwYWdlIGlzIGluIGFuIGlmcmFtZVxuICAgICAgICBpZiAod2luZG93LnNlbGYgIT09IHdpbmRvdy50b3ApIHtcbiAgICAgICAgICBjb25zdCBTVE9SQUdFX0tFWSA9ICdob3Jpem9ucy1pZnJhbWUtc2F2ZWQtcm91dGUnO1xuXG4gICAgICAgICAgY29uc3QgZ2V0Q3VycmVudFJvdXRlID0gKCkgPT4gbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2ggKyBsb2NhdGlvbi5oYXNoO1xuXG4gICAgICAgICAgY29uc3Qgc2F2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb3V0ZSA9IGdldEN1cnJlbnRSb3V0ZSgpO1xuICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZLCBjdXJyZW50Um91dGUpO1xuICAgICAgICAgICAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHttZXNzYWdlOiAncm91dGUtY2hhbmdlZCcsIHJvdXRlOiBjdXJyZW50Um91dGV9LCAnKicpO1xuICAgICAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCByZXBsYWNlSGlzdG9yeVN0YXRlID0gKHVybCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIHVybCk7XG4gICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBQb3BTdGF0ZUV2ZW50KCdwb3BzdGF0ZScsIHsgc3RhdGU6IGhpc3Rvcnkuc3RhdGUgfSkpO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2gge31cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgcmVzdG9yZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNhdmVkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWSk7XG4gICAgICAgICAgICAgIGlmICghc2F2ZWQpIHJldHVybjtcblxuICAgICAgICAgICAgICBpZiAoIXNhdmVkLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU1RPUkFHRV9LRVkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50Um91dGUoKTtcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT09IHNhdmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXBsYWNlSGlzdG9yeVN0YXRlKHNhdmVkKSkge1xuICAgICAgICAgICAgICAgICAgcmVwbGFjZUhpc3RvcnlTdGF0ZSgnLycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSAoZG9jdW1lbnQuYm9keT8uaW5uZXJUZXh0IHx8ICcnKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlc3RvcmVkIHJvdXRlIHJlc3VsdHMgaW4gdG9vIGxpdHRsZSBjb250ZW50LCBhc3N1bWUgaXQgaXMgaW52YWxpZCBhbmQgbmF2aWdhdGUgaG9tZVxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2VIaXN0b3J5U3RhdGUoJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgICAgICAgICAgIH0sIDEwMDApKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCB7fVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBvcmlnaW5hbFB1c2hTdGF0ZSA9IGhpc3RvcnkucHVzaFN0YXRlO1xuICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgICAgICAgb3JpZ2luYWxQdXNoU3RhdGUuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICBzYXZlKCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IG9yaWdpbmFsUmVwbGFjZVN0YXRlID0gaGlzdG9yeS5yZXBsYWNlU3RhdGU7XG4gICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICAgICAgICBvcmlnaW5hbFJlcGxhY2VTdGF0ZS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIHNhdmUoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgZ2V0UGFyZW50T3JpZ2luID0gKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYW5jZXN0b3JPcmlnaW5zICYmXG4gICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYW5jZXN0b3JPcmlnaW5zLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmFuY2VzdG9yT3JpZ2luc1swXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlcikge1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVSTChkb2N1bWVudC5yZWZlcnJlcikub3JpZ2luO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkludmFsaWQgcmVmZXJyZXIgVVJMOlwiLCBkb2N1bWVudC5yZWZlcnJlcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc2F2ZSk7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBzYXZlKTtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhcmVudE9yaWdpbiA9IGdldFBhcmVudE9yaWdpbigpO1xuXG4gICAgICAgICAgICAgIGlmIChldmVudC5kYXRhPy50eXBlID09PSBcInJlZGlyZWN0LWhvbWVcIiAmJiBwYXJlbnRPcmlnaW4gJiYgQUxMT1dFRF9QQVJFTlRfT1JJR0lOUy5pbmNsdWRlcyhwYXJlbnRPcmlnaW4pKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2F2ZWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZKTtcblxuICAgICAgICAgICAgICAgIGlmKHNhdmVkICYmIHNhdmVkICE9PSAnLycpIHtcbiAgICAgICAgICAgICAgICAgIHJlcGxhY2VIaXN0b3J5U3RhdGUoJy8nKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICBgO1xuXG4gICAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgdGFnOiAnc2NyaXB0JyxcbiAgICAgICAgICBhdHRyczogeyB0eXBlOiAnbW9kdWxlJyB9LFxuICAgICAgICAgIGNoaWxkcmVuOiBzY3JpcHQsXG4gICAgICAgICAgaW5qZWN0VG86ICdoZWFkJ1xuICAgICAgICB9XG4gICAgICBdO1xuICAgIH1cbiAgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVVNFUlxcXFxEb3dubG9hZHNcXFxcaG9yaXpvbnMtZXhwb3J0LTVjb2RpZ28gcGFyYSBnaXQ5Ny0yNTcwMTY2NjVhMGIgKDIpXFxcXHBsdWdpbnNcXFxcc2VsZWN0aW9uLW1vZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVTRVJcXFxcRG93bmxvYWRzXFxcXGhvcml6b25zLWV4cG9ydC01Y29kaWdvIHBhcmEgZ2l0OTctMjU3MDE2NjY1YTBiICgyKVxcXFxwbHVnaW5zXFxcXHNlbGVjdGlvbi1tb2RlXFxcXHZpdGUtcGx1Z2luLXNlbGVjdGlvbi1tb2RlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9VU0VSL0Rvd25sb2Fkcy9ob3Jpem9ucy1leHBvcnQtNWNvZGlnbyUyMHBhcmElMjBnaXQ5Ny0yNTcwMTY2NjVhMGIlMjAoMikvcGx1Z2lucy9zZWxlY3Rpb24tbW9kZS92aXRlLXBsdWdpbi1zZWxlY3Rpb24tbW9kZS5qc1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnO1xuXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xuY29uc3QgX19kaXJuYW1lID0gcmVzb2x2ZShfX2ZpbGVuYW1lLCAnLi4nKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0aW9uTW9kZVBsdWdpbigpIHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiAndml0ZTpzZWxlY3Rpb24tbW9kZScsXG5cdFx0YXBwbHk6ICdzZXJ2ZScsXG5cblx0XHR0cmFuc2Zvcm1JbmRleEh0bWwoKSB7XG5cdFx0XHRjb25zdCBzY3JpcHRQYXRoID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdzZWxlY3Rpb24tbW9kZS1zY3JpcHQuanMnKTtcblx0XHRcdGNvbnN0IHNjcmlwdENvbnRlbnQgPSByZWFkRmlsZVN5bmMoc2NyaXB0UGF0aCwgJ3V0Zi04Jyk7XG5cblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0YWc6ICdzY3JpcHQnLFxuXHRcdFx0XHRcdGF0dHJzOiB7IHR5cGU6ICdtb2R1bGUnIH0sXG5cdFx0XHRcdFx0Y2hpbGRyZW46IHNjcmlwdENvbnRlbnQsXG5cdFx0XHRcdFx0aW5qZWN0VG86ICdib2R5Jyxcblx0XHRcdFx0fSxcblx0XHRcdF07XG5cdFx0fSxcblx0fTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbWEsT0FBT0EsV0FBVTtBQUNwYixPQUFPLFdBQVc7QUFDbEIsU0FBUyxjQUFjLG9CQUFvQjs7O0FDRnNlLE9BQU9DLFdBQVU7QUFDbGlCLFNBQVMsU0FBQUMsY0FBYTtBQUN0QixPQUFPQyxvQkFBbUI7QUFDMUIsWUFBWSxPQUFPO0FBQ25CLE9BQU9DLFNBQVE7OztBQ0o4YixPQUFPLFFBQVE7QUFDNWQsT0FBTyxVQUFVO0FBQ2pCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sY0FBYztBQUNyQixTQUFTLGFBQWE7QUFDdEIsT0FBTyxtQkFBbUI7QUFDMUI7QUFBQSxFQUNDO0FBQUEsRUFDQTtBQUFBLE9BQ007QUFUOFIsSUFBTSwyQ0FBMkM7QUFXdFYsSUFBTSxhQUFhLGNBQWMsd0NBQWU7QUFDaEQsSUFBTUMsYUFBWSxLQUFLLFFBQVEsVUFBVTtBQUN6QyxJQUFNLG9CQUFvQixLQUFLLFFBQVFBLFlBQVcsT0FBTztBQTJCbEQsU0FBUyxpQkFBaUIsVUFBVTtBQUMxQyxNQUFJLENBQUMsVUFBVTtBQUNkLFdBQU8sRUFBRSxTQUFTLE9BQU8sT0FBTyxtQkFBbUI7QUFBQSxFQUNwRDtBQUVBLFFBQU0sbUJBQW1CLEtBQUssUUFBUSxtQkFBbUIsUUFBUTtBQUVqRSxNQUFJLFNBQVMsU0FBUyxJQUFJLEtBQ3RCLENBQUMsaUJBQWlCLFdBQVcsaUJBQWlCLEtBQzlDLGlCQUFpQixTQUFTLGNBQWMsR0FBRztBQUM5QyxXQUFPLEVBQUUsU0FBUyxPQUFPLE9BQU8sZUFBZTtBQUFBLEVBQ2hEO0FBRUEsTUFBSSxDQUFDLEdBQUcsV0FBVyxnQkFBZ0IsR0FBRztBQUNyQyxXQUFPLEVBQUUsU0FBUyxPQUFPLE9BQU8saUJBQWlCO0FBQUEsRUFDbEQ7QUFFQSxTQUFPLEVBQUUsU0FBUyxNQUFNLGNBQWMsaUJBQWlCO0FBQ3hEO0FBT08sU0FBUyxlQUFlLGtCQUFrQjtBQUNoRCxRQUFNLFVBQVUsR0FBRyxhQUFhLGtCQUFrQixPQUFPO0FBRXpELFNBQU8sTUFBTSxTQUFTO0FBQUEsSUFDckIsWUFBWTtBQUFBLElBQ1osU0FBUyxDQUFDLE9BQU8sWUFBWTtBQUFBLElBQzdCLGVBQWU7QUFBQSxFQUNoQixDQUFDO0FBQ0Y7QUFTTyxTQUFTLHlCQUF5QixLQUFLLE1BQU0sUUFBUTtBQUMzRCxNQUFJLGlCQUFpQjtBQUNyQixNQUFJLGtCQUFrQjtBQUN0QixNQUFJLGtCQUFrQjtBQUN0QixRQUFNLGlCQUFpQixDQUFDO0FBRXhCLFFBQU0sVUFBVTtBQUFBLElBQ2Ysa0JBQWtCQyxPQUFNO0FBQ3ZCLFlBQU0sT0FBT0EsTUFBSztBQUNsQixVQUFJLEtBQUssS0FBSztBQUViLFlBQUksS0FBSyxJQUFJLE1BQU0sU0FBUyxRQUN4QixLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sU0FBUyxNQUFNLEtBQUssR0FBRztBQUNsRCwyQkFBaUJBO0FBQ2pCLFVBQUFBLE1BQUssS0FBSztBQUNWO0FBQUEsUUFDRDtBQUdBLFlBQUksS0FBSyxJQUFJLE1BQU0sU0FBUyxNQUFNO0FBQ2pDLHlCQUFlLEtBQUs7QUFBQSxZQUNuQixNQUFBQTtBQUFBLFlBQ0EsUUFBUSxLQUFLLElBQUksTUFBTTtBQUFBLFlBQ3ZCLFVBQVUsS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLFNBQVMsTUFBTTtBQUFBLFVBQ2xELENBQUM7QUFBQSxRQUNGO0FBR0EsWUFBSSxLQUFLLElBQUksTUFBTSxTQUFTLE1BQU07QUFDakMsZ0JBQU0sV0FBVyxLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sU0FBUyxNQUFNO0FBQ3hELGNBQUksV0FBVyxpQkFBaUI7QUFDL0IsOEJBQWtCO0FBQ2xCLDhCQUFrQkE7QUFBQSxVQUNuQjtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBO0FBQUEsSUFFQSxXQUFXQSxPQUFNO0FBeEhuQjtBQXlIRyxZQUFNLE9BQU9BLE1BQUs7QUFDbEIsVUFBSSxDQUFDLEtBQUssS0FBSztBQUNkO0FBQUEsTUFDRDtBQUdBLFVBQUksS0FBSyxJQUFJLE1BQU0sT0FBTyxRQUFRLEtBQUssSUFBSSxJQUFJLE9BQU8sTUFBTTtBQUMzRDtBQUFBLE1BQ0Q7QUFHQSxVQUFJLEdBQUMsS0FBQUEsTUFBSyxLQUFLLG1CQUFWLG1CQUEwQixNQUFLO0FBQ25DO0FBQUEsTUFDRDtBQUVBLFlBQU0sY0FBY0EsTUFBSyxLQUFLLGVBQWUsSUFBSSxNQUFNO0FBQ3ZELFlBQU0sYUFBYUEsTUFBSyxLQUFLLGVBQWUsSUFBSSxNQUFNO0FBR3RELFVBQUksZ0JBQWdCLE1BQU07QUFDekIsY0FBTSxXQUFXLEtBQUssSUFBSSxhQUFhLE1BQU07QUFDN0MsWUFBSSxXQUFXLGlCQUFpQjtBQUMvQiw0QkFBa0I7QUFDbEIsNEJBQWtCQSxNQUFLLElBQUksZ0JBQWdCO0FBQUEsUUFDNUM7QUFDQTtBQUFBLE1BQ0Q7QUFHQSxVQUFJLGNBQWMsTUFBTTtBQUN2QixjQUFNLFlBQVksT0FBTyxlQUFlO0FBQ3hDLFlBQUksV0FBVyxpQkFBaUI7QUFDL0IsNEJBQWtCO0FBQ2xCLDRCQUFrQkEsTUFBSyxJQUFJLGdCQUFnQjtBQUFBLFFBQzVDO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBRUEsZ0JBQWMsUUFBUSxLQUFLLE9BQU87QUFJbEMsUUFBTSxZQUFZLGtCQUFrQixNQUFNLEtBQUs7QUFDL0MsU0FBTyxtQkFBbUIsbUJBQW1CLFlBQVksa0JBQWtCO0FBQzVFO0FBcUNPLFNBQVMsYUFBYSxNQUFNLFVBQVUsQ0FBQyxHQUFHO0FBQ2hELFFBQU0sbUJBQW1CLFNBQVMsV0FBVztBQUM3QyxRQUFNLFNBQVMsaUJBQWlCLE1BQU0sT0FBTztBQUM3QyxTQUFPLE9BQU87QUFDZjtBQVNPLFNBQVMsc0JBQXNCLEtBQUssZ0JBQWdCLGNBQWM7QUFDeEUsUUFBTSxtQkFBbUIsU0FBUyxXQUFXO0FBQzdDLFNBQU8saUJBQWlCLEtBQUs7QUFBQSxJQUM1QixZQUFZO0FBQUEsSUFDWjtBQUFBLEVBQ0QsR0FBRyxZQUFZO0FBQ2hCOzs7QURoTkEsSUFBTSxxQkFBcUIsQ0FBQyxLQUFLLFVBQVUsVUFBVSxLQUFLLFFBQVEsTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sU0FBUyxTQUFTLEtBQUs7QUFFN0gsU0FBUyxZQUFZLFFBQVE7QUFDNUIsUUFBTSxRQUFRLE9BQU8sTUFBTSxHQUFHO0FBRTlCLE1BQUksTUFBTSxTQUFTLEdBQUc7QUFDckIsV0FBTztBQUFBLEVBQ1I7QUFFQSxRQUFNLFNBQVMsU0FBUyxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEMsUUFBTSxPQUFPLFNBQVMsTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3RDLFFBQU0sV0FBVyxNQUFNLE1BQU0sR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHO0FBRTVDLE1BQUksQ0FBQyxZQUFZLE1BQU0sSUFBSSxLQUFLLE1BQU0sTUFBTSxHQUFHO0FBQzlDLFdBQU87QUFBQSxFQUNSO0FBRUEsU0FBTyxFQUFFLFVBQVUsTUFBTSxPQUFPO0FBQ2pDO0FBRUEsU0FBUyxxQkFBcUIsb0JBQW9CLGtCQUFrQjtBQUNuRSxNQUFJLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CO0FBQU0sV0FBTztBQUM1RCxRQUFNLFdBQVcsbUJBQW1CO0FBR3BDLE1BQUksU0FBUyxTQUFTLG1CQUFtQixpQkFBaUIsU0FBUyxTQUFTLElBQUksR0FBRztBQUNsRixXQUFPO0FBQUEsRUFDUjtBQUdBLE1BQUksU0FBUyxTQUFTLHlCQUF5QixTQUFTLFlBQVksU0FBUyxTQUFTLFNBQVMsbUJBQW1CLGlCQUFpQixTQUFTLFNBQVMsU0FBUyxJQUFJLEdBQUc7QUFDcEssV0FBTztBQUFBLEVBQ1I7QUFFQSxTQUFPO0FBQ1I7QUFFQSxTQUFTLGlCQUFpQixhQUFhO0FBQ3RDLE1BQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxRQUFRLFlBQVksS0FBSyxTQUFTLE9BQU87QUFDekUsV0FBTyxFQUFFLFNBQVMsTUFBTSxRQUFRLEtBQUs7QUFBQSxFQUN0QztBQUVBLFFBQU0saUJBQWlCLFlBQVksV0FBVztBQUFBLElBQUssVUFDaEQsdUJBQXFCLElBQUksS0FDM0IsS0FBSyxZQUNILGVBQWEsS0FBSyxRQUFRLEtBQzVCLEtBQUssU0FBUyxTQUFTO0FBQUEsRUFDeEI7QUFFQSxNQUFJLGdCQUFnQjtBQUNuQixXQUFPLEVBQUUsU0FBUyxPQUFPLFFBQVEsZUFBZTtBQUFBLEVBQ2pEO0FBRUEsUUFBTSxVQUFVLFlBQVksV0FBVztBQUFBLElBQUssVUFDekMsaUJBQWUsSUFBSSxLQUNyQixLQUFLLFFBQ0wsS0FBSyxLQUFLLFNBQVM7QUFBQSxFQUNwQjtBQUVBLE1BQUksQ0FBQyxTQUFTO0FBQ2IsV0FBTyxFQUFFLFNBQVMsT0FBTyxRQUFRLGNBQWM7QUFBQSxFQUNoRDtBQUVBLE1BQUksQ0FBRyxrQkFBZ0IsUUFBUSxLQUFLLEdBQUc7QUFDdEMsV0FBTyxFQUFFLFNBQVMsT0FBTyxRQUFRLGNBQWM7QUFBQSxFQUNoRDtBQUVBLE1BQUksQ0FBQyxRQUFRLE1BQU0sU0FBUyxRQUFRLE1BQU0sTUFBTSxLQUFLLE1BQU0sSUFBSTtBQUM5RCxXQUFPLEVBQUUsU0FBUyxPQUFPLFFBQVEsWUFBWTtBQUFBLEVBQzlDO0FBRUEsU0FBTyxFQUFFLFNBQVMsTUFBTSxRQUFRLEtBQUs7QUFDdEM7QUFFZSxTQUFSLG1CQUFvQztBQUMxQyxTQUFPO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFFVCxVQUFVLE1BQU0sSUFBSTtBQUNuQixVQUFJLENBQUMsZUFBZSxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsV0FBVyxpQkFBaUIsS0FBSyxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQ2pHLGVBQU87QUFBQSxNQUNSO0FBRUEsWUFBTSxtQkFBbUJDLE1BQUssU0FBUyxtQkFBbUIsRUFBRTtBQUM1RCxZQUFNLHNCQUFzQixpQkFBaUIsTUFBTUEsTUFBSyxHQUFHLEVBQUUsS0FBSyxHQUFHO0FBRXJFLFVBQUk7QUFDSCxjQUFNLFdBQVdDLE9BQU0sTUFBTTtBQUFBLFVBQzVCLFlBQVk7QUFBQSxVQUNaLFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQSxVQUM3QixlQUFlO0FBQUEsUUFDaEIsQ0FBQztBQUVELFlBQUksa0JBQWtCO0FBRXRCLFFBQUFDLGVBQWMsUUFBUSxVQUFVO0FBQUEsVUFDL0IsTUFBTUYsT0FBTTtBQUNYLGdCQUFJQSxNQUFLLG9CQUFvQixHQUFHO0FBQy9CLG9CQUFNLGNBQWNBLE1BQUs7QUFDekIsb0JBQU0sY0FBY0EsTUFBSyxXQUFXO0FBRXBDLGtCQUFJLENBQUMsWUFBWSxLQUFLO0FBQ3JCO0FBQUEsY0FDRDtBQUVBLG9CQUFNLGVBQWUsWUFBWSxXQUFXO0FBQUEsZ0JBQzNDLENBQUMsU0FBVyxpQkFBZSxJQUFJLEtBQUssS0FBSyxLQUFLLFNBQVM7QUFBQSxjQUN4RDtBQUVBLGtCQUFJLGNBQWM7QUFDakI7QUFBQSxjQUNEO0FBR0Esb0JBQU0sMkJBQTJCLHFCQUFxQixhQUFhLGtCQUFrQjtBQUNyRixrQkFBSSxDQUFDLDBCQUEwQjtBQUM5QjtBQUFBLGNBQ0Q7QUFFQSxvQkFBTSxrQkFBa0IsaUJBQWlCLFdBQVc7QUFDcEQsa0JBQUksQ0FBQyxnQkFBZ0IsU0FBUztBQUM3QixzQkFBTSxvQkFBc0I7QUFBQSxrQkFDekIsZ0JBQWMsb0JBQW9CO0FBQUEsa0JBQ2xDLGdCQUFjLE1BQU07QUFBQSxnQkFDdkI7QUFDQSw0QkFBWSxXQUFXLEtBQUssaUJBQWlCO0FBQzdDO0FBQ0E7QUFBQSxjQUNEO0FBRUEsa0JBQUksZ0NBQWdDO0FBR3BDLGtCQUFNLGVBQWEsV0FBVyxLQUFLLFlBQVksVUFBVTtBQUV4RCxzQkFBTSxpQkFBaUIsWUFBWSxXQUFXO0FBQUEsa0JBQUssVUFBVSx1QkFBcUIsSUFBSSxLQUNsRixLQUFLLFlBQ0gsZUFBYSxLQUFLLFFBQVEsS0FDNUIsS0FBSyxTQUFTLFNBQVM7QUFBQSxnQkFDM0I7QUFFQSxzQkFBTSxrQkFBa0IsWUFBWSxTQUFTO0FBQUEsa0JBQUssV0FDL0MsMkJBQXlCLEtBQUs7QUFBQSxnQkFDakM7QUFFQSxvQkFBSSxtQkFBbUIsZ0JBQWdCO0FBQ3RDLGtEQUFnQztBQUFBLGdCQUNqQztBQUFBLGNBQ0Q7QUFFQSxrQkFBSSxDQUFDLGlDQUFtQyxlQUFhLFdBQVcsS0FBSyxZQUFZLFVBQVU7QUFDMUYsc0JBQU0sc0JBQXNCLFlBQVksU0FBUyxLQUFLLFdBQVM7QUFDOUQsc0JBQU0sZUFBYSxLQUFLLEdBQUc7QUFDMUIsMkJBQU8scUJBQXFCLE1BQU0sZ0JBQWdCLGtCQUFrQjtBQUFBLGtCQUNyRTtBQUVBLHlCQUFPO0FBQUEsZ0JBQ1IsQ0FBQztBQUVELG9CQUFJLHFCQUFxQjtBQUN4QixrREFBZ0M7QUFBQSxnQkFDakM7QUFBQSxjQUNEO0FBRUEsa0JBQUksK0JBQStCO0FBQ2xDLHNCQUFNLG9CQUFzQjtBQUFBLGtCQUN6QixnQkFBYyxvQkFBb0I7QUFBQSxrQkFDbEMsZ0JBQWMsTUFBTTtBQUFBLGdCQUN2QjtBQUVBLDRCQUFZLFdBQVcsS0FBSyxpQkFBaUI7QUFDN0M7QUFDQTtBQUFBLGNBQ0Q7QUFHQSxrQkFBTSxlQUFhLFdBQVcsS0FBSyxZQUFZLFlBQVksWUFBWSxTQUFTLFNBQVMsR0FBRztBQUMzRixvQkFBSSx5QkFBeUI7QUFDN0IsMkJBQVcsU0FBUyxZQUFZLFVBQVU7QUFDekMsc0JBQU0sZUFBYSxLQUFLLEdBQUc7QUFDMUIsd0JBQUksQ0FBQyxxQkFBcUIsTUFBTSxnQkFBZ0Isa0JBQWtCLEdBQUc7QUFDcEUsK0NBQXlCO0FBQ3pCO0FBQUEsb0JBQ0Q7QUFBQSxrQkFDRDtBQUFBLGdCQUNEO0FBQ0Esb0JBQUksd0JBQXdCO0FBQzNCLHdCQUFNLG9CQUFzQjtBQUFBLG9CQUN6QixnQkFBYyxvQkFBb0I7QUFBQSxvQkFDbEMsZ0JBQWMsTUFBTTtBQUFBLGtCQUN2QjtBQUNBLDhCQUFZLFdBQVcsS0FBSyxpQkFBaUI7QUFDN0M7QUFDQTtBQUFBLGdCQUNEO0FBQUEsY0FDRDtBQUdBLGtCQUFJLCtCQUErQkEsTUFBSyxXQUFXO0FBQ25ELHFCQUFPLDhCQUE4QjtBQUNwQyxzQkFBTSx5QkFBeUIsNkJBQTZCLGFBQWEsSUFDdEUsK0JBQ0EsNkJBQTZCLFdBQVcsT0FBSyxFQUFFLGFBQWEsQ0FBQztBQUVoRSxvQkFBSSxDQUFDLHdCQUF3QjtBQUM1QjtBQUFBLGdCQUNEO0FBRUEsb0JBQUkscUJBQXFCLHVCQUF1QixLQUFLLGdCQUFnQixrQkFBa0IsR0FBRztBQUN6RjtBQUFBLGdCQUNEO0FBQ0EsK0NBQStCLHVCQUF1QjtBQUFBLGNBQ3ZEO0FBRUEsb0JBQU0sT0FBTyxZQUFZLElBQUksTUFBTTtBQUNuQyxvQkFBTSxTQUFTLFlBQVksSUFBSSxNQUFNLFNBQVM7QUFDOUMsb0JBQU0sU0FBUyxHQUFHLG1CQUFtQixJQUFJLElBQUksSUFBSSxNQUFNO0FBRXZELG9CQUFNLGNBQWdCO0FBQUEsZ0JBQ25CLGdCQUFjLGNBQWM7QUFBQSxnQkFDNUIsZ0JBQWMsTUFBTTtBQUFBLGNBQ3ZCO0FBRUEsMEJBQVksV0FBVyxLQUFLLFdBQVc7QUFDdkM7QUFBQSxZQUNEO0FBQUEsVUFDRDtBQUFBLFFBQ0QsQ0FBQztBQUVELFlBQUksa0JBQWtCLEdBQUc7QUFDeEIsZ0JBQU0sU0FBUyxzQkFBc0IsVUFBVSxxQkFBcUIsSUFBSTtBQUN4RSxpQkFBTyxFQUFFLE1BQU0sT0FBTyxNQUFNLEtBQUssT0FBTyxJQUFJO0FBQUEsUUFDN0M7QUFFQSxlQUFPO0FBQUEsTUFDUixTQUFTLE9BQU87QUFDZixnQkFBUSxNQUFNLDRDQUE0QyxFQUFFLEtBQUssS0FBSztBQUN0RSxlQUFPO0FBQUEsTUFDUjtBQUFBLElBQ0Q7QUFBQTtBQUFBLElBSUEsZ0JBQWdCLFFBQVE7QUFDdkIsYUFBTyxZQUFZLElBQUksbUJBQW1CLE9BQU8sS0FBSyxLQUFLLFNBQVM7QUFDbkUsWUFBSSxJQUFJLFdBQVc7QUFBUSxpQkFBTyxLQUFLO0FBRXZDLFlBQUksT0FBTztBQUNYLFlBQUksR0FBRyxRQUFRLFdBQVM7QUFBRSxrQkFBUSxNQUFNLFNBQVM7QUFBQSxRQUFHLENBQUM7QUFFckQsWUFBSSxHQUFHLE9BQU8sWUFBWTtBQXpROUI7QUEwUUssY0FBSSxtQkFBbUI7QUFDdkIsY0FBSTtBQUNILGtCQUFNLEVBQUUsUUFBUSxZQUFZLElBQUksS0FBSyxNQUFNLElBQUk7QUFFL0MsZ0JBQUksQ0FBQyxVQUFVLE9BQU8sZ0JBQWdCLGFBQWE7QUFDbEQsa0JBQUksVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLG1CQUFtQixDQUFDO0FBQ3pELHFCQUFPLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLGdDQUFnQyxDQUFDLENBQUM7QUFBQSxZQUMxRTtBQUVBLGtCQUFNLFdBQVcsWUFBWSxNQUFNO0FBQ25DLGdCQUFJLENBQUMsVUFBVTtBQUNkLGtCQUFJLFVBQVUsS0FBSyxFQUFFLGdCQUFnQixtQkFBbUIsQ0FBQztBQUN6RCxxQkFBTyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsT0FBTywrQ0FBK0MsQ0FBQyxDQUFDO0FBQUEsWUFDekY7QUFFQSxrQkFBTSxFQUFFLFVBQVUsTUFBTSxPQUFPLElBQUk7QUFHbkMsa0JBQU0sYUFBYSxpQkFBaUIsUUFBUTtBQUM1QyxnQkFBSSxDQUFDLFdBQVcsU0FBUztBQUN4QixrQkFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQscUJBQU8sSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sV0FBVyxNQUFNLENBQUMsQ0FBQztBQUFBLFlBQzNEO0FBQ0EsK0JBQW1CLFdBQVc7QUFHOUIsa0JBQU0sa0JBQWtCRyxJQUFHLGFBQWEsa0JBQWtCLE9BQU87QUFDakUsa0JBQU0sV0FBVyxlQUFlLGdCQUFnQjtBQUdoRCxrQkFBTSxpQkFBaUIseUJBQXlCLFVBQVUsTUFBTSxTQUFTLENBQUM7QUFFMUUsZ0JBQUksQ0FBQyxnQkFBZ0I7QUFDcEIsa0JBQUksVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLG1CQUFtQixDQUFDO0FBQ3pELHFCQUFPLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLHdDQUF3QyxPQUFPLENBQUMsQ0FBQztBQUFBLFlBQ3pGO0FBRUEsa0JBQU0sdUJBQXVCLGVBQWU7QUFDNUMsa0JBQU0scUJBQW9CLG9CQUFlLGVBQWYsbUJBQTJCO0FBRXJELGtCQUFNLGlCQUFpQixxQkFBcUIsUUFBUSxxQkFBcUIsS0FBSyxTQUFTO0FBRXZGLGdCQUFJLGFBQWE7QUFDakIsZ0JBQUksWUFBWTtBQUNoQixnQkFBSSxXQUFXO0FBRWYsZ0JBQUksZ0JBQWdCO0FBRW5CLDJCQUFhLGFBQWEsb0JBQW9CO0FBRTlDLG9CQUFNLFVBQVUscUJBQXFCLFdBQVc7QUFBQSxnQkFBSyxVQUNsRCxpQkFBZSxJQUFJLEtBQUssS0FBSyxRQUFRLEtBQUssS0FBSyxTQUFTO0FBQUEsY0FDM0Q7QUFFQSxrQkFBSSxXQUFhLGtCQUFnQixRQUFRLEtBQUssR0FBRztBQUNoRCx3QkFBUSxRQUFVLGdCQUFjLFdBQVc7QUFDM0MsMkJBQVc7QUFDWCw0QkFBWSxhQUFhLG9CQUFvQjtBQUFBLGNBQzlDO0FBQUEsWUFDRCxPQUFPO0FBQ04sa0JBQUkscUJBQXVCLGVBQWEsaUJBQWlCLEdBQUc7QUFDM0QsNkJBQWEsYUFBYSxpQkFBaUI7QUFFM0Msa0NBQWtCLFdBQVcsQ0FBQztBQUM5QixvQkFBSSxlQUFlLFlBQVksS0FBSyxNQUFNLElBQUk7QUFDN0Msd0JBQU0sY0FBZ0IsVUFBUSxXQUFXO0FBQ3pDLG9DQUFrQixTQUFTLEtBQUssV0FBVztBQUFBLGdCQUM1QztBQUNBLDJCQUFXO0FBQ1gsNEJBQVksYUFBYSxpQkFBaUI7QUFBQSxjQUMzQztBQUFBLFlBQ0Q7QUFFQSxnQkFBSSxDQUFDLFVBQVU7QUFDZCxrQkFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQscUJBQU8sSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLE9BQU8sa0NBQWtDLENBQUMsQ0FBQztBQUFBLFlBQzVFO0FBRUEsa0JBQU0sc0JBQXNCSCxNQUFLLFNBQVMsbUJBQW1CLGdCQUFnQixFQUFFLE1BQU1BLE1BQUssR0FBRyxFQUFFLEtBQUssR0FBRztBQUN2RyxrQkFBTSxTQUFTLHNCQUFzQixVQUFVLHFCQUFxQixlQUFlO0FBQ25GLGtCQUFNLGFBQWEsT0FBTztBQUUxQixnQkFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQsZ0JBQUksSUFBSSxLQUFLLFVBQVU7QUFBQSxjQUN0QixTQUFTO0FBQUEsY0FDVCxnQkFBZ0I7QUFBQSxjQUNoQjtBQUFBLGNBQ0E7QUFBQSxZQUNELENBQUMsQ0FBQztBQUFBLFVBRUgsU0FBUyxPQUFPO0FBQ2YsZ0JBQUksVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLG1CQUFtQixDQUFDO0FBQ3pELGdCQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsT0FBTyxpREFBaUQsQ0FBQyxDQUFDO0FBQUEsVUFDcEY7QUFBQSxRQUNELENBQUM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNGO0FBQUEsRUFDRDtBQUNEOzs7QUU1VzZmLFNBQVMsb0JBQW9CO0FBQzFoQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxpQkFBQUksc0JBQXFCOzs7QUNzRnZCLElBQU0sbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUR4RmlTLElBQU1DLDRDQUEyQztBQUtsWCxJQUFNQyxjQUFhQyxlQUFjRix5Q0FBZTtBQUNoRCxJQUFNRyxhQUFZLFFBQVFGLGFBQVksSUFBSTtBQUUzQixTQUFSLHNCQUF1QztBQUM3QyxTQUFPO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxxQkFBcUI7QUFDcEIsWUFBTSxhQUFhLFFBQVFFLFlBQVcscUJBQXFCO0FBQzNELFlBQU0sZ0JBQWdCLGFBQWEsWUFBWSxPQUFPO0FBRXRELGFBQU87QUFBQSxRQUNOO0FBQUEsVUFDQyxLQUFLO0FBQUEsVUFDTCxPQUFPLEVBQUUsTUFBTSxTQUFTO0FBQUEsVUFDeEIsVUFBVTtBQUFBLFVBQ1YsVUFBVTtBQUFBLFFBQ1g7QUFBQSxRQUNBO0FBQUEsVUFDQyxLQUFLO0FBQUEsVUFDTCxVQUFVO0FBQUEsVUFDVixVQUFVO0FBQUEsUUFDWDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNEOzs7QUUvQjhmLFNBQVIsK0JBQWdEO0FBQ3BpQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxxQkFBcUI7QUFDbkIsWUFBTSxTQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTZHZixhQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsT0FBTyxFQUFFLE1BQU0sU0FBUztBQUFBLFVBQ3hCLFVBQVU7QUFBQSxVQUNWLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBQzVIMGdCLFNBQVMsZ0JBQUFDLHFCQUFvQjtBQUN2aUIsU0FBUyxXQUFBQyxnQkFBZTtBQUN4QixTQUFTLGlCQUFBQyxzQkFBcUI7QUFGMFMsSUFBTUMsNENBQTJDO0FBSXpYLElBQU1DLGNBQWFDLGVBQWNGLHlDQUFlO0FBQ2hELElBQU1HLGFBQVlDLFNBQVFILGFBQVksSUFBSTtBQUUzQixTQUFSLHNCQUF1QztBQUM3QyxTQUFPO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFFUCxxQkFBcUI7QUFDcEIsWUFBTSxhQUFhRyxTQUFRRCxZQUFXLDBCQUEwQjtBQUNoRSxZQUFNLGdCQUFnQkUsY0FBYSxZQUFZLE9BQU87QUFFdEQsYUFBTztBQUFBLFFBQ047QUFBQSxVQUNDLEtBQUs7QUFBQSxVQUNMLE9BQU8sRUFBRSxNQUFNLFNBQVM7QUFBQSxVQUN4QixVQUFVO0FBQUEsVUFDVixVQUFVO0FBQUEsUUFDWDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNEOzs7QU4xQkEsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTSxRQUFRLFFBQVEsSUFBSSxhQUFhO0FBRXZDLElBQU0saUNBQWlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBK0N2QyxJQUFNLG9DQUFvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtQjFDLElBQU0sb0NBQW9DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMEIxQyxJQUFNLCtCQUErQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBdUNyQyxJQUFNLDBCQUEwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QmhDLElBQU0sd0JBQXdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBQ04sbUJBQW1CLE1BQU07QUFDeEIsVUFBTSxPQUFPO0FBQUEsTUFDWjtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsT0FBTyxFQUFFLE1BQU0sU0FBUztBQUFBLFFBQ3hCLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsT0FBTyxFQUFFLE1BQU0sU0FBUztBQUFBLFFBQ3hCLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsT0FBTyxFQUFDLE1BQU0sU0FBUTtBQUFBLFFBQ3RCLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsT0FBTyxFQUFFLE1BQU0sU0FBUztBQUFBLFFBQ3hCLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsT0FBTyxFQUFFLE1BQU0sU0FBUztBQUFBLFFBQ3hCLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxNQUNYO0FBQUEsSUFDRDtBQUVBLFFBQUksQ0FBQyxTQUFTLFFBQVEsSUFBSSw4QkFBOEIsUUFBUSxJQUFJLHVCQUF1QjtBQUMxRixXQUFLO0FBQUEsUUFDSjtBQUFBLFVBQ0MsS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFlBQ04sS0FBSyxRQUFRLElBQUk7QUFBQSxZQUNqQix5QkFBeUIsUUFBUSxJQUFJO0FBQUEsVUFDdEM7QUFBQSxVQUNBLFVBQVU7QUFBQSxRQUNYO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFFQSxXQUFPO0FBQUEsTUFDTjtBQUFBLE1BQ0E7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNEO0FBRUEsUUFBUSxPQUFPLE1BQU07QUFBQztBQUV0QixJQUFNLFNBQVMsYUFBYTtBQUM1QixJQUFNLGNBQWMsT0FBTztBQUUzQixPQUFPLFFBQVEsQ0FBQyxLQUFLLFlBQVk7QUFuT2pDO0FBb09DLE9BQUksd0NBQVMsVUFBVCxtQkFBZ0IsV0FBVyxTQUFTLDhCQUE4QjtBQUNyRTtBQUFBLEVBQ0Q7QUFFQSxjQUFZLEtBQUssT0FBTztBQUN6QjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLGNBQWM7QUFBQSxFQUNkLFNBQVM7QUFBQSxJQUNSLEdBQUksUUFBUSxDQUFDLGlCQUFpQixHQUFHLG9CQUFrQixHQUFHLDZCQUE2QixHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQztBQUFBLElBQ2hILE1BQU07QUFBQSxJQUNOO0FBQUEsRUFDRDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1IsZ0NBQWdDO0FBQUEsSUFDakM7QUFBQSxJQUNBLGNBQWM7QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixZQUFZLENBQUMsUUFBUSxPQUFPLFFBQVEsT0FBTyxPQUFTO0FBQUEsSUFDcEQsT0FBTztBQUFBLE1BQ04sS0FBS0MsTUFBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUNyQztBQUFBLEVBQ0Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNOLGVBQWU7QUFBQSxNQUNkLFVBQVU7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJwYXRoIiwgInBhcnNlIiwgInRyYXZlcnNlQmFiZWwiLCAiZnMiLCAiX19kaXJuYW1lIiwgInBhdGgiLCAicGF0aCIsICJwYXJzZSIsICJ0cmF2ZXJzZUJhYmVsIiwgImZzIiwgImZpbGVVUkxUb1BhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJfX2ZpbGVuYW1lIiwgImZpbGVVUkxUb1BhdGgiLCAiX19kaXJuYW1lIiwgInJlYWRGaWxlU3luYyIsICJyZXNvbHZlIiwgImZpbGVVUkxUb1BhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJfX2ZpbGVuYW1lIiwgImZpbGVVUkxUb1BhdGgiLCAiX19kaXJuYW1lIiwgInJlc29sdmUiLCAicmVhZEZpbGVTeW5jIiwgInBhdGgiXQp9Cg==
