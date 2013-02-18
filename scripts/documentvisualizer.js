define(['jquery'], function($) {
    var DocumentVisualizer = function(parsedXmlElement) {
        this.xmlElement = parsedXmlElement;
        this.htmlElement = null;
        this.dataRow = null;
        this.dataCell = null;
        this.link = null;
        this.childRow = null;
        this.children = [];
        this.parent = null;

        var xmlChildren = this.xmlElement.children();
        for (var i = 0; i < xmlChildren.length; i++) {
            this.children.push(new DocumentVisualizer($(xmlChildren[i])));
            this.children[i].parent = this;
        }        


    };

    DocumentVisualizer.constructFromXml = function(xmlString, rootName) {
        var xmlDoc = $.parseXML(xmlString);
        var $xmlDoc = $( xmlDoc );
        var root = $($xmlDoc.find(rootName)[0]);
        return new DocumentVisualizer(root);
    }

    DocumentVisualizer.prototype = {
        visualize : function(insertionPoint, options) {
            this.makeHtmlElements(options);
            insertionPoint.append(this.htmlElement);
            for (var i = 0; i < this.children.length; i++) {
                var nextInsertionPoint = $('<td valign="top">');
                this.childRow.append(nextInsertionPoint);
                this.children[i].visualize(nextInsertionPoint, options);
            }
        },

        makeHtmlElements : function(options) {
            var self = this,
                text = self.xmlElement[0].tagName.toLowerCase();

            self.htmlElement = $('<table border="1">');
            self.dataCell = $('<td colspan="2">');
            self.dataCell.html(text);
            self.dataRow = $('<tr align="center">');
            self.dataRow.append(self.dataCell);
            self.htmlElement.append(self.dataRow);
            self.childRow = $('<tr>');
            self.htmlElement.append(self.childRow);
            if (options.droppableOptions) {
                self.dataCell.droppable(options.droppableOptions(self));
            }
            if (options.onMouseDown) {
                self.dataCell.on('mousedown', function(event) {
                    options.onMouseDown(self);
                });
            }
        },

        traverse : function(processor) {
            processor(this);
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].traverse(processor);
            }
        },

        addChild : function(newXmlElement, options) {
            var newChild = new DocumentVisualizer(newXmlElement),
                insertionPoint = $('<td valign="top">');

            this.childRow.append(insertionPoint);
            this.dataCell.attr('colspan', this.childRow.children().length);
            newChild.visualize(insertionPoint, options);
            this.children.push(newChild);
            this.xmlElement.append(newXmlElement);
        },

        getXml : function() {
            var temp = document.createElement('div');
            temp.appendChild(this.xmlElement[0]);
            return temp.innerHTML;
        }
    };
    return DocumentVisualizer;
});