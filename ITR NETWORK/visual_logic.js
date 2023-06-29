/* eslint-disable */

/**
 * Generated by Verge3D Puzzles v.4.3.1
 * Mon, 29 May 2023 05:12:10 GMT
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */
function createPL(v3d = window.v3d) {

// global variables/constants used by puzzles' functions

var LIST_NONE = '<none>';

var _pGlob = {};

_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.pickedObject = '';
_pGlob.hoveredObject = '';
_pGlob.mediaElements = {};
_pGlob.loadedFile = '';
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.openedFile = '';
_pGlob.openedFileMeta = {};
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();
_pGlob.intervalTimers = {};
_pGlob.customEvents = new v3d.EventDispatcher();
_pGlob.eventListeners = [];

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;
_pGlob.SET_OBJ_ROT_EPS = 1e-8;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.vec3Tmp3 = new v3d.Vector3();
_pGlob.vec3Tmp4 = new v3d.Vector3();
_pGlob.eulerTmp = new v3d.Euler();
_pGlob.eulerTmp2 = new v3d.Euler();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.colorTmp = new v3d.Color();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster(); // always check visibility

var PL = {};
// backward compatibility
if (v3d[Symbol.toStringTag] !== 'Module') {
    v3d.PL = v3d.puzzles = PL;
}

PL.procedures = PL.procedures || {};




PL.execInitPuzzles = function(options) {
    // always null, should not be available in "init" puzzles
    var appInstance = null;
    // app is more conventional than appInstance (used in exec script and app templates)
    var app = null;

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }

    // provide the container's id to puzzles that need access to the container
    _initGlob.container = options !== undefined && 'container' in options
            ? options.container : "";

    

    
    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

// app is more conventional than appInstance (used in exec script and app templates)
var app = appInstance;

initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}

this.procedures["getData"] = getData;
this.procedures["setData"] = setData;
this.procedures["notData"] = notData;

var PROC = {
    "getData": getData,
    "setData": setData,
    "notData": notData,
};

var VARS = Object.defineProperties({}, {
    'ubicacionC': { get: function() { return ubicacionC; }, set: function(val) { ubicacionC = val; } },
    'ubicacion_id': { get: function() { return ubicacion_id; }, set: function(val) { ubicacion_id = val; } },
    'x': { get: function() { return x; }, set: function(val) { x = val; } },
    'ubicacion': { get: function() { return ubicacion; }, set: function(val) { ubicacion = val; } },
});

var ubicacionC, ubicacion_id, x, ubicacion;

// utility function envoked by almost all V3D-specific puzzles
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return obj.type !== 'AmbientLight' &&
           obj.name !== '' &&
           !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
           !obj.isAuxClippingMesh;
}


// utility function envoked by almost all V3D-specific puzzles
// find first occurence of the object by its name
function getObjectByName(objName) {
    var objFound;
    var runTime = _pGlob !== undefined;
    objFound = runTime ? _pGlob.objCache[objName] : null;

    if (objFound && objFound.name === objName)
        return objFound;

    if (appInstance.scene) {
        appInstance.scene.traverse(function(obj) {
            if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
                objFound = obj;
                if (runTime) {
                    _pGlob.objCache[objName] = objFound;
                }
            }
        });
    }
    return objFound;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// process object input, which can be either single obj or array of objects, or a group
function retrieveObjectNames(objNames) {
    var acc = [];
    retrieveObjectNamesAcc(objNames, acc);
    return acc.filter(function(name) {
        return name;
    });
}

function retrieveObjectNamesAcc(currObjNames, acc) {
    if (typeof currObjNames == "string") {
        acc.push(currObjNames);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
            retrieveObjectNamesAcc(currObjNames[i], acc);
    }
}

// setActiveCamera puzzle
function setActiveCamera(camName) {
    var camera = getObjectByName(camName);
    if (!camera || !camera.isCamera || appInstance.getCamera() == camera)
        return;
    appInstance.setCamera(camera);
}

