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
     * class XsdElement
     **/

    var XsdElement = function XsdElement() {};

    _.extend(XsdElement.prototype, SchemaObject.prototype, {

        ////////////////////////////////////////////////////////////
        //// Public Methods ////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /**
         * XsdElement#makeRegexString(context) -> String
         * - context (String) : The type of parent (e.g 'choice' or 'all')
         *
         * Creates a string of regular expression notation, 
         * defining the types of tags this xsd element defines.
         **/

        makeRegexString : function(context) {
            if (context == 'choice' || context == 'sequence') {
                return this._makeSingleElementRegexString();
            } else if (context == 'all') {
                return this._makeAllCandidateRegexString();
            }
        },


        ////////////////////////////////////////////////////////////
        //// Private Methods ///////////////////////////////////////
        ////////////////////////////////////////////////////////////
        

        /**
         * XsdElement#_makeSingleElementRegexString() -> String
         *
         * Makes a regex string defining the tags this element allows,
         * when used as a constituent of a sequence or a choice element.
         **/

        _makeSingleElementRegexString : function() {
            var minOccurs       = this.element.attr('minOccurs') || 0,
                maxOccurs       = null,
                baseRegexString = '(<' + this.element.attr('ref') + '>)',
                tailRegex       = '';

            if (!this.element.attr('maxOccurs') ||
                this.element.attr('maxOccurs') == 'unbounded') {
                tailRegex = baseRegexString + '*';
                maxOccurs = minOccurs;
            } else {
                maxOccurs = this.element.attr('maxOccurs');
                tailRegex = '';
            }
            this.regexString = baseRegexString;
            this.regexString += "{" + minOccurs + "," + maxOccurs + "}";
            this.regexString += tailRegex;
            return this.regexString;
        },

        /**
         * XsdElement#_makeAllCandidateRegexString() -> String
         *
         * Constructs (and stores) a string of regex notation
         * describing the tag sequences this element defines,
         * when used as a constituent of an xsd:all element.
         **/

        _makeAllCandidateRegexString : function() {
            var minOccurs       = this.element.attr('minOccurs') || 1,
                maxOccurs       = 1,
                baseRegexString = '(<' + this.element.attr('ref') + '>)';
            
            this.regexString = baseRegexString;
            this.regexString += "{" + minOccurs + "," + maxOccurs + "}";
            return this.regexString;
        }
        
    });

    return XsdElement;
    

});