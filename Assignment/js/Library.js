/**
 * Created by nick on 14/07/17.
 */
/**
 * An object to represent a Library
 *
 * @param lat The latitude of the library
 * @param lng The longitude of the library
 * @param add The address of the library
 * @param cap The capacity of the library
 * @param ID The Id of the library
 * */
function Library(lat, lng, add, cap, ID){
    "use strict";
    this.lat = lat;
    this.lng = lng;
    this.address = add;
    this.capacity = cap;
    this.id = ID;
    this.books = []; //The books in this library

    /**
     * A function to add a book to the library
     *
     * @param book The Book object to be added
     * @return {bool} If the book was added
     * */
    this.addBook = function(book){
        if(this.bookCount() < this.capacity) {
            this.books.push(book);
            return true;
        } else{
            return false;
        }
    };
    /**
     * A function to remove a book from the library
     *
     * @param book The Book object to be removed
     * */
    this.removeBook = function(book){
	this.books = this.books.filter( function(obj) {
	    return obj.title !== book.title ||
		obj.author !== book.author ||
		obj.year !== book.year;
	});	
    };

    /**
     * A simple string representation of this library
     *
     * @return {str} The library details as a string
     * */
    this.toString = function(){
        return "Lat: " + this.lat + " Lng: " + this.lng + " Address: " + this.address + " Capacity: " + this.capacity + " Capacity: " + this.id;
    };

    /**
     * Get the latitude of this library
     *
     * @return {float} The latitude of this library
     * */
    this.getLat = function(){
        return this.lat;
    };

    /**
     * Get the longitude of this library
     *
     * @return {float} IThe longitude of this library
     * */
    this.getLng = function(){
        return this.lng;
    };

    /**
     * Get the address of this library
     *
     * @return {float} The address of this library
     * */
    this.getAddress = function(){
        return this.address;
    };

    /**
     * Get the Id of this library
     *
     * @return {float} The Id of this library
     * */
    this.getId = function(){
        return this.id;
    };

    /**
     * Get the number of books in this library
     *
     * @return {float} The number of books in this library
     * */
    this.numBooksInLibrary = function(){
        return this.books.length;
    };

    /**
     * Get the basic information (not including book list) as an HTML table row
     *
     * @return {str} The HTML markup
     * */
    this.getBasicInfoAsHTMLTableRow = function(){
      //  return "<tr id='listoflibraryrow'><td>" + this.id + "</td><td>" + this.address + "</td><td>" + this.capacity + "</td><td>" + this.bookCount() + "</td></tr>";
		return "<tr id='listoflibraryrow'><td>" + this.address + "</td><td>" + this.bookCount() + "</td><td>" + this.capacity + "</td></tr>";
    };

    /**
     * Get the basic information (not including book list) as an HTML table row (includes <br/> at end of row
     *
     * @return {str} The HTML markup
     * */
    this.getBasicInfoAsHTMLTableRowWithBreak = function(){
       // return "<tr><td>" + this.id + "</td><td>" + this.address + "</td><td>" + this.capacity + "</td><td>" + this.bookCount() + "</td></tr><br/>";
	   return "<tr><td>" + this.address + "</td><td>" + this.bookCount() + "</td><td>" + this.capacity + "</td></tr><br/>";
    };  

    /**
     * Get the table header information for table view (see getBasicInfoAsHTMLTableRow)
     *
     * @return {str} The HTML markup
     * */
    this.getBasicInfoHTMLHeaderRow = function(){
        return "<tr><th scope='col'>Id</th><th scope='col'>Address</th><th scope='col'>Capacity</th><th scope='col'>Current </th></tr>";
    };

    /**
     * The number of books in this library
     *
     * @return {int} The number of books in the library
     * */
    this.bookCount = function(){
        return this.books.length;
    };

    /**
     * Get HTML to represent the books in this library as a definition list
     *
     * @return {str} The HTML markup
     * */
    this.getBooksAsList = function(){
        var s = "<dl class='bookList'>";
        for (var i = 0; i < this.books.length; i++) {
            s += this.books[i].getBookAsListItem();
        }
        return s + "</dl>";
    };
}


/**
 * An object to represent a book
 *
 * @param title The title of the book.
 * @param author The author of the book.
 * @param year The year of the book.
 */
function Book(title, author, year){
    "use strict";
    this.title = title;
    this.author = author;
    this.year = year;

    /**
     * A function that returns the book marked up as an HTML definition list item
     *
     * @return {string} An HTML <dt> element of this book
     * */
    this.getBookAsListItem = function(){
        return "<dt>" + this.title + "</dt><dd>Author: " + this.author + "</dd><dd>Year: " + this.year + "</dd>";
    };
}

