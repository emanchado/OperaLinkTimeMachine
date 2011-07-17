describe("diffOperaLinkItem", function() {
    it("should correctly diff empty objects", function() {
        expect(diffOperaLinkItem({}, {})).toEqual({});
    });

    it("should correctly diff equal objects", function() {
        var obj1 = {'id': '123',
                    'properties': {
                        'title': 'Title 1',
                        'uri':   'http://example.com',
                    }};
        expect(diffOperaLinkItem(obj1, obj1)).toEqual({});
    });

    it("should correctly diff objects with an extra property", function() {
        var obj1 = {'id': '123',
                    'properties': {
                        'title': 'Title 1',
                        'uri':   'http://example.com',
                    }};
        var obj2 = {'id': '123',
                    'properties': {
                        'title':    'Title 1',
                        'uri':      'http://example.com',
                        'nickname': 't',
                    }};

        expect(diffOperaLinkItem(obj1, obj2)).toEqual({'nickname':
                                                       {'oldValue': undefined,
                                                        'newValue': 't'}});
    });

    it("should correctly diff objects with a missing property", function() {
        var obj1 = {'id': '123',
                    'properties': {
                        'title': 'Title 1',
                        'uri':   'http://example.com',
                        'nickname': 't',
                    }};
        var obj2 = {'id': '123',
                    'properties': {
                        'title':    'Title 1',
                        'uri':      'http://example.com',
                    }};

        expect(diffOperaLinkItem(obj1, obj2)).toEqual({
            'nickname': {'oldValue': 't', 'newValue': undefined}});
    });

    it("should correctly diff objects with a different property", function() {
        var obj1 = {'id': '123',
                    'properties': {
                        'title': 'Title 1',
                        'uri':   'http://example.com',
                    }};
        var obj2 = {'id': '123',
                    'properties': {
                        'title': 'Title 2',
                        'uri':   'http://example.com',
                    }};

        expect(diffOperaLinkItem(obj1, obj2)).toEqual({
            'title': {
                'oldValue': 'Title 1',
                'newValue': 'Title 2'
            }});
    });

    it("should correctly diff objects with several different properties", function() {
        var obj1 = {'id': '123',
                    'properties': {
                        'title': 'Title 1',
                        'uri':   'http://example.com',
                    }};
        var obj2 = {'id': '123',
                    'properties': {
                        'title': 'Title 2',
                        'uri':   'http://example.com/',
                    }};

        expect(diffOperaLinkItem(obj1, obj2)).toEqual({
            'title': {
                'oldValue': 'Title 1',
                'newValue': 'Title 2'
            },
            'uri': {
                'oldValue': 'http://example.com',
                'newValue': 'http://example.com/'
            }});
    });
});