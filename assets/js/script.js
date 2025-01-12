
var app = $.spapp({
    defaultView: "#about_us",  
    templateDir: "./views/"    
});



app.route({
    view: "about_us",  
    load: "about_us.html",  
    onCreate: function() {
        console.log("About Us page created!");
    },
    onReady: function() {
        console.log("About Us page ready!");
    }
});

app.route({
    view: "our_collection",  
    load: "our_collection.html",  
    onCreate: function() {
        console.log("Our Collection page created!");
    },
    onReady: function() {
        console.log("Our Collection page ready!");
    }
});

app.route({
    view: "contact_us",  
    load: "contact_us.html",  
    onCreate: function() {
        console.log("Contact Us page created!");
    },
    onReady: function() {
        console.log("Contact Us page ready!");
    }
});

app.run();


