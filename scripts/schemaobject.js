define(
[
    'jquery',
    'underscore'
], 
function(
    $,
    _
) {

    /**
     *  Class SchemaObject(xsdElement) -> Object
     * - xsdElement (Object) : A jquery object, representing a tag in an xsd.
     **/
    var SchemaObject = function() {

    };

    _.extend(SchemaObject.prototype, {
        
        ////////////////////////////////////////////////////////////
        //// Public Methods ////////////////////////////////////////
        ////////////////////////////////////////////////////////////
        initialize : function(xsdElement) {
            this.element        = xsdElement;
            this.representative = null;
            this.children       = null;
            this.regexString    = '';
            this.name           = null;
        },

        getExample : function() {
            return this._jquery('<' + this.getName() + '>');
        },

        getRepresentative : function() {
            if (!this.representative) {
                this.representative = this.getExample();
            }
            return this.representative;
        },

        getName : function() {
            if (this.name) {
                return this.name;
            }
            return this.element.attr('name');
        },

        setName : function(name) {
            this.name = name;
        },


        /**
         * SchemaObject#getChildren()
         *
         *  returns the array of children (schemaobjects).
         **/
        getChildren : function() {
            if (!this.children) {
                this.children = [];
            }
            return this.children;
        },

        /**
         * SchemaObject#makeRegexString(context)
         * context (String) : The type of this object's parent
         *
         * Constructs a string of regex notation,
         * describing the pattern of xml elements this object defines.
         * The context is used for the XsdElement subclass, 
         * since it works differently (has different defaults) 
         * in different contexts.
         **/
        makeRegexString : function(context) {

            // To be overridden by subclasses.
            throw "makeRegexString not implemented for " + this.toString();
        },

        /**
         * SchemaObject#getChildByTagName(tagName) -> Object
         * tagName (String) : The name of a schema element whose object is to be found.
         *
         * Searches through the calling object's children, 
         * returning one representing an xsd:schema tag having the given name, 
         * or null if not found.
         **/

        getChildByTagName : function(tagName) {
            var child = null;

            for (var i = 0; i < this.getChildren().length; i++) {
                child = this.getChildren()[i];
                if (child.element[0].tagName == tagName) {
                    return child;
                }
            }
            return null;
        },



        ////////////////////////////////////////////////////////////
        //// Private Functions /////////////////////////////////////
        ////////////////////////////////////////////////////////////
        
        _jquery : function(object) {
            return $(object);
        }


    });

    return SchemaObject;

});