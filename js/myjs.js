!(function($) {
    // regular js
    function formatDate(myDate) {
        var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var myDay = "<span class='rss-item-pubDate-date'>" + myDate.getUTCDate() + "</span> ";
        var myMonth = "<span class='rss-item-pubDate-month'>" + monthList[myDate.getUTCMonth()] + "</span> ";
        var myYear = "<span class='rss-item-pubDate-full-year'>" + myDate.getUTCFullYear() + "</span> ";
        return myDay + "<br>" + myMonth;
    }
    // jquery
    $(function() {
        $('link[href="http://images.jxt.net.au/COMMON/newdash/lib/bootstrap.min.css"]').remove();
        if ($('#site-topnav .user-loggedIn').length) {
            $('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
        }
        var currentPage = window.location.pathname.toLowerCase();
        // remove empty li's on the system pages.
        $("#side-left li:empty").remove();
        // remove empty left side bar
        if ($('#prefix_left-navigation').children().length == 0) {
            $('#prefix_left-navigation').remove();
        }
        if ($('#side-left').children().length == 0) {
            $('#side-left').remove();
        }
        /* Adding Bootstrap Classes */
        $('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');
        $('#dynamic-side-right-container, #job-side-column, #side-right').addClass('hidden-xs hidden-sm hidden-md hidden-lg');
        if (!$.trim($('#dynamic-side-left-container, #side-left').html()).length) {
            $('#dynamic-content, #content-container #content').addClass('col-xs-12');
        } else {
            $('#dynamic-side-left-container, #side-left').addClass('col-sm-3 hidden-xs');
            $('#dynamic-content, #content-container #content').addClass('col-sm-9 col-xs-12');
        }
        $('#job-dynamic-container #content').addClass('col-xs-12');
        // form elements style
        $('input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=reset]):not([type=file]):not([type=image]):not([type=date]), select, textarea').addClass('form-control');
        $('input[type=text]').addClass('form-control');
        $('input[type=submit]').addClass('btn btn-primary');
        $('.mini-new-buttons').addClass('btn btn-primary');
        $('input[type=reset]').addClass('btn btn-default');
        // Repsonsive image
        $('.dynamic-content-holder img').addClass('img-responsive');
        // Responsive table
        $('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');
        // Convert top menu to Boostrap Responsive menu
        $('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
        $('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
        $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        $('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
        $('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle', 'dropdown').addClass('dropdown-toggle');
        $('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');
        // add placeholder for search widget text field
        $('#keywords1').attr('placeholder', 'Keywords search');
        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        // add last-child class to navigation
        $("#prefix_navigation > ul > li:last").addClass("last-child");
        // add btn style
        $(".backtoresults a").addClass("btn btn-default");
        $(".apply-now-link a").addClass("btn btn-primary");
        $(".job-navbtns a").addClass("btn btn-default");
        //.left-hidden show
        if ((document.URL.indexOf("/advancedsearch.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/advancedsearch.aspx?") >= 0)) {
            $(".left-hidden").css("display", "none");
        }
        if ((document.URL.indexOf("/member/createjobalert.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/member/login.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/member/register.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        /*// Contact - Google map
        $("#footer").prepend($("#contact-map"));*/
        // generate select navigation from sidebar Dynamic menu
        $("#dynamic-content").convertNavigation({
            title: "Related Pages",
            links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
        });
        // generate actions button on Job Listing page
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });
        // generate filters button on Job Listing page
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });
        /* System Page Forms */
        if (currentPage == "/member/createjobalert.aspx") {
            setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$ucJobAlert1$ddlProfession\',\'\')', 0);
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function() {
                $('.alternate > li > select, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand').addClass('form-control');
                $('#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlRole, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlLocation, #ctl00_ContentPlaceHolder1_ucJobAlert1_lstBoxArea, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary').addClass('form-control');
            });
        }
        $(document).ajaxComplete(function() {
            $('#divRoleID1 > select, #divAreaDropDown1 > div > select').addClass('form-control');
            $('#divRoleID > select, #divAreaDropDown > div > select').addClass('form-control');
        });
        $('#salaryID').change(function() {
            $(document).ajaxComplete(function() {
                $('#divSalaryFrom > input').addClass('form-control');
                $('#divSalaryTo > input').addClass('form-control');
            });
        });

        function SalaryFromChange1() {
            $(document).ajaxComplete(function() {
                $('#divSalaryTo1 > input').addClass('form-control');
                $('#divSalaryFrom1 > input').addClass('form-control');
            });
        }
        if (currentPage == "/member/register.aspx") {
            $(".uniForm").addClass("border-container");
        }
        if (currentPage == "/member/createjobalert.aspx") {
            $(".uniForm").addClass("border-container");
        }
    });
    // Resize action
    /*$(window).on('resize', function() {

        var wi = $(this).width();

        // Mobile & Tablet
        if ( wi <= 992 ) {
            //$('#dynamic-side-left-container').before($('#dynamic-content'));
            //$('#side-left').before($('#content'));
            $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
        }
        //  Desktop
        else {
            //$('#dynamic-side-left-container').after($('#dynamic-content'));
            //$('#side-left').after($('#content'));
            $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        }

    });*/
    $(document).ready(function() {
        $(".consultant-basic-profile a[href=''], .team-member-social a[href='mailto:'], .team-member-social a[href='tel:']").hide();
        $("#ctl00_ContentPlaceHolder1_pnlSendEmailAlerts .label").hide();
        $("#search-classification .section-heading").hide();
        $("#search-locationarea .section-heading").hide();
        $("#search-salary .section-heading").hide();
        $('.dynamic-content-holder h1:first, #content-container #content h1:first').appendTo($('.inner-banner .tbl .tbl-cell .container'));
        if ($(".full-width,.consultant-detail").length > 0) {
            $("body").addClass('full-width-container');
        }
        // add iframe url for a map
        function loadMap(iframeObject) {
            // if the iframe has no src or a blank src, and it has a data-src attribute
            if (!(iframeObject.attr("src") && iframeObject.attr("src").length) && iframeObject.attr("data-src")) {
                iframeObject.attr("src", iframeObject.attr("data-src"));
            }
        }
        // scroll to a map
        function scrollToDiv(divID) {
            $("html, body").animate({
                scrollTop: $(divID).offset().top - ($("#Top-nav-sticky").height() || 0) - 20
            }, 300);
        }
        // if a location hash is on the url, add active to the div.
        if (location.hash && $(location.hash + ".r34_map").length) {
            $(location.hash + ".r34_map").addClass("active");
        } else {
            // otherwise, just make the first map active.
            $(".r34_map:first").addClass("active");
        }
        loadMap($(".r34_map.active iframe"));
        // contact page maps on click
        $(".r34_contact-map-link, .footer-location a, #r34_locations a").click(function(e) {
            var myLink = $(this).attr("href")
            var targetMap = $(myLink.substr(myLink.indexOf("#")));
            if (targetMap.length) {
                e.preventDefault();
                loadMap(targetMap.children("iframe"));
                scrollToDiv(targetMap);
                $(".r34_map").not(targetMap).removeClass("active");
                targetMap.addClass("active");
            }
        });
        /*// Resize action
        var $window = $(window);
            // Function to handle changes to style classes based on window width
            function checkWidth() {
            if ($window.width() < 992) {
                $('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
                }
        }
            // Execute on load
            checkWidth();
            // Bind event listener
            $(window).resize(checkWidth);*/
        // Home services - carousel
        $('.t-gallery').Gallerycarousel({
                autoRotate: 4000,
                visible: 4,
                speed: 1200,
                easing: 'easeOutExpo',
                itemMinWidth: 250,
                itemMargin: 30
            })
            /*//innerpage title
        $('.dynamic-content-holder h1:first').appendTo($('.inner-banner .container'));
$('#content-container #content h1:first').appendTo($('.inner-banner .container'));
        // Latest Jobs widget
        $("#myJobsList ul").includeFeed({
            baseSettings: { rssURL: "/job/rss.aspx?search=1&addlocation=1" },
            elements: { pubDate: formatDate, title: 1, description: 1 },
            complete: function() {
                if ($(this).children().length > 3) {
                    $(this).simplyScroll({ frameRate: 60 });
                }
            }
        });
*/
            // Latest Jobs widget
        $("#myJobsList ul").includeFeed({
            baseSettings: {
                rssURL: "/job/rss.aspx?search=1&addlocation=1"
            },
            templates: {
                itemTemplate: "<li class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span></li>",
                pubDateTemplate: "{{pubDate}}"
            },
            predicates: {
                // example predicate use
                pubDate: function(pubDate) {
                    var monthList = ["Jan", "Feb", "March", "April", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                    var dateObj = '';
                    var myDay, myMonth, myYear;
                    dateObj = pubDate.split('/');
                    mnth = monthList[parseInt(dateObj[1]) - 1];
                    myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ";
                    myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ";
                    myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2].substring(0, 4) + "</span> ";
                    return myDay + myMonth;
                }
            },
            complete: function() {
                $(this).owlCarousel({
                    loop: true,
                    autoplay: true,
                    responsive: {
                        0: {
                            items: 1,
                            margin: 0,
                        },
                        640: {
                            items: 2,
                            margin: 0,
                        },
                        768: {
                            items: 3,
                            margin: 20,
                        },
                        1024: {
                            items: 3,
                            margin: 20,
                        }
                    }
                });
                $("#myJobsList ul .rss-item-description").each(function(i) {
                    len = $(this).text().length;
                    if (len > 10) {
                        $(this).text($(this).text().substr(0, 100) + '...');
                    }
                });
            }
        });
        //inner-page job list
        $("#myinnerJobsList ul").each(function() {
            var dataURL = $(this).attr("data-url");
            $(this).includeFeed({
                baseSettings: {
                    rssURL: [dataURL || "/job/rss.aspx?search=1&addlocation=1"],
                    limit: 200
                },
                templates: {
                    itemTemplate: "<li class='rss-item' id='rss-item-{{item-index}}'><span class='rss-item-pubDate'>[[pubDateTemplate]]</span><span class='rss-item-title'><a target='_blank' href='{{link}}'>{{title}}</a></span><span class='rss-item-description'>{{description}}</span></li>",
                    pubDateTemplate: "{{pubDate}}"
                },
                predicates: {
                    // example predicate use
                    pubDate: function(pubDate) {
                        var monthList = ["Jan", "Feb", "March", "April", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
                        var dateObj = '';
                        var myDay, myMonth, myYear;
                        dateObj = pubDate.split('/');
                        mnth = monthList[parseInt(dateObj[1]) - 1];
                        myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ";
                        myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ";
                        myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2].substr(0, 4) + "</span> ";
                        return myDay + myMonth;
                    }
                },
                complete: function() {
                    $(this).owlCarousel({
                        loop: true,
                        autoplay: true,
                        responsive: {
                            0: {
                                items: 1,
                                margin: 0,
                            },
                            640: {
                                items: 1,
                                margin: 0,
                            },
                            768: {
                                items: 2,
                                margin: 20,
                            },
                            1024: {
                                items: 2,
                                margin: 20,
                            }
                        }
                    });
                    $("#myJobsList ul .rss-item-description").each(function(i) {
                        len = $(this).text().length;
                        if (len > 10) {
                            $(this).text($(this).text().substr(0, 100) + '...');
                        }
                    });
                }
            });
        });
        //consultant
        $("#teamList").includeFeed({
            baseSettings: {
                rssURL: ["/consultantsrss.aspx"],
                limit: 200,
                addNBSP: false,
                repeatTag: "consultant"
            },
            templates: {
                /*itemTemplate: '<div class="col-md-3 col-sm-6 col-xs-12"><div class="team-description"><figure><a href="/t/{{FriendlyURL}}" title="{{FirstName}} {{LastName}}"><img alt="{{FirstName}} {{LastName}}" src="{{ImageURL}}"></a><figcaption class="social-icons"><ul><li><a class="fa fa-linkedin" href="{{LinkedInURL}}" target="_blank" title="linkedin"></a></li><li><a class="fa fa-facebook" href="{{FacebookURL}}" target="_blank" title="facebook"></a></li><li><a class="fa fa-twitter" href="{{TwitterURL}}" target="_blank" title="twitter"></a></li></ul></figcaption></figure><h3><a href="/t/{{FriendlyURL}}">{{FirstName}} {{LastName}} </a></h3><span>{{PositionTitle}}</span><figcaption class="contact-icons"><ul><li><a href="mailto:{{Email}}" target="_blank" title="Mail Us"><i aria-hidden="true" class="fa fa-envelope"><!-- --></i></a></li><li><a class="fa fa-facebook" href="{{FacebookURL}}" target="_blank" title="facebook"></a></li><li><a class="fa fa-twitter" href="{{TwitterURL}}" target="_blank" title="twitter"></a></li><li><a class="fa fa-phone" href="tel:{{Mobile}}" target="_blank" title="call us"></a></li></ul></figcaption></div></div>'
            },*/
                itemTemplate: '<div class="col-md-3 col-sm-6 col-xs-12"><div class="team-description"><figure><img alt="{{FirstName}} {{LastName}}" src="{{ImageURL}}"><figcaption class="social-icons"><ul><li><a class="fa fa-linkedin" href="{{LinkedInURL}}" target="_blank" title="linkedin"></a></li><li><a class="fa fa-facebook" href="{{FacebookURL}}" target="_blank" title="facebook"></a></li><li><a class="fa fa-twitter" href="{{TwitterURL}}" target="_blank" title="twitter"></a></li></ul></figcaption></figure><h3>{{FirstName}} {{LastName}}</h3><span>{{PositionTitle}}</span><figcaption class="contact-icons"><ul><li><a href="mailto:{{Email}}" target="_blank" title="Mail Us"><i aria-hidden="true" class="fa fa-envelope"><!-- --></i></a></li><li><a class="fa fa-facebook" href="{{FacebookURL}}" target="_blank" title="facebook"></a></li><li><a class="fa fa-twitter" href="{{TwitterURL}}" target="_blank" title="twitter"></a></li><li><a class="fa fa-phone" href="tel:{{Mobile}}" target="_blank" title="call us"></a></li></ul></figcaption></div></div>'
            },
            //             <p>{{ShortDescription}}</p>
            complete: function() {
                // Callback
                $(".team-description a[href=''], .team-member-social a[href='mailto:'], .team-member-social a[href='tel:']").hide();
            }
        });
        // inner banners
        var pageTitle = window.location.pathname.replace("/", "");
        if (pageTitle != "") {
            if (pageTitle.indexOf('/') > -1) {
                pageTitle = pageTitle.replace(/\//g, "-");
            }
            $("body").addClass(pageTitle);
        }
        var currentPage = window.location.pathname.toLowerCase();
        if (currentPage == "/member/register.aspx") {
            $('body').addClass('register');
        }
        if (currentPage == "/member/login.aspx") {
            $('body').addClass('login');
        }
        if (currentPage == "/member/register.aspx") {
            $('body').addClass('register');
        }
        if (currentPage == "/news.aspx") {
            $('body').addClass('news');
        }
        if (currentPage == "/member/createjobalert.aspx") {
            $('body').addClass('createjobalert');
        }
        if (currentPage == "/advancedsearch.aspx") {
            $('body').addClass('advacedsearch');
        }
        if (currentPage == "/member/forgetpassword.aspx") {
            $('body').addClass('forgetpassword');
        }
        // Equal Height
        $.fn.eqHeights = function(options) {
            var defaults = {
                child: false
            };
            var options = $.extend(defaults, options);
            var el = $(this);
            if (el.length > 0 && !el.data('eqHeights')) {
                $(window).bind('resize.eqHeights', function() {
                    el.eqHeights();
                });
                el.data('eqHeights', true);
            }
            if (options.child && options.child.length > 0) {
                var elmtns = $(options.child, this);
            } else {
                var elmtns = $(this).children();
            }
            var prevTop = 0;
            var max_height = 0;
            var elements = [];
            elmtns.height('auto').each(function() {
                var thisTop = this.offsetTop;
                if (prevTop > 0 && prevTop != thisTop) {
                    $(elements).height(max_height);
                    max_height = $(this).height();
                    elements = [];
                }
                max_height = Math.max(max_height, $(this).height());
                prevTop = this.offsetTop;
                elements.push(this);
            });
            $(elements).height(max_height);
        };
        // Equal Height - Usage
        $('.service-holder').eqHeights();
        // if there is a hash, scroll down to it. Sticky header covers up top of content.
        if ($(window.location.hash).length) {
            $("html, body").animate({
                scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - 40
            }, 100);
        }
        // contact page stop scrolling until clicked.
        $(".r27_map-overlay").click(function() {
            $(this).hide();
        });
        //placeholder
        $("form input[type='text'], form input[type='email'], form input[type='password']").each(function(index, elem) {
            var eId = $(elem).attr("id");
            var label = null;
            if (eId && (label = $(elem).parents("form").find("label[for=" + eId + "]")).length == 1) {
                $(elem).attr("placeholder", $(label).text().replace(/  +/g, ''));
                $(label).remove();
            }
        });
        $('.form-all input[type=\'text\'], .form-all input[type=\'email\'], .form-all input[type=\'password\']').each(function(index, elem) {
            var eId = $(elem).attr('id');
            var span = $(elem).closest('.form-line').children('span')
            if (span.length) {
                $(elem).attr('placeholder', span.text().replace(/  +/g, ''));
                $(span).remove();
            }
        });
        $(".register form select").each(function(index, elem) {
            var eId = $(elem).attr("id");
            var label = $(elem).parents("form").find("label[for=" + eId + "]");
            if (eId && (label.length == 1)) {
                var txt = $(label).text().replace(/  +/g, '');
                $(elem).prepend('<option>' + txt + '</option>');
                $(elem).find("option:first").attr("selected", true)
                $(label).remove();
            }
        });
    });
})(jQuery);

function CustomFunction() {
    //console.log('this is triggered before ' + pageurl);
    var pageurl = window.location.pathname.toLowerCase();
    if (pageurl == "/member/createjobalert.aspx") {
        //basicProfile section
        $('#search-salary label[for="ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary"]').text('Salary Type');
    }
}
$(window).load(function() {
    if ($("body").hasClass("errorpage.aspx")) {
        $("#side-left").hide();
    }
});