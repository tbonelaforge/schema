define(
[
    'underscore',
    'schemaobject'
],
function(
    _,
    SchemaObject
) {

    /**
     * class XsdComplexType
     **/

    var XsdComplexType = function() {};

    _.extend(XsdComplexType.prototype, SchemaObject.prototype, {

        ////////////////////////////////////////////////////////////
        //// Public Methods ////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        makeRegex : function() {
            this.regex = new RegExp(this.makeRegexString(), 'i');
            return this.regex;
        },


        makeRegexString : function() {
            var child = null;

            if ((child = this.getChildByTagName('xsd:sequence')) ||
                (child = this.getChildByTagName('xsd:all'))) {
                this.regexString = '^' + child.makeRegexString() + '$';
            } else {
                this.regexString = '^$';
            }
            return this.regexString;
        }


    });    

    return XsdComplexType;
    
});