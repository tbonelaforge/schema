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

    var xsd = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">' +
      '<xsd:element name="red">' +
        '<xsd:complexType>' +
          '<xsd:sequence>' +
            '<xsd:choice minOccurs="0" maxOccurs="2">' +
              '<xsd:element ref="black" />' +
            '</xsd:choice>' +
          '</xsd:sequence>' +
        '</xsd:complexType>' +
      '</xsd:element>' +
        
      '<xsd:element name="black">' +
        '<xsd:complexType>' +
          '<xsd:sequence>' +
            '<xsd:choice minOccurs="0" maxOccurs="2">' +
              '<xsd:element ref="red" />' +
              '<xsd:element ref="black" />' +
            '</xsd:choice>' +
          '</xsd:sequence>' +
        '</xsd:complexType>' +
      '</xsd:element>' +  
    '</xsd:schema>';

    var schema = new Schema();
    schema.initialize(xsd);

    var xml = "<black></black>";
    var documentVisualizer = DocumentVisualizer.constructFromXml(xml, 'black');

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