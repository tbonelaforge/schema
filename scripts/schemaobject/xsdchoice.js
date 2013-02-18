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
     * class XsdChoice
     **/

    var XsdChoice = function() {};

    _.extend(XsdChoice.prototype, SchemaObject.prototype, {

        ////////////////////////////////////////////////////////////
        //// Public Methods ////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /**
         * XsdChoice#makeRegexString() -> String
         *
         * Makes (and stores) a string of regex notation,
         * that will recognize the element sequences 
         * defined by the calling object.
         **/

        makeRegexString : function(context) { // Always operates the same.
            var self             = this,
                candidateStrings = [],
                baseRegexString  = '',
                minOccurs        = self.element.attr('minOccurs') || 0,
                maxOccurs        = null,
                tailRegexString  = '';

            _.each(self.getChildren(), function(candidate) {
                candidateStrings.push('<' + candidate.element.attr('ref') + '>');
            });
            baseRegexString = '(' + candidateStrings.join('|') + ')';
            if (!self.element.attr('maxOccurs') ||
                self.element.attr('maxOccurs') == 'unbounded') {
                tailRegexString = baseRegexString + '*';
                maxOccurs = minOccurs;
            } else {
                maxOccurs = self.element.attr('maxOccurs');
                tailRegexString = '';
            }
            this.regexString = baseRegexString;
            this.regexString += "{" + minOccurs + "," + maxOccurs + "}";
            this.regexString += tailRegexString;
            return this.regexString;
        }

    });

    return XsdChoice;
    

});