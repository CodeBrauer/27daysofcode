(function(){
  // helper function
  var forEach = function(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  };

  if (localStorage.getItem('visitedLinks') === null) {
    localStorage.setItem('visitedLinks', JSON.stringify([]));
  }

  // get already visited links
  function getVisitedLinks() {
    return JSON.parse(localStorage.getItem('visitedLinks'));
  }

  // save visits
  forEach(document.querySelectorAll('a.trackVisit'), function(index, element) {
    element.addEventListener('click', function saveVisit(e) {
      var visitedLinks = getVisitedLinks();
      e.preventDefault(); // <- debug
      if (visitedLinks.indexOf(element.getAttribute('href')) === -1) {
        visitedLinks.push(element.getAttribute('href'));
      }
      localStorage.setItem('visitedLinks', JSON.stringify(visitedLinks));
      refreshVisits(visitedLinks);
    });
  });

  // style the links
  function refreshVisits(visitedLinks) {

    forEach(document.querySelectorAll('a'), function(index, link) {
      link.classList.remove('visited');
    });

    visitedLinks.forEach(function(el, key) {
      if (document.querySelector('a[href="' + el + '"]') !== null) {
        document.querySelector('a[href="' + el + '"]').classList.add('visited');
      }
    });

  }

  // run it!
  refreshVisits(getVisitedLinks());

  // reset visits button
  document.querySelector('button').addEventListener('click', function() {
    localStorage.setItem('visitedLinks', JSON.stringify([]));
    refreshVisits(getVisitedLinks());
  });
})();