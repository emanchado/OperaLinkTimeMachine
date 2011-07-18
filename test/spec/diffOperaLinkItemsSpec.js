describe("diffOperaLinkItems", function() {
    it("should diff empty object lists", function() {
        expect(diffOperaLinkItems([], [])).toEqual({'added':    [],
                                                    'modified': [],
                                                    'removed':  []});
    });

    it("should diff equal object lists", function() {
        var obj = {'id': '123',
                   'properties': {
                       'title': 'Title 1',
                       'uri':   'http://example.com',
                   }};
        expect(diffOperaLinkItems([obj], [obj])).toEqual({'added':    [],
                                                          'modified': [],
                                                          'removed':  []});
    });

    it("should diff equivalent (different order) object lists", function() {
        var obj = {'id': '123',
                   'properties': {
                       'title': 'Title 1',
                       'uri':   'http://example.com',
                   }};
        var obj2 = {'id': '456',
                    'properties': {
                        'title': 'Title 2',
                        'uri':   'http://www.example.com',
                    }};
        var list1 = [obj, obj2];
        var list2 = [obj2, obj];
        expect(diffOperaLinkItems(list1, list2)).toEqual({'added':    [],
                                                          'modified': [],
                                                          'removed':  []});
    });

    it("should diff an extra object", function() {
        var obj = {'id': '123',
                   'properties': {
                       'title': 'Title 1',
                       'uri':   'http://example.com',
                   }};
        expect(diffOperaLinkItems([], [obj])).toEqual({'added':    [obj],
                                                       'modified': [],
                                                       'removed':  []});
    });

    it("should diff a missing object", function() {
        var obj = {'id': '123',
                   'properties': {
                       'title': 'Title 1',
                       'uri':   'http://example.com',
                   }};
        expect(diffOperaLinkItems([obj], [])).toEqual({'added':    [],
                                                       'modified': [],
                                                       'removed':  [obj]});
    });

    it("should diff a modified object", function() {
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
        var diff = {'id': '123',
                    'title': {'oldValue': 'Title 1',
                              'newValue': 'Title 2'}};
        expect(diffOperaLinkItems([obj1], [obj2])).toEqual({'added':    [],
                                                            'modified': [diff],
                                                            'removed':  []});
    });

    it("should diff a modified object in different order", function() {
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
        var obj3 = {'id': '456',
                    'properties': {
                        'title': 'Title 3',
                        'uri':   'http://www.example.com',
                    }};
        var list1 = [obj1, obj3];
        var list2 = [obj3, obj2];
        var diff = {'id': '123',
                    'title': {'oldValue': 'Title 1',
                              'newValue': 'Title 2'}};
        expect(diffOperaLinkItems(list1, list2)).toEqual({'added':    [],
                                                          'modified': [diff],
                                                          'removed':  []});
    });

    it("should diff two equivalent lists with different folders", function() {
        var obj1 = {'id': '123',
                    'properties': {
                        'title': 'Bookmark',
                        'uri':   'http://example.com',
                    }};
        var folder1 = {'id': '456',
                       'properties': {
                           'title': 'Folder',
                       },
                       'children': []};
        var folder2 = {'id': '456',
                       'properties': {
                           'title': 'Folder',
                       },
                       'children': [obj1]};
        var list1 = [obj1, folder1];
        var list2 = [folder2];
        expect(diffOperaLinkItems(list1, list2)).toEqual({'added':    [],
                                                          'modified': [],
                                                          'removed':  []});
    });

    it("should diff modified items in different folders", function() {
        var obj1 = {'id': '123',
                    'properties': {
                        'title': 'Bookmark',
                        'uri':   'http://example.com',
                    }};
        var folder1 = {'id': '456',
                       'properties': {
                           'title': 'Folder',
                       },
                       'children': []};
        var obj2 = {'id': '123',
                    'properties': {
                        'title': 'Bookmark',
                        'uri':   'http://example.com/index.asp',
                    }};
        var folder2 = {'id': '456',
                       'properties': {
                           'title': 'Folder',
                       },
                       'children': [obj2]};
        var list1 = [obj1, folder1];
        var list2 = [folder2];
        var diff = {'id': '123',
                    'uri': {'oldValue': 'http://example.com',
                            'newValue': 'http://example.com/index.asp'}};
        expect(diffOperaLinkItems(list1, list2)).toEqual({'added':    [],
                                                          'modified': [diff],
                                                          'removed':  []});
    });
});
