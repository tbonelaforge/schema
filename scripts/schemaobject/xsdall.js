define(
[
    'underscore',
    'schemaobject',
],
function(
    _,
    SchemaObject

) {

    /**
     * class XsdAll
     **/

    var XsdAll = function() {};

    _.extend(XsdAll.prototype, SchemaObject.prototype, {

        ////////////////////////////////////////////////////////////
        //// Public Methods ////////////////////////////////////////
        ////////////////////////////////////////////////////////////


        /**
         * XsdAll#makeRegexString() -> Object
         * 
         * Builds a string of regular expression notation,
         * that will recognize all the tag
         * sequences defined by the caller's xsd:all element.
         **/

        makeRegexString : function(context) { // Always operates the same.
            var self                    = this,
                permutationRegexStrings = [];

            _.each(self._getAllPermutations(), function(permutation) {
                permutationRegexStrings.push(
                    self._getRegexStringForPermutation(permutation)
                );
            });
            this.regexString = '^(' + permutationRegexStrings.join('|') + ')$';
            return this.regexString;
        },

        /**
         * XsdAll#checkChildren() -> boolean
         *
         * Goes through all children, 
         * making sure that they all represent xsd:elements.
         **/

        checkChildren : function() {
            for (var i = 0; i < this.getChildren().length; i++) {
                if (this.getChildren()[i].element[0].tagName != 'xsd:element') {
                    return false;
                }
            }
            return true;
        },

        /////////////////////////////////////////////////////////////
        //// Private Methods ///////////////////////////////////////
        ////////////////////////////////////////////////////////////

        /**
         * XsdAll#_getAllPermutations() -> Array
         *
         * Returns an array of n! arrays, each of length n,
         * where n is the number of children of the calling object.
         * Each sub-array is a permutation of the integers 0..(n-1).
         **/

        _getAllPermutations : function() {
            var initialPermutation = _.range(this.getChildren().length);
            return this._permute(initialPermutation);
        },

        /**
         * XsdAll#_getRegexStringForPermutation(permutation) -> String
         * permutation (Array) : Represents a particular ordering of children.
         *
         * Combines all the regex strings of the caller's children,
         * using the order specified by the given permutation.
         **/

        _getRegexStringForPermutation : function(permutation) {
            var self = this,
                regexStrings = null;

            regexStrings = _.map(permutation, function(index) {
                return self.getChildren()[index].makeRegexString('all');
            });
            return '(' + regexStrings.join('') + ')';
        },

        /**
         * XsdAll#_permute(permutation) -> Array
         * permutation (Array) : An array of indices.
         *
         * Recursively generates all permutations of the given array.
         **/

        _permute : function(permutation) {
            var self    = this,
                results = null,
                prunedPermutation = null;

            if (permutation.length == 1) {
                return [permutation];
            }
            results = [];
            _.each(permutation, function(index) {
                prunedPermutation = _.without(permutation, index);
                _.each(self._permute(prunedPermutation), function(subResult) {
                    results.push([index].concat(subResult));
                });
            });
            return results;
        }

    });    

    return XsdAll;
    
});