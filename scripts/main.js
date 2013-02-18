require.config({
    urlArgs : "bust=" + (new Date()).getTime()
});

require(
[
    'jquery', 
    'schema', 
    'documentvisualizer',
    'jquery-ui',
], 
function(
    $, 
    Schema, 
    DocumentVisualizer
) {

    var xsd = '<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">' +

    '<xsd:element name="box">' +
        '<xsd:complexType>' +
        '<xsd:sequence>' +
        '<xsd:element ref="label"      minOccurs="0" />' +
        '<xsd:choice                   minOccurs="1" maxOccurs="unbounded">' +
        '<xsd:element ref="choice"/>' +
        '<xsd:element ref="input" />' +
        '</xsd:choice>' +
        '<xsd:element ref="key"        minOccurs="0" />' +
        '<xsd:element ref="units"      minOccurs="0" />' +
        '<xsd:element ref="descriptor" minOccurs="0" />' +
        '<xsd:element ref="grading"    minOccurs="0" />' +
        '<xsd:element ref="concepts"   minOccurs="0" />' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="choice">' +
        '<xsd:complexType>' +
        '<xsd:all>' +
        '<xsd:element ref="label" />' +
        '<xsd:element ref="feedbackText" minOccurs="0" />' +
        '</xsd:all>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="concepts">' +
        '<xsd:complexType>' +
        '<xsd:sequence>' +
        '<xsd:element ref="concept" minOccurs="0" maxOccurs="unbounded" />' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="concept">' +
        '<xsd:complexType mixed="true">' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="content">' +
        '<xsd:complexType>' +
        '<xsd:sequence>' +
        '<xsd:element ref="instructions" minOccurs="0" maxOccurs="unbounded" />' +
        '<xsd:element ref="given"        minOccurs="0" maxOccurs="unbounded" />' +
        '<xsd:element ref="figure"       minOccurs="0" maxOccurs="unbounded" />' +
        '<xsd:element ref="box"          minOccurs="0" maxOccurs="unbounded" />' +
        '<xsd:choice minOccurs="0">' +
        '<xsd:element ref="stack"/>' +
        '<xsd:element ref="parts"/>' +
        '</xsd:choice>' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="figure">' +
        '<xsd:complexType>' +
        '<xsd:all>' +
        '<xsd:element ref="path"     minOccurs="1" />' +
        '<xsd:element ref="source"   minOccurs="1" />' +
        '</xsd:all>' +
        '<xsd:attribute name="type" default="image"/>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="given">' +
        '<xsd:complexType mixed="true">' +
        '<xsd:sequence>' +
        '<xsd:choice minOccurs="0" maxOccurs="unbounded">' +
        '<xsd:element ref="figure" />' +
        '<xsd:element ref="math" />' +
        '<xsd:element ref="var" />' +
        '</xsd:choice>' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="grading">' +
        '<xsd:complexType>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="feedbackText">' +
        '<xsd:complexType mixed="true">' +
        '<xsd:sequence>' +
        '<xsd:choice minOccurs="0" maxOccurs="unbounded">' +
        '<xsd:element ref="math" />' +
        '<xsd:element ref="var" />' +
        '</xsd:choice>' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="instructions">' +
        '<xsd:complexType mixed="true">' +
        '<xsd:sequence>' +
        '<xsd:choice minOccurs="0" maxOccurs="unbounded">' +
        '<xsd:element ref="math" />' +
        '<xsd:element ref="box" />' +
        '<xsd:element ref="var" />' +
        '</xsd:choice>' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="key">' +
        '<xsd:complexType mixed="true">' +
        '<xsd:sequence>' +
        '<xsd:choice minOccurs="0" maxOccurs="unbounded">' +
        '<xsd:element ref="var" />' +
        '</xsd:choice>' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="label">' +
        '<xsd:complexType mixed="true">' +
        '<xsd:sequence>' +
        '<xsd:choice minOccurs="0" maxOccurs="unbounded">' +
        '<xsd:element ref="math" />' +
        '<xsd:element ref="figure" />' +
        '<xsd:element ref="var" />' +
        '</xsd:choice>' +
        '</xsd:sequence>' +
        '<xsd:attribute name="type" />' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="math">' +
        '<xsd:complexType mixed="true">' +
        '<xsd:sequence>' +
        '<xsd:choice minOccurs="0" maxOccurs="unbounded">' +
        '<xsd:element ref="var" />' +
        '</xsd:choice>' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="parts">' +
        '<xsd:complexType>' +
        '<xsd:sequence>' +
        '<xsd:element ref="content" minOccurs="0" maxOccurs="unbounded" />' +
        '</xsd:sequence>' +
        '<xsd:attribute name="type" default="alpha" />' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="stack">' +
        '<xsd:complexType>' +
        '<xsd:sequence>' +
        '<xsd:choice minOccurs="0" maxOccurs="unbounded">' +
        '<xsd:element ref="box" />' +
        '</xsd:choice>' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '<xsd:element name="units">' +
        '<xsd:complexType mixed="true">' +
        '<xsd:sequence>' +
        '<xsd:choice minOccurs="0" maxOccurs="unbounded">' +
        '<xsd:element ref="math" />' +
        '<xsd:element ref="var" />' +
        '</xsd:choice>' +
        '</xsd:sequence>' +
        '</xsd:complexType>' +
        '</xsd:element>' +

    '</xsd:schema>';

    var schema = new Schema();
    schema.initialize(xsd);

    var xml = "<content></content>";
    var documentVisualizer = DocumentVisualizer.constructFromXml(xml, 'content');

    documentVisualizer.visualize($('#documentVisualization'), {
        droppableOptions : dropOptionsForVisualizer,
        onMouseDown      : highlightDraggables
    });

    $(document).on('mouseup', function(event) {
        highlightDraggables(null);
    });

    updateDroppables();

    var controls = [];

    buildControls();


    function dropOptionsForVisualizer(visualizer) {
        return {
            drop : function(event, ui) {
                var name = ui.draggable.attr('id');
                var newXmlElement = schema.getDefinitionByName(name).getExample();
                visualizer.addChild(newXmlElement, {
                    droppableOptions : dropOptionsForVisualizer,
                    onMouseDown      : highlightDraggables
                });
                updateDroppables();
            },
            activeClass : 'ui-state-highlight'
        };
    }

    function highlightDraggables(visualizer) {
        var parent = null,
            child  = null;

        for (var i = 0; i < schema.definitions.length; i++) {
            controls[i].removeClass('ui-state-highlight');
            if (visualizer) {
                child = schema.definitions[i].getRepresentative();
                parent = visualizer.xmlElement;
                if (schema.allowsAddChild(parent, child)) {
                    controls[i].addClass('ui-state-highlight');
                }
            }
        }
    }


    function updateDroppables() {
        documentVisualizer.traverse(function(visualizer) {
            var selectorString = getDroppableSelectors(visualizer);
            visualizer.dataCell.droppable('option', 'accept', selectorString);
        });
    }

    function getDroppableSelectors(visualizer) {
        var selectors = [];

        for (var i = 0; i < schema.definitions.length; i++ ) {
            var parent = visualizer.xmlElement;
            var child = schema.definitions[i].getRepresentative();
            if (schema.allowsAddChild(parent, child)) {
                selectors.push('#' + schema.definitions[i].getName());
            } 
        }
        return selectors.join(', ');
    }

    function buildControls() {
        var control = null,
            name    = null;

        for (var i = 0; i < schema.definitions.length; i++) {
            name = schema.definitions[i].getName();

            control = $('<div id="' + name + '">' + name + '</div>');
            $('#controls').append(control);
            control.draggable({
                helper : 'clone'
            });
            controls.push(control);
        }
        control = $('<input type="button" value="Get Xml">');
        control.on('click', function(event) {
            console.log(documentVisualizer.getXml());
        });
        $('#controls').append(control)
    }

});