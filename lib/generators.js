/**
 * Module dependencies
 */
var ft = require('./fileTools');
var formatTools = require('./formatTools');
var os = require('os');

/**
 * Generate a Mongoose model
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {function} cb
 */
function generateModel(path, modelName, modelFields, generateMethod, cb) {
    var fields = formatTools.getFieldsForModelTemplate(modelFields);
    var schemaName = modelName + 'Schema';

    var model = ft.loadTemplateSync('model.js');
    model = model.replace(/{modelName}/, modelName);
    model = model.replace(/{schemaName}/g, schemaName);
    model = model.replace(/{fields}/, fields);

    if (generateMethod === 't') {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            ft.writeFile(path + '/app/' + modelName + '/' + modelName.toLowerCase() + 'Model.js', model, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            ft.writeFile(path + '/app/' + modelName + '/' + modelName.toLowerCase() + 'Model.js', model, null, cb);
        });
    }
}

/**
 * Generate a Express router
 * @param {string} path
 * @param {string} modelName
 * @param {string} generateMethod
 * @param {function} cb
 */
function generateRouter(path, modelName, generateMethod, cb) {
    var router = ft.loadTemplateSync('router.js');
    router = router.replace(/{controllerName}/g, modelName + 'Controller');

    if (generateMethod === 't') {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            router = router.replace(/{controllerPath}/g, '\'./' + modelName + 'Controller.js\'');
            ft.writeFile(path + '/app/' + modelName + '/' + modelName.toLowerCase() + 'Routes.js', router, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            router = router.replace(/{controllerPath}/g, '\'./' + modelName + 'Controller.js\'');
            ft.writeFile(path + '/app/' + modelName + '/' + modelName.toLowerCase() + 'Routes.js', router, null, cb);
        });
    }
}

/**
 * Generate Controller
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {function} cb
 */
function generateController(path, modelName, modelFields, generateMethod, cb) {
    var controller = ft.loadTemplateSync('controller.js');

    var updateFields = '';
    var createFields = os.EOL;

    modelFields.forEach(function (f, index, fields) {
        var field = f.name;

        updateFields += modelName + '.' + field + ' = req.body.' + field + ' ? req.body.' + field + ' : ' +
            modelName + '.' + field + ';';
        updateFields += os.EOL + '\t\t\t';

        createFields += '\t\t\t' + field + ' : req.body.' + field;
        createFields += ((fields.length - 1) > index) ? ',' + os.EOL : os.EOL;
    });

    controller = controller.replace(/{modelName}/g, modelName + 'Model');
    controller = controller.replace(/{name}/g, modelName);
    controller = controller.replace(/{pluralName}/g, formatTools.pluralize(modelName));
    controller = controller.replace(/{controllerName}/g, modelName + 'Controller');
    controller = controller.replace(/{createFields}/g, createFields);
    controller = controller.replace(/{updateFields}/g, updateFields);

    if (generateMethod === 't') {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            controller = controller.replace(/{modelPath}/g, '\'./' + modelName + 'Model.js\'');
            ft.writeFile(path + '/app/' + modelName + '/' + modelName.toLowerCase() + 'Controller.js', controller, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            controller = controller.replace(/{modelPath}/g, '\'./' + modelName + 'Model.js\'');
            ft.writeFile(path + '/app/' + modelName + '/' + modelName.toLowerCase() + '/' + modelName + 'Controller.js', controller, null, cb);
        });
    }
}


/**
 * Generate Action
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {function} cb
 */
function generateAction(path, modelName, generateMethod, cb) {
    var action = ft.loadTemplateSync('action.js');

    // var updateFields = '';
    // var createFields = os.EOL;

    // modelFields.forEach(function (f, index, fields) {
    //     var field = f.name;

    //     updateFields += modelName + '.' + field + ' = req.body.' + field + ' ? req.body.' + field + ' : ' +
    //         modelName + '.' + field + ';';
    //     updateFields += os.EOL + '\t\t\t';

    //     createFields += '\t\t\t' + field + ' : req.body.' + field;
    //     createFields += ((fields.length - 1) > index) ? ',' + os.EOL : os.EOL;
    // });

    action = action.replace(/{name}/g, modelName);
    action = action.replace(/{actionType}/g, formatTools.uppercase(modelName));
    action = action.replace(/{actionName}/g, modelName + 'Action');

    if (generateMethod === 't') {
        ft.creaeDirIfIsNotDefined(path, modelName, function () {
            ft.writeFile(path + '/app/' + modelName + '/' + modelName.toLowerCase() + 'Action.js', action, null, cb);
        });
    } else {
        ft.createDirIfIsNotDefined(path, modelName, function () {
            ft.writeFile(path + '/app/' + modelName + '/' + modelName.toLowerCase() + 'Action.js', action, null, cb);
        });
    }
}



module.exports = {
    generateModel: generateModel,
    generateRouter: generateRouter,
    generateController: generateController,
    generateAction: generateAction
};