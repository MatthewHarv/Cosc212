/**
 * Created by nickmeek on 7/7/17.
 */

/* global L, Library, Book */
var map;
/**
 * A closure that provides the functionality to manage a Leaflet map and add
 * markers to represent libraries in and around Dunedin. The information about the libraries is
 * retrieved from an xml file (./xml/libraries.xml)
 *
 * @return {obj} An object of public functions
 * */
var LilLibrary = (function () {
    "use strict";
    var pub = {};

    var libraryArray = [];//A collection of libraries (as defined in Library.js)
     //The map object
    var geoJSONLayer; // The layer the geoJSON will be placed on
    var maxID = 0;

    /**
     * Adds a table of basic information about all libraries in an element with the id 'info'
     * */
	 pub.showTable=function(){
		 var createTable = "";
        createTable += "<div><div><table id='clickablerows'><caption>List Of Libraries</caption><thead><tr>";
        createTable += "<th><div label='Address'></div></th><th><div label='Number of books present'></div></th>  <th><div label='Capacity of library'></div></th>";
        createTable += "<th class='scroll'></th></tr></thead><tbody>";
		var countthis = 1;
		 $(libraryArray).each(function () {
            createTable += this.getBasicInfoAsHTMLTableRow();
		  countthis++;
		 });
		 createTable += "</tbody></table></div></div></div>";
		 $("#table").html(createTable);
		
    };


    /**
     * Adds a map (centred on The Octagon) and adds markers for each library
     * */
    pub.addMap = function () {
        map = L.map('map').setView([-45.874234, 170.503152], 13); //The Octagon
        map.on('click', onMapClick);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
            {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>  contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        geoJSONLayer = L.geoJSON(pub.makeGeoJSON(), {
            onEachFeature: onEachFeatureImpl
        }).addTo(map);
    };

    /**
     * Reloads the map
     * */
    pub.reloadMap = function () {
        geoJSONLayer.clearLayers();
        geoJSONLayer = L.geoJSON(pub.makeGeoJSON(), {
            onEachFeature: onEachFeatureImpl
        }).addTo(map);
    };

    /**
     * Generates and displays geoJSON (in a popup) when the map is clicked on a free area
     * @param e Information about the event which caused this function to be called
     * */
    function onMapClick(e) {
        var popup = L.popup();
        popup
            .setLatLng(e.latlng)
            .setContent("Raw GeoJSON<br> " + JSON.stringify(pub.makeGeoJSON()))
            .openOn(map);
    }

    /**
     * Creates a popup containing information about a library.
     * */
    function onEachFeatureImpl(feature, layer) {
        var popupContent = "<strong>Point of Interest</strong> " + feature.properties.description + "<br/>";
        popupContent += "Lng/Lat: " + feature.geometry.coordinates + "<br/>";
        popupContent += "ID: " + feature.id + "<hr/>";
        if (feature.properties && feature.properties.description) {
            popupContent += getLibraryWithId(feature.id);
        }
        layer.bindPopup(popupContent);
    }

    /**
     * Reads and parses the xml data and creates an array of Library objects
     * @return {promise}
     * */
    pub.getXMLData = function () {
        return $.ajax({
            url: "./libraries.xml",
            async: true,
            dataType: "xml",
            success: function (data) {
                //got the contents of the file, now process it
                $(data).find("library").each(function () {
                    var libID = $(this).find("id")[0].textContent;
                    if (parseInt(libID) > maxID) {//keep track of the id numbers
                        maxID = parseInt(libID);
                    }
                    var temp = new Library(//make a new Library object and add the trimmed data
                        $.trim($(this).find("lat")[0].textContent),
                        $.trim($(this).find("lng")[0].textContent),
                        $.trim($(this).find("address")[0].textContent),
                        $.trim($(this).find("capacity")[0].textContent),
                        libID);
                    $(this).find("book").each(function () {//Now make the Book objects for this Library
                        var book = new Book(
                            $.trim($(this).find("title")[0].textContent),
                            $.trim($(this).find("author")[0].textContent),
                            $.trim($(this).find("year")[0].textContent));
                        temp.addBook(book);
                    });
                    addLibrary(temp);// add the new Library to the collection
                });
            },
            error: function () {
                window.alert("Sorry I was unable to retrieve the library data");
            }
        });
    };

    /**
     * Adds a library to the collection
     * @param {Library} The library to be added
     * */
    function addLibrary(lib) {
        libraryArray.push(lib);
    }

    /* Backwards compatible exposing addLibrary to public */
    pub.addLibrary = addLibrary;


    /**
     * Create a JSON representation of the libraries in the current collection
     * @return {JSON} The JSON object
     * */
    pub.makeGeoJSON = function () {
        //Approach is to make a string representation
        //of a geoJSON object for every library in the collection and
        //then use JSON.parse to create geoJSON object
        //s is the imaginatively named string
        var s = '{' +
            '  "type": "FeatureCollection",\n' + '"features":[\n'; // opening fixed part of the file
        for (var i = 0; i < libraryArray.length; i++) {
            s += '{"type": "Feature",\n' +
                '"properties": {\n' +
                '"description":  "' + libraryArray[i].getAddress() + '"\n' +
                '},\n' +
                '"geometry": {\n' +
                '"type": "Point",\n' +
                '"coordinates": [' + libraryArray[i].getLng() + ',' +
                libraryArray[i].getLat() + ']\n' +
                '},\n' +
                '"id":' + libraryArray[i].getId() + '\n' +
                '},\n';
        }
        s += "]}\n"; // fixed closing part of the string

        s = s.substr(0, s.length - 5) + "\n]\n}"; //getting rid of comma after last object in array
        return JSON.parse(s); // return JSON object
    };

    /**
     * Return an HTM list representation of the library in the collection with id
     * @param _id The id of the library to find
     * return {str} The HTML
     * */
    function getLibraryWithId(_id) {
        var result = libraryArray.filter(function (obj) {
            return (parseInt(obj.id) === _id);
        });
        return result[0].getBooksAsList();
    }

    /**
     * Remove library with id from the collection
     * @param _id The id of the library to remove
     * */
    pub.removeLibrary = function (_id) {
        libraryArray = libraryArray.filter(function (obj) {
            return obj.getId() !== _id;
        });
    };

    /**
     * Return a reference to the library in the collection with id
     * @param _id The id of the library to find
     * @return {object} The Library
     * */
    pub.getLibrary = function (_id) {
        var tmp = libraryArray.filter(function (obj) {
            /* jshint -W116 */
            return obj.getId() == _id;
            /* jshint +W116 */
        });
        return tmp[0];
    };

    /**
     * manages the generation of library id numbers
     * @return {oint} The next id number to use
     * */
    pub.newID = function () {
        maxID++;
        return maxID;
    };

    pub.setup = function () {
        // useful hook but no functionality required here
    };
    pub.tmp = function () {
        return geoJSONLayer;
    };

    return pub;
}());

$(document).ready(LilLibrary.setup);
