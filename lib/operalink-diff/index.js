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

// For node.js
if ((typeof module !== 'undefined') && module.exports) {
    module.exports.diffOperaLinkItem = diffOperaLinkItem;
}