// zoomCamera puzzle
function zoomCamera(objSelector, duration, doSlot) {

    duration = Math.max(0, duration);

    const objNames = retrieveObjectNames(objSelector);

    const zoomObjects = [];
    objNames.forEach(function(name) {
        const obj = getObjectByName(name);
        if (obj) {
            zoomObjects.push(obj);
        }
    });

    if (!zoomObjects.length) {
        return;
    }

    const camera = appInstance.getCamera();

    const zoom = [camera.zoom]; // for orthographic camera only

    const pos = _pGlob.vec3Tmp, target = _pGlob.vec3Tmp2;
    v3d.CameraUtils.calcCameraZoomToObjectsParams(camera, zoomObjects,
            pos, target, zoom);

    if (appInstance.controls && appInstance.controls.tween) {
        // orbit and flying cameras
        if (!appInstance.controls.inTween) {
            if (camera.isOrthographicCamera) {
                appInstance.controls.tweenZoomTo(target, zoom[0],
                        duration, doSlot);
            } else {
                appInstance.controls.tween(pos, target, duration, doSlot);
            }
        }
    } else {
        // TODO: static camera, just position it for now
        if (camera.parent) {
            camera.parent.worldToLocal(pos);
        }
        camera.position.copy(pos);
        camera.lookAt(target);
        camera.zoom = zoom[0];
        camera.updateProjectionMatrix();
        doSlot();
    }
}

function _checkListenersSame(target0, type0, listener0, optionsOrUseCapture0,
        target1, type1, listener1, optionsOrUseCapture1) {
    const capture0 = Boolean(optionsOrUseCapture0 instanceof Object
            ? optionsOrUseCapture0.capture : optionsOrUseCapture0);
    const capture1 = Boolean(optionsOrUseCapture1 instanceof Object
            ? optionsOrUseCapture1.capture : optionsOrUseCapture1);
    return target0 === target1 && type0 === type1 && listener0 === listener1
            && capture0 === capture1;
}

/**
 * Add the specified event listener to the specified target. This function also
 * stores listener data for easier disposing.
 */
function bindListener(target, type, listener, optionsOrUseCapture) {
    const alreadyExists = _pGlob.eventListeners.some(elem => {
        return _checkListenersSame(elem.target, elem.type, elem.listener,
                elem.optionsOrUseCapture, target, type, listener,
                optionsOrUseCapture);
    });

    if (!alreadyExists) {
        target.addEventListener(type, listener, optionsOrUseCapture);
        _pGlob.eventListeners.push({ target, type, listener, optionsOrUseCapture });
    }
}

// utility function used by the whenClicked, whenHovered and whenDraggedOver puzzles
function initObjectPicking(callback, eventType, mouseDownUseTouchStart, mouseButtons) {

    var elem = appInstance.renderer.domElement;
    bindListener(elem, eventType, pickListener);

    if (eventType == 'mousedown') {

        var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
        bindListener(elem, touchEventName, pickListener);

    } else if (eventType == 'dblclick') {

        var prevTapTime = 0;

        function doubleTapCallback(event) {

            var now = new Date().getTime();
            var timesince = now - prevTapTime;

            if (timesince < 600 && timesince > 0) {

                pickListener(event);
                prevTapTime = 0;
                return;

            }

            prevTapTime = new Date().getTime();
        }

        var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
        bindListener(elem, touchEventName, doubleTapCallback);
    }

    var raycaster = new v3d.Raycaster();

    function pickListener(event) {

        // to handle unload in loadScene puzzle
        if (!appInstance.getCamera())
            return;

        event.preventDefault();

        var xNorm = 0, yNorm = 0;
        if (event instanceof MouseEvent) {
            if (mouseButtons && mouseButtons.indexOf(event.button) == -1)
                return;
            xNorm = event.offsetX / elem.clientWidth;
            yNorm = event.offsetY / elem.clientHeight;
        } else if (event instanceof TouchEvent) {
            var rect = elem.getBoundingClientRect();
            xNorm = (event.changedTouches[0].clientX - rect.left) / rect.width;
            yNorm = (event.changedTouches[0].clientY - rect.top) / rect.height;
        }

        _pGlob.screenCoords.x = xNorm * 2 - 1;
        _pGlob.screenCoords.y = -yNorm * 2 + 1;
        raycaster.setFromCamera(_pGlob.screenCoords, appInstance.getCamera(true));
        var objList = [];
        appInstance.scene.traverse(function(obj){objList.push(obj);});
        var intersects = raycaster.intersectObjects(objList, false);
        callback(intersects, event);
    }
}

function objectsIncludeObj(objNames, testedObjName) {
    if (!testedObjName) return false;

    for (var i = 0; i < objNames.length; i++) {
        if (testedObjName == objNames[i]) {
            return true;
        } else {
            // also check children which are auto-generated for multi-material objects
            var obj = getObjectByName(objNames[i]);
            if (obj && obj.type == "Group") {
                for (var j = 0; j < obj.children.length; j++) {
                    if (testedObjName == obj.children[j].name) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// utility function used by the whenClicked, whenHovered, whenDraggedOver, and raycast puzzles
function getPickedObjectName(obj) {
    // auto-generated from a multi-material object, use parent name instead
    if (obj.isMesh && obj.isMaterialGeneratedMesh && obj.parent) {
        return obj.parent.name;
    } else {
        return obj.name;
    }
}

// whenClicked puzzle
function registerOnClick(objSelector, xRay, doubleClick, mouseButtons, cbDo, cbIfMissedDo) {

    // for AR/VR
    _pGlob.objClickInfo = _pGlob.objClickInfo || [];

    _pGlob.objClickInfo.push({
        objSelector: objSelector,
        callbacks: [cbDo, cbIfMissedDo]
    });

    initObjectPicking(function(intersects, event) {

        var isPicked = false;

        var maxIntersects = xRay ? intersects.length : Math.min(1, intersects.length);

        for (var i = 0; i < maxIntersects; i++) {
            var obj = intersects[i].object;
            var objName = getPickedObjectName(obj);
            var objNames = retrieveObjectNames(objSelector);

            if (objectsIncludeObj(objNames, objName)) {
                // save the object for the pickedObject block
                _pGlob.pickedObject = objName;
                isPicked = true;
                cbDo(event);
            }
        }

        if (!isPicked) {
            _pGlob.pickedObject = '';
            cbIfMissedDo(event);
        }

    }, doubleClick ? 'dblclick' : 'mousedown', false, mouseButtons);
}

// Describe this function...
function getData() {

  Function('app', 'v3d', 'puzzles', 'VARS', 'PROC', (('// Built-in variables: app, v3d, puzzles, VARS, PROC' + '\n' +
  'function setData(){' + '\n' +
  'try {' + '\n' +
  '      let jsonDataElement = fetchData();' + '\n' +
  '      console.log(jsonDataElement);' + '\n' +
  '      VARS.x = jsonDataElement;' + '\n' +
  '    } catch (error) {' + '\n' +
  '      console.log(\'ERROR\');' + '\n' +
  '       // Handle error if necessary' + '\n' +
  '    }' + '\n' +
  '}' + '\n' +
  '    ' + '\n' +
  'function fetchData() {' + '\n' +
  '  return fetch("https://itrnetwork.azurewebsites.net/api/inventario/ubicacion/"+VARS.ubicacion)' + '\n' +
  '    .then((res) => res.json())' + '\n' +
  '    .then((data) => {' + '\n' +
  '      let j;' + '\n' +
  '      let jsonDataElement = `<tr>`; // Initialize with the opening <tr> tag' + '\n' +
  '      for (let i = 0; i < data.data.length; i++) {' + '\n' +
  '        j = 0;' + '\n' +
  '        Object.values(data.data[i]).forEach((element) => {' + '\n' +
  '          if (j == 0){' + '\n' +
  '          jsonDataElement += `<td id="modelo">${element}</td>`;' + '\n' +
  '          }' + '\n' +
  '          if (j == 1){' + '\n' +
  '          jsonDataElement += `<td id="clasificacion">${element}</td>`;' + '\n' +
  '          }' + '\n' +
  '          if (j == 2){' + '\n' +
  '          jsonDataElement += `<td id="marca">${element}</td>`;' + '\n' +
  '          }' + '\n' +
  '          if (j == 3){' + '\n' +
  '          jsonDataElement += `<td id="cantidad">${element}</td>`;' + '\n' +
  '          }' + '\n' +
  '          j+1;' + '\n' +
  '        });' + '\n' +
  '        jsonDataElement += `</tr><tr>`; // Add closing </tr> tag and opening <tr> tag for the next row' + '\n' +
  '      }' + '\n' +
  '      jsonDataElement += `</tr>`; // Add closing </tr> tag for the last row' + '\n' +
  '      return jsonDataElement; // Resolve the Promise with the complete HTML structure' + '\n' +
  '    })' + '\n' +
  '    .catch((error) => {' + '\n' +
  '      console.log("ERROR:", error);' + '\n' +
  '      throw error; // Propagate the error by throwing it' + '\n' +
  '    });' + '\n' +
  '}    ' + '\n' +
  '' + '\n' +
  'setData();')))(appInstance, v3d, PL, VARS, PROC);

  return x;
}

// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
        ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == 'CONTAINER') {
        if (appInstance !== null) {
            elem = appInstance.container;
        } else if (typeof _initGlob !== 'undefined') {
            // if we are on the initialization stage, we still can have access
            // to the container element
            var id = _initGlob.container;
            if (isParent) {
                elem = parent.document.getElementById(id);
            } else {
                elem = document.getElementById(id);
            }
        }
    } else if (Array.isArray(id) && id[0] == 'WINDOW') {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == 'BODY') {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
        if (isParent)
            elem = parent.document.querySelector(id);
        else
            elem = document.querySelector(id);
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}

// setHTMLElemAttribute puzzle
function setHTMLElemAttribute(attr, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem) continue;

        if ((attr == 'href' || attr == 'src') && value instanceof Promise) {
            // resolve promise value for url-based attributes
            value.then(function(response) {
                elem[attr] = response;
            });
        } else {
            elem[attr] = value;
        }
    }
}

// eventHTMLElem puzzle
function eventHTMLElem(eventType, ids, isParent, callback) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem)
            continue;

        bindListener(elem, eventType, callback);
    }
}

// getHTMLElemAttribute puzzle
function getHTMLElemAttribute(attr, id, isParent) {
    var elem = getElement(id, isParent);
    return elem ? elem[attr]: '';
}

// waitPromise puzzle
_pGlob.promiseValue = '';

function waitPromise(promise, onFulfilled, onRejected) {

    if (promise) {

        promise.then(function(value) {

            window.pv = value;
            _pGlob.promiseValue = value;
            onFulfilled();

        }, function(reason) {

            _pGlob.promiseValue = reason;
            onRejected();

        });

    } else {

        _pGlob.promiseValue = 'Incorrect promise value';
        onRejected();

    }
}

// Describe this function...
function setData(ubicacion_id, ubicacionC) {
  if (getHTMLElemAttribute('innerHTML', 'title', true) != ubicacionC) {
    x = '<div id="loading"></div>';
    setHTMLElemAttribute('innerHTML', ubicacionC, 'title', true);
    setHTMLElemAttribute('innerHTML', x, 'center', true);
    ubicacion = ubicacion_id;
    waitPromise(getData(), function() {
      x = _pGlob.promiseValue;
      setHTMLElemAttribute('innerHTML', x, 'inventario-ubicacion', true);
      setHTMLElemAttribute('innerHTML', '', 'center', true);
    }, function() {
      x = 'Error al cargar datos';
      setHTMLElemAttribute('innerHTML', x, 'inventario-ubicacion', true);
      setHTMLElemAttribute('innerHTML', '', 'center', true);
    });
  }
}

// Describe this function...
function notData(ubicacionC) {
  setHTMLElemAttribute('innerHTML', ubicacionC, 'title', true);
  setHTMLElemAttribute('innerHTML', 'Sin inventario', 'center', true);
  setHTMLElemAttribute('innerHTML', '', 'inventario-ubicacion', true);
}


