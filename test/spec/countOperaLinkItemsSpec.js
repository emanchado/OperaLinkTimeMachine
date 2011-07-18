describe("countOperaLinkItems", function() {
    it("should count an empty list of items", function() {
        expect(countOperaLinkItems([])).toEqual(0);
    });

    it("should count a trivial list of items", function() {
        var list = [{"id": "123",
                     "item_type": "bookmark",
                     "properties": {
                         "title": "foo",
                         "uri":   "http://example.com"
                     }},
                    {"id": "456",
                     "item_type": "bookmark",
                     "properties": {
                         "title": "bar",
                         "uri":   "http://example.com"
                     }}];
        expect(countOperaLinkItems(list)).toEqual(2);
    });

    it("should count a list of items with directories", function() {
        var list = [{"id": "123",
                     "item_type": "bookmark",
                     "properties": {
                         "title": "foo",
                         "uri":   "http://example.com"
                     }},
                    {"id": "789",
                     "item_type": "bookmark_folder",
                     "properties": {
                         "title": "folder"
                     },
                     "children": [
                         {"id": "456",
                          "item_type": "bookmark",
                          "properties": {
                              "title": "bar",
                              "uri":   "http://example.com"
                          }}
                     ]}];
        expect(countOperaLinkItems(list)).toEqual(3);
    });

    it("should count only items of a given type", function() {
        var list = [{"id": "123",
                     "item_type": "bookmark",
                     "properties": {
                         "title": "foo",
                         "uri":   "http://example.com"
                     }},
                    {"id": "789",
                     "item_type": "bookmark_folder",
                     "properties": {
                         "title": "folder"
                     },
                     "children": [
                         {"id": "456",
                          "item_type": "bookmark",
                          "properties": {
                              "title": "bar",
                              "uri":   "http://example.com"
                          }}
                     ]}];
        expect(countOperaLinkItems(list, "bookmark")).toEqual(2);
    });

    it("should not count items if the given type is not present", function() {
        var list = [{"id": "123",
                     "item_type": "bookmark",
                     "properties": {
                         "title": "foo",
                         "uri":   "http://example.com"
                     }},
                    {"id": "789",
                     "item_type": "bookmark_folder",
                     "properties": {
                         "title": "folder"
                     },
                     "children": [
                         {"id": "456",
                          "item_type": "bookmark",
                          "properties": {
                              "title": "bar",
                              "uri":   "http://example.com"
                          }}
                     ]}];
        expect(countOperaLinkItems(list, "urlfilter")).toEqual(0);
    });

    it("should not count all children if the given type is 'folder'", function() {
        var list = [{"id": "123",
                     "item_type": "bookmark",
                     "properties": {
                         "title": "foo",
                         "uri":   "http://example.com"
                     }},
                    {"id": "789",
                     "item_type": "bookmark_folder",
                     "properties": {
                         "title": "folder"
                     },
                     "children": [
                         {"id": "456",
                          "item_type": "bookmark",
                          "properties": {
                              "title": "bar",
                              "uri":   "http://example.com"
                          }}
                     ]}];
        expect(countOperaLinkItems(list, "bookmark_folder")).toEqual(1);
    });
});
