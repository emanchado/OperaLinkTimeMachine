function diffOperaLinkItem(obj1, obj2) {
    var added = {}, modified = {}, removed = {};
    var props1 = obj1.properties, props2 = obj2.properties;
    var allProps = v([v.keys(props1),
                      v.keys(props2)]).chain().flatten().uniq().value();
    v.each(allProps, function(a) {
        if (props1.hasOwnProperty(a)) {
            if (props2.hasOwnProperty(a)) {
                if (props1[a] !== props2[a]) {
                    modified[a] = {'oldValue': props1[a],
                                   'newValue': props2[a]};
                }
            } else {
                removed[a] = props1[a];
            }
        } else {
            added[a] = props2[a];
        }
    });
    return {'added':    added,
            'modified': modified,
            'removed':  removed};
}

function diffOperaLinkItems(list1, list2) {
    var added = [], modified = [], removed = [];
    var maxLength = Math.max(list1.length, list2.length);
    var idHashTable1 = {}, idHashTable2 = {};
    for (var i = 0; i < maxLength; i += 1) {
        if (i < list1.length) {
            idHashTable1[list1[i].id] = list1[i];
        }
        if (i < list2.length) {
            idHashTable2[list2[i].id] = list2[i];
        }
    }
    for (p in idHashTable1) {
        if (idHashTable1.hasOwnProperty(p)) {
            if (idHashTable2.hasOwnProperty(p)) {
                var objectDiff = diffOperaLinkItem(idHashTable1[p],
                                                   idHashTable2[p]);
                var isDiffEmpty = v.every(v.keys(objectDiff), function(k) {
                    return v.size(v.keys(objectDiff[k])) === 0
                });
                if (! isDiffEmpty) {
                    objectDiff.id = p;
                    modified.push(objectDiff);
                }
            } else {
                removed.push(idHashTable1[p]);
            }
        }
    }
    for (p in idHashTable2) {
        if (idHashTable2.hasOwnProperty(p) &&
                ! idHashTable1.hasOwnProperty(p)) {
            added.push(idHashTable2[p]);
        }
    }
    return {'added':    added,
            'modified': modified,
            'removed':  removed};
}

// For node.js
if ((typeof module !== 'undefined') && module.exports) {
    module.exports.diffOperaLinkItem  = diffOperaLinkItem;
    module.exports.diffOperaLinkItems = diffOperaLinkItems;
}