setActiveCamera('Camera');
registerOnClick('Unidad 3', false, false, [0,1,2], function() {
  setData('u3', 'Unidad 3');
  setActiveCamera('Camera.001');
  zoomCamera('Unidad 3', 2, function() {});
}, function() {});
registerOnClick('Centro de informacion', false, false, [0,1,2], function() {
  setData('ci', 'Centro de Informacion');
  setActiveCamera('Camera.001');
  zoomCamera('Centro de informacion', 2, function() {});
}, function() {});
registerOnClick('Edificio B', false, false, [0,1,2], function() {
  notData('Edificio B');
  setActiveCamera('Camera.001');
  zoomCamera('Edificio B', 2, function() {});
}, function() {});
registerOnClick('Edificio C', false, false, [0,1,2], function() {
  notData('Edificio C');
  setActiveCamera('Camera.001');
  zoomCamera('Edificio C', 2, function() {});
}, function() {});
registerOnClick('Unidad 5', false, false, [0,1,2], function() {
  notData('Unidad 5');
  setActiveCamera('Camera.001');
  zoomCamera('Unidad 5', 2, function() {});
}, function() {});
registerOnClick('Laboratorio de industrial', false, false, [0,1,2], function() {
  notData('Laboratorio de industrial');
  setActiveCamera('Camera.001');
  zoomCamera('Laboratorio de industrial', 2, function() {});
}, function() {});
registerOnClick('Actividades extraescolares', false, false, [0,1,2], function() {
  notData('Actividades extraescolares');
  setActiveCamera('Camera.001');
  zoomCamera('Actividades extraescolares', 2, function() {});
}, function() {});
registerOnClick('Unidad 2', false, false, [0,1,2], function() {
  notData('Unidad 2');
  setActiveCamera('Camera.001');
  zoomCamera('Unidad 2', 2, function() {});
}, function() {});
registerOnClick('Centro de computo', false, false, [0,1,2], function() {
  setData('cc', 'Centro de Computo');
  setActiveCamera('Camera.001');
  zoomCamera('Centro de computo', 2, function() {});
}, function() {});
registerOnClick('Unidad 1', false, false, [0,1,2], function() {
  notData('Unidad 1');
  setActiveCamera('Camera.001');
  zoomCamera('Unidad 1', 2, function() {});
}, function() {});
registerOnClick('Nodo', false, false, [0,1,2], function() {
  notData('Nodo');
  setActiveCamera('Camera.001');
  zoomCamera('Nodo', 2, function() {});
}, function() {});
registerOnClick('Laboratorio electronica', false, false, [0,1,2], function() {
  setData('le', 'Laboratorio de electronica');
  setActiveCamera('Camera.001');
  zoomCamera('Laboratorio electronica', 2, function() {});
}, function() {});
registerOnClick('Servicios escolares', false, false, [0,1,2], function() {
  setData('se', 'Oficinas principales');
  setActiveCamera('Camera.001');
  zoomCamera('Servicios escolares', 2, function() {});
}, function() {});
registerOnClick('Laboratorio electromecanica', false, false, [0,1,2], function() {
  notData('Laboratorio electromecanica');
  setActiveCamera('Camera.001');
  zoomCamera('Laboratorio electromecanica', 2, function() {});
}, function() {});

eventHTMLElem('click', 'reset', false, function(event) {
  setHTMLElemAttribute('innerHTML', 'Instituto Tecnologico de Reynosa', 'title', true);
  setHTMLElemAttribute('innerHTML', '', 'inventario-ubicacion', true);
  setActiveCamera('Camera');
});

ubicacionC;

'Unidad 2';

x;

'Unidad 5';

'Laboratorio de industrial';

'Actividades extraescolares';

'Unidad 2';

'Unidad 1';

'Unidad 1';



} // end of PL.init function

PL.disposeListeners = function() {
    if (_pGlob) {
        _pGlob.eventListeners.forEach(({ target, type, listener, optionsOrUseCapture }) => {
            target.removeEventListener(type, listener, optionsOrUseCapture);
        });
        _pGlob.eventListeners.length = 0;
    }
}

PL.dispose = function() {
    PL.disposeListeners();
    _pGlob = null;
    // backward compatibility
    if (v3d[Symbol.toStringTag] !== 'Module') {
        delete v3d.PL;
        delete v3d.puzzles;
    }
}



return PL;

}

export { createPL };