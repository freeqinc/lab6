/**
 *     (function () {
 *         'use strict';
 *
 *          // rest of code
 *     }());
 *
 *  This is immediate function invocation. Because javascript is function scoped, this is good practice to guard
 *  'use strict'; from breaching into any other files that a framework might link together.
 *
 */

(function() {

    // Call this function when the page loads (the "ready" event)
    $(document).ready(function() {
        initializePage();
    });

    /*
     * Function that is called when the document is ready.
     */
    function initializePage() {
        $('.project a').click(addProjectDetails);
        $('#colorBtn').click(randomizeColors);
    }

    /*
     * Make an AJAX call to retrieve project details and add it in
     */
    function addProjectDetails(e) {
        // Prevent following the link
        e.preventDefault();

        // Get the div ID, e.g., "project3"
        var projectID = $(this).closest('.project').attr('id');
        // get rid of 'project' from the front of the id 'project3'
        var idNumber = projectID.substr('project'.length);

        var proj = $(this).closest('.project');
        $.get('http://localhost:3000/project/' + idNumber, function (res) {

            console.log('Now I have ' + res.details + ' and the actual ' + proj );

            proj.find('img').attr('src', res.image);
            proj.find('p').html(res.title);
            proj.find('a').append('<small>' + res.date + '</small');
            proj.find('.details').html(res.summary);

            console.log(projectHTML);
        });

        console.log("User clicked on project " + idNumber);
    }


    /*
     * Make an AJAX call to retrieve a color palette for the site
     * and apply it
     */
    function randomizeColors(e) {
        console.log("User clicked on color button");
        $.get('http://foobar.com', function (res) {
            console.log(res);
        }, 'jsonp');
        $.get('/palette', function (res) {
            console.log(res.colors);
            var colors = res[0].colors.hex;
            $('body').css('background-color', colors[0]);
            $('.thumbnail').css('background-color', colors[1]);
            $('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
            $('p').css('color', colors[3]);
            $('.project img').css('opacity', 0.75);
        });
    }

}());
