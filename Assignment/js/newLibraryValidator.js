/**
 * Created by nickmeek on 7/7/17.
 */
/* global Library, LilLibrary, L, Book */

/**
 * A closure that provides the functionality validate changes to the LilLibrary collection
 *
 * @return {obj} An object of public functions
 * */
var NewLibraryValidator = (function () {
    "use strict";
    var pub = {};
    var valid = true;

    /**
     * Validates form input from addLibrary. Upon success (and confirmation)
     * a new Library object is made and added to the Library collection.
     * Note LilLibrary and Library are assumed to exist
     *
     * @return {bool} false :To suppress reloading of the page
     * */
    function addIfValid() {
        valid = true;
        var lat = checkLat("#addForm");
        var lng = checkLng("#addForm");
        var cap = checkCapacity("#addForm");
        var addr = checkAddress("#addForm");
        checkWithinDunedin("#addForm");
        if (valid) {
            if (window.confirm("About to add the following library. OK?\n" +
                    "Address: " + addr + "\n" +
                    "Lat: " + lat + "\n" +
                    "Lng: " + lng + "\n" +
                    "Capacity: " + cap)) {
                var newLib = new Library(lat * $("#addFormNS").val(), lng * $("#addFormEW").val(), addr, cap, LilLibrary.newID());
                LilLibrary.addLibrary(newLib);
            }
        }
        LilLibrary.reloadMap();
        // we don't actually want the form changing the page location
        return false;
    }

    /**
     * Validates form input from editLibrary. Upon success (and confirmation)
     * the Library object with the supplied id is modified
     * Note LilLibrary and Library are assumed to exist
     *
     * @return {bool} false :To suppress reloading of the page
     * */
    function editIfValid() {
        valid = true;
        var lat = checkLat("#editForm");
        var lng = checkLng("#editForm");
        var cap = checkCapacity("#editForm");
        var addr = checkAddress("#editForm");
        checkWithinDunedin("#editForm");
        if (valid) {
            var id = $("#editFormID").val();
            var lib = LilLibrary.getLibrary(id);
            if (lib) {
                if (window.confirm("About to make the following changes. OK?\n" +
                        "Address: " + addr + "\n" +
                        "Lat: " + lat + "\n" +
                        "Lng: " + lng + "\n" +
                        "Capacity: " + cap)) {
                    lib.lat = lat * $("#editFormNS").val();
                    lib.lng = lng * $("#editFormEW").val();
                    lib.address = addr;
                    lib.capacity = cap;
                }
            }
        }
        LilLibrary.reloadMap();
        // we don't actually want the form changing the page location
        return false;
    }

    /**
     * Validates form input from addBook. Upon success
     * a new Book object is made and added to the Library
     * with the specified id.
     * Note LilLibrary and Library are assumed to exist
     *
     * @return {bool} false :To suppress reloading of the page
     * */
    function addBook() {
        var libID = $("#addBookFormID").val();

        var title = $("#addBookFormTitle").val();
        var author = $("#addBookFormAuthor").val();
        var year = $("#addBookFormYear").val();
        var book = new Book(title, author, year);

        var library = LilLibrary.getLibrary(libID);
        if (library) {
            library.addBook(book);
        } else {
            window.console.log("invalid library: ID=" + libID);
        }
        LilLibrary.reloadMap();
        return false;
    }

    /**
     * Validates form input from removeBook. Upon success
     * the specified book is removed from the specified library
     * Note LilLibrary and Library are assumed to exist
     *
     * @return {bool} false :To suppress reloading of the page
     * */
    function removeBook() {
        var libID = $("#removeBookFormID").val();

        var title = $("#removeBookFormTitle").val();
        var author = $("#removeBookFormAuthor").val();
        var year = $("#removeBookFormYear").val();
        var book = new Book(title, author, year);

        var library = LilLibrary.getLibrary(libID);
        if (library) {
            library.removeBook(book);
        } else {
            window.console.log("invalid library: ID=" + libID);
        }
        LilLibrary.reloadMap();
        return false;
    }

    /**
     * Validates a latitude input. If the validation fails places error message in
     * #formName+"LatError"
     * @param formName A string that is the first x chars of the form id
     * @return {str} The value from the form element
     * */
    function checkLat(formName) {
        var lat = $(formName + "Lat").val();
        if (lat < 0 || lat > 180 || lat === "") {
            $(formName + "LatError").html("Latitude must be between 0 and 180");
            valid = false;
        } else {
            $(formName + "LatError").empty();
        }
        return lat;
    }

    /**
     * Validates a longitude input. If the validation fails places error message in
     * #formName+"LngError"
     * @param formName A string that is the first x chars of the form id
     * @return {str} The value from the form element
     * */
    function checkLng(formName) {
        var lng = $(formName + "Lng").val();
        if (lng < 0 || lng > 180 || lng === "") {
            $(formName + "LngError").html("Longitude must be between 0 and 180");
            valid = false;
        } else {
            $(formName + "LngError").empty();
        }
        return lng;
    }

    /**
     * Validates a capacity input. If the validation fails places error message in
     * #formName+"CapacityError"
     * @param formName A string that is the first x chars of the form id
     * @return {str} The value from the form element
     * */
    function checkCapacity(formName) {
        var cap = $(formName + "Capacity").val();
        if (cap < 0 || cap === "") {
            $(formName + "CapacityError").html("Capacity must be 0 or more");
            valid = false;
        } else {
            $(formName + "CapacityError").empty();
        }
        return cap;
    }

    /**
     * Validates a address input. If the validation fails places error message in
     * #formName+"AddressError"
     * @param formName A string that is the first x chars of the form id
     * @return {str} The value from the form element
     * */
    function checkAddress(formName) {
        var addr = $(formName + "Address").val();
        if (addr === "") {
            $(formName + "AddressError").html("Please enter the address");
            valid = false;
        } else {
            $(formName + "AddressError").empty();
        }
        return addr;
    }

    /**
     * Checks if the lat/lng are within 50km of Dunedin
     * If the validation fails places error message in
     * #formName+"DistanceError"
     * @param formName A string that is the first x chars of the form id

     * */
    function checkWithinDunedin(formName) {

        var p1 = L.latLng(-45.871153182, 170.502067992);//Dunedin
        var p2 = L.latLng(Math.abs($(formName + "Lat").val()) * $(formName + "NS").val(), Math.abs($(formName + "Lng").val()) * $(formName + "EW").val());
        if (p1.distanceTo(p2) / 1000 > 50) {
            $(formName + "DistanceError").html("Too far from Dunedin");
            valid = false;
        } else {
            $(formName + "DistanceError").empty();
        }
    }

    /**
     * Add the listeners at setup.
     * */
    pub.setup = function () {
        $("#addLibraryForm").submit(addIfValid);
        $("#addFormLat").blur(function () {
            checkLat("#addForm");
        });
        $("#addFormLng").blur(function () {
            checkLng("#addForm");
        });
        $("#addFormCapacity").blur(function () {
            checkCapacity("#addForm");
        });
        $("#addFormAddress").blur(function () {
            checkAddress("#addForm");
        });

        $("#editLibraryForm").submit(editIfValid);
        $("#editFormLat").blur(function () {
            checkLat("#editForm");
        });
        $("#editFormLng").blur(function () {
            checkLng("#editForm");
        });
        $("#editFormCapacity").blur(function () {
            checkCapacity("#editForm");
        });
        $("#editFormAddress").blur(function () {
            checkAddress("#editForm");
        });

        $("#addBookForm").submit(addBook);
        $("#removeBookForm").submit(removeBook);
    };

    return pub;
}());

$(window).on("load", function () {
    "use strict";
    NewLibraryValidator.setup();
});
