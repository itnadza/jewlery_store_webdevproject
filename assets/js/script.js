// Initialize the SPApp
var app = $.spapp({
    defaultView: "#about_us",  // Set the default view to About Us page
    templateDir: "./views/"    // Directory where the HTML files are stored
});

// Define routes for each page

app.route({
    view: "about_us",  // This view corresponds to the id of the section
    load: "about_us.html",  // Path to the 'about_us.html' file
    onCreate: function() {
        console.log("About Us page created!");
    },
    onReady: function() {
        console.log("About Us page ready!");
    }
});

app.route({
    view: "our_collection",  // This view corresponds to the id of the section
    load: "our_collection.html",  // Path to the 'our_collection.html' file
    onCreate: function() {
        console.log("Our Collection page created!");
    },
    onReady: function() {
        console.log("Our Collection page ready!");
    }
});

app.route({
    view: "contact_us",  // This view corresponds to the id of the section
    load: "contact_us.html",  // Path to the 'contact_us.html' file
    onCreate: function() {
        console.log("Contact Us page created!");
    },
    onReady: function() {
        console.log("Contact Us page ready!");
    }
});

// Run the SPApp
app.run();


