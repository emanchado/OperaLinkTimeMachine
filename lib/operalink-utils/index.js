// For node.js
var v;
if ((typeof module !== 'undefined') && module.exports) {
    v = require("valentine");
}

function diffOperaLinkItem(obj1, obj2, options) {
    var options = options || {};
    options.keepProperties = options.keepProperties || [];
    var props1 = obj1.properties, props2 = obj2.properties;
    if (! options.hasOwnProperty('onlyProperties')) {
        options.onlyProperties = v([v.keys(props1),
                                    v.keys(props2)]).chain().
            flatten().uniq().value();
    }
    var diff = {};
    v.each(options.onlyProperties, function(p) {
        if (props1[p] !== props2[p]) {
            diff[p] = {oldValue: props1[p],
                       newValue: props2[p]};
        }
    });
    v.each(options.keepProperties, function(p) {
        if (! diff.hasOwnProperty(p)) {
            diff[p] = props2[p];
        }
    });
    return diff;
}

function fillHashTable(list, hashTable) {
    for (var i = 0, len = list.length; i < len; i += 1) {
        hashTable[list[i].id] = list[i];
        if (typeof(list[i].children) === "object") {
            fillHashTable(list[i].children, hashTable);
        }
    }
}

function flattenProperties(item, propList) {
    var obj = {id: item.id};
    var props = propList ? propList : v.keys(item.properties);
    v.each(props, function(p) {
        obj[p] = item.properties[p];
    });
    return obj;
}

function diffOperaLinkItems(list1, list2, options) {
    if (options === undefined) options = {};
    var added = [], modified = [], removed = [];
    var idHashTable1 = {}, idHashTable2 = {};
    fillHashTable(list1, idHashTable1);
    fillHashTable(list2, idHashTable2);
    for (p in idHashTable1) {
        if (idHashTable1.hasOwnProperty(p)) {
            if (idHashTable2.hasOwnProperty(p)) {
                var objectDiff = diffOperaLinkItem(idHashTable1[p],
                                                   idHashTable2[p],
                                                   options);
                var isDiffNonEmpty = v.some(v.keys(objectDiff), function(k) {
                    return typeof(objectDiff[k]) === 'object';
                });
                if (isDiffNonEmpty) {
                    objectDiff.id = p;
                    modified.push(objectDiff);
                }
            } else {
                removed.push(flattenProperties(idHashTable1[p],
                                               options.onlyProperties));
            }
        }
    }
    for (p in idHashTable2) {
        if (idHashTable2.hasOwnProperty(p) &&
                ! idHashTable1.hasOwnProperty(p)) {
            added.push(flattenProperties(idHashTable2[p],
                                         options.onlyProperties));
        }
    }
    return {'added':    added,
            'modified': modified,
            'removed':  removed};
}

function countOperaLinkItems(list, itemType) {
    var childrenPerItem = v.map(list, function(i) {
        var count = (itemType === undefined || i.item_type === itemType) ?
            1 : 0;
        return count + ((typeof(i.children) === 'object') ?
                        countOperaLinkItems(i.children, itemType) : 0);
    });
    return v.reduce(childrenPerItem, function(a, b) { return a + b }, 0);
}

// For node.js
if ((typeof module !== 'undefined') && module.exports) {
    module.exports.diffOperaLinkItem   = diffOperaLinkItem;
    module.exports.diffOperaLinkItems  = diffOperaLinkItems;
    module.exports.countOperaLinkItems = countOperaLinkItems;
}
