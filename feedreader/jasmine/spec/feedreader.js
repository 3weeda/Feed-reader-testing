/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    // A test suite contains all about the RSS feeds
    // definitions the allFeeds variable in our application.
    describe('RSS Feeds', function() {

         // A test to make sure that the allFeeds
         // variable has been defined and not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         // A test looping through each feed in allFeeds
         // and ensures it has a URL defined and not empty
         it('have a URL that is not empty', function(){
             for (const feed of allFeeds){
               // Ensures URL is defined
               expect(feed.url).toBeDefined();
               // Ensures URL is not empty
               expect(feed.url.length).not.toBe(0);
             }
         });

         // A test looping through each feed in allFeeds
         // and ensures it has a name defined and not empty
         it('have a name that is defined and not empty', function(){
             for (const feed of allFeeds){
               // Ensures name is defined
               expect(feed.name).toBeDefined();
               // Ensures name is not empty
               expect(feed.name.length).not.toBe(0);
             }
         });
    });


    // A test suite contains all about the hidden menu
    describe('The menu', function(){

        // A test that ensures the menu element is
        // hidden by default
       it('is hidden by default', function(){
         // Ensures the body has the hiding function as a default
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });

        // A test that ensures the menu changes
        //  visibility when the menu icon is clicked
        it('toggles visibility when clicked', function(){
          menuIcon = $('.menu-icon-link');
          // Excute handlers attatched to menuIcon for the clicking event,
          // One click shows the hidden menu
          menuIcon.trigger('click');
          expect($('body').hasClass('menu-hidden')).toBe(false);
          // Excute handlers attatched to menuIcon for the clicking event,
          // Two clicks show it again
          menuIcon.trigger('click');
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    // A test suite contains all about loadFeed function initial work
    describe('Initial Entries', function(){

       // An asynchronous test that ensures when the loadFeed
       // function is called and completes its work, there is
       // at least a single .entry element within the .feed container.
       beforeEach(function(done){
         loadFeed(0, done);
       });
       it('are loaded', function(){
         // Ensures entry is loaded in the .feed parent
         expect($('.feed .entry').length).toBeGreaterThan(0);
       })
    });


    // A test suite contains all about updating loadFeed function
    describe('New Feed Selection', function(){
      
       // An asynchronous test that ensures when a new feed is loaded
       // by the loadFeed function that the content actually changes.
       //declare first feed for comparison
       let firstFeed;
       beforeEach(function(done){
         loadFeed(0, function(){
           firstFeed = $('.feed').html();
           //declare second feed for comparison
           loadFeed(1, done);
         });
       })
       it('causes content to change', function(){
         //compare change between previous and current feeds
         expect($('feed').html()).not.toBe(firstFeed);
       })
    });

}());
