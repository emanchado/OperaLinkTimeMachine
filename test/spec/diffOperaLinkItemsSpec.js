describe("diffOperaLinkItems", function() {
    it("should diff empty item lists", function() {
        expect(diffOperaLinkItems([], [])).toEqual({'added':    [],
                                                    'modified': [],
                                                    'removed':  []});
    });

    it("should diff equal item lists", function() {
        var obj = {'id': '123',
                   'properties': {
                       'title': 'Title 1',
                       'uri':   'http://example.com',
                   }};
        expect(diffOperaLinkItems([obj], [obj])).toEqual({'added':    [],
                                                          'modified': [],
                                                          'removed':  []});
    });

    it("should diff equivalent (different order) item lists", function() {
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

    it("should diff an extra item", function() {
        var obj = {'id': '123',
                   'properties': {
                       'title': 'Title 1',
                       'uri':   'http://example.com',
                   }};
        var addedObj = {'id':    '123',
                        'title': 'Title 1',
                        'uri':   'http://example.com'};
        expect(diffOperaLinkItems([], [obj])).toEqual({'added':    [addedObj],
                                                       'modified': [],
                                                       'removed':  []});
    });

    it("should diff a missing item", function() {
        var obj = {'id': '123',
                   'properties': {
                       'title': 'Title 1',
                       'uri':   'http://example.com',
                   }};
        var remObj = {'id':    '123',
                      'title': 'Title 1',
                      'uri':   'http://example.com'};
        expect(diffOperaLinkItems([obj], [])).toEqual({'added':    [],
                                                       'modified': [],
                                                       'removed':  [remObj]});
    });

    it("should diff a modified item", function() {
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

    it("should diff a modified item in different order", function() {
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

    it("should ignores differences in filtered-out properties", function() {
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
        expect(diffOperaLinkItems(list1, list2,
                                  {onlyProperties: ["title"]})).toEqual({
                                      'added':    [],
                                      'modified': [],
                                      'removed':  []});
    });

    it("should ignores filtered-out properties in added/removed items", function() {
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
        var obj2 = {'id': '789',
                    'properties': {
                        'title': 'Bookmark 2',
                        'uri':   'http://example.com:8888/index.js',
                    }};
        var list1 = [obj1, folder1];
        var list2 = [obj1, folder1, obj2];
        var flatObj = {'id': '789', 'title': 'Bookmark 2'};
        expect(diffOperaLinkItems(list1, list2,
                                  {onlyProperties: ["title"]})).toEqual({
                                      'added':    [flatObj],
                                      'modified': [],
                                      'removed':  []});
        expect(diffOperaLinkItems(list2, list1,
                                  {onlyProperties: ["title"]})).toEqual({
                                      'added':    [],
                                      'modified': [],
                                      'removed':  [flatObj]});
    });

    it("should keep 'keep' properties in modified items", function() {
        var obj1 = {'id': '123',
                    'properties': {
                        'title': 'Bookmark',
                        'uri':   'http://example.com',
                    }};
        var obj2 = {'id': '123',
                    'properties': {
                        'title': 'Bookmark',
                        'uri':   'http://example.com:8888/index.js',
                    }};
        var list1 = [obj1];
        var list2 = [obj1, obj2];
        var diffObj = {'id': '123',
                       'title': 'Bookmark',
                       'uri':   {'oldValue': 'http://example.com',
                                 'newValue': 'http://example.com:8888/index.js'}};
        expect(diffOperaLinkItems([obj1], [obj1, obj2],
                                  {keepProperties: ["title"]})).toEqual({
                                      'added':    [],
                                      'modified': [diffObj],
                                      'removed':  []});
    });

    it("should not consider idential items with 'keep' properties different", function() {
        var obj1 = {'id': '123',
                    'properties': {
                        'title': 'Bookmark',
                        'uri':   'http://example.com',
                    }};
        var obj2 = {'id': '123',
                    'properties': {
                        'title': 'Bookmark',
                        'uri':   'http://example.com',
                    }};
        var list = [obj1, obj2];
        expect(diffOperaLinkItems([obj1], [obj2],
                                  {keepProperties: ["title"]})).toEqual({
                                      'added':    [],
                                      'modified': [],
                                      'removed':  []});
    });
});
