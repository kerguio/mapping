# Blue Plaque Storied Walks

This app maps Blue Plaque Storied walks

The app works by pulling data into a Google spreadsheet [like this one](https://docs.google.com/spreadsheets/d/17ybrQmm-BzOvNhlRCTnYyKoiR4XbDYmDLHRyjLi0mRs/edit), which includes a custom function to automatically geocode the coordinates of each location. 
This data is then loaded into the map (as a [CSV file](https://docs.google.com/spreadsheets/d/e/2PACX-1vTbHWPMZ4HIYQZMNIKgi2IILuE7UQeC2nj7yDaQah72dOx4BP0DtV_lVLAAZgwDDDp-EU5IUXe4nqCA/pub?gid=0&single=true&output=csv)). The base map and locations are rendered using [Leaflet](https://leafletjs.com/). The base map is provided by [OpenStreetMap](https://openstreetmap.org).
