define(
[
    'jquery',
    'schemaobject/xsdall',
    'schemaobject/xsdchoice',
    'schemaobject/xsdcomplextype',
    'schemaobject/xsdelement',
    'schemaobject/xsdsequence'
],
function(
    $,
    XsdAll,
    XsdChoice,
    XsdComplexType,
    XsdElement,
    XsdSequence
) {

    var Factory = {


        ////////////////////////////////////////////////////////////
        //// Public Methods ////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /**
         * SchemaObjectFactory#create(xsdElement) -> Object
         * - xsdElement (Object) : A jquery xml DOM element, 
         * resulting from a tag in an xsd.
         *
         * Identifies the correct type of object to construct,
         * constructs one from the given element, and returns it.
         **/

        create : function(xsdElement) {
            var Module   = null, // Constructor function to use.
                instance = null;

            switch (xsdElement.tagName.toLowerCase()) {
            case "xsd:element" :
                Module = XsdElement;
                break;
            case "xsd:complextype" :
                Module = XsdComplexType;
                break;
            case "xsd:sequence" :
                Module = XsdSequence;
                break;
            case "xsd:choice" :
                Module = XsdChoice;
                break;
            case "xsd:all" :
                Module = XsdAll;
                break;
            default :
                return null;
                break;
            }

            instance = new Module();
            instance.initialize(this._jquery(xsdElement));
            return instance;
        },


        ////////////////////////////////////////////////////////////
        //// Private Methods ///////////////////////////////////////
        ////////////////////////////////////////////////////////////

        _jquery : $
    };

    return Factory;

});