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
     * class XsdSequence
     **/

    var XsdSequence = function() {};

    _.extend(XsdSequence.prototype, SchemaObject.prototype, {

        ////////////////////////////////////////////////////////////
        //// Public Methods ////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /**
         * XsdSequence#makeRegexString() -> String
         *
         * Makes ( and stores ) a string of regex notation
         * that will accept the tag sequences defined by
         * the calling object.
         **/

        makeRegexString : function() {
            return _.map(this.getChildren(), function(child) {
                return child.makeRegexString('sequence');
            }).join('');
        }


    });

    return XsdSequence;
    

});