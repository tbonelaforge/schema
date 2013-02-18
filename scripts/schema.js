define(
[
    'jquery',
    'underscore',
    'schemaobject',
    'schemaobject/factory',
],
function(
    $,
    _,
    SchemaObject,
    Factory
) {

    var Schema = function() {};

    _.extend(Schema.prototype, {
        
        ////////////////////////////////////////////////////////////
        //// Public Methods ////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        
        initialize : function(xsd) {
            this._xsd = xsd;
            this._parsedXsd = this._jquery(this._jquery.parseXML(xsd))
            this._rootObject = new SchemaObject();
            this._rootObject.initialize(this._parsedXsd.find('schema'));
            this._populateChildren(this._rootObject);
            this._makeDefinitions();
        },
     

        allowsAddChild : function(parent, child) {
            var parentDefinition = this._getDefinition(parent),
                childString      = this._makeChildString(parent),
                testString       = childString + '<' + child[0].tagName + '>';

            return parentDefinition.regex.test(testString);
        },

        getDefinitionByName : function(name) {
            for (var i = 0; i < this.definitions.length; i++ ) {
                if (this.definitions[i].getName() == name) {
                    return this.definitions[i];
                }
            }
            return null;
        },

        ////////////////////////////////////////////////////////////
        //// Private Methods ///////////////////////////////////////
        ////////////////////////////////////////////////////////////

        _populateChildren : function(schemaObject) {
            var self        = this,
                xmlChildren = schemaObject.element.children(),
                child       = null;

            schemaObject.children = [];
            if (xmlChildren.length == 0) {
                return;
            }
            _.each(xmlChildren, function(xmlChild) { // XML DOM elements.
                if (child = Factory.create(xmlChild)) {
                    self._populateChildren(child);
                    schemaObject.children.push(child);
                }
            });
        },

        _makeDefinitions : function() {
            var self = this;

            self.definitions = [];
            _.each(self._rootObject.getChildren(), function(child) {
                var complexType = null;
                if (child.element[0].tagName == 'xsd:element') {
                    complexType = child.getChildByTagName('xsd:complexType');
                    if (!complexType) {
                        throw "Each element definition must be a complex type!";
                    }
                    complexType.makeRegex();
                    complexType.setName(child.getName());
                    self.definitions.push(complexType);
                }
            });
        },


        _getDefinition : function(xmlElement) {
            var nameRegex = new RegExp(xmlElement[0].tagName, 'i');
            
            for (var i = 0; i < this.definitions.length; i++) {
                if (nameRegex.test(this.definitions[i].getName())) {
                    return this.definitions[i];
                }
            }
            return null;
        },
        
        _makeChildString : function(parentXmlElement) {
            var childString = '',
                childName   = '',
                children    = parentXmlElement.children();
            
            for (var i = 0; i < children.length; i++) {
                childName = children[i].tagName;
                childString += '<' + childName + '>';
            }
            return childString;
        },
        
        _jquery : $
        
    });

    return Schema;

});