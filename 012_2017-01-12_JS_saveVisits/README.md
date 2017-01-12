# #012 2017-01-12: saveVisits

Since browsers allow only very basic CSS on `:visited` I created this way to check a user has clicked a link. If he clicks on any link, that has the class `.trackVisit` the complete href is saved in an array in localStorage. On each page visit and click on a link the script adds the class `.visited` so we can style it however we want.

**Demo:** <https://codebrauer.github.io/100daysofcode/012_2017-01-12_JS_saveVisits/>
