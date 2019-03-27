## [Demo: https://funmapzzzwithcomma-735b8mx1a9.netlify.com] (https://funmapzzzwithcomma-735b8mx1a9.netlify.com)

folders are:
- map (main for visual map display, created with create-react-app)
- bash_tools (bash scripts i used to wrangle and explore data a little)
- server (half implemented api server for bonus fun)

## Some Features list
- fullscreen
- looks cute with the emojis on apple devices + chrome
- live distribution chart
- hover to see path
- click to see path expanded
- click to see path speed charted per second
- italian names per ride for better identification
- average speed using `distance / time`
- spinners while loading
- hover tooltips
- live dash
- throttle requests
- debounce resizing

## TODOS: Things I would've done with a couple more hours
- generators seemed like a perfect tool for the `toggleThrottle` function i wanted to implement to allow users to alter speeds of data fetching.
- implement downsampling on the data (see utils folder) for better chart performance.
- more robust throttling
- implement interpolation or future prediction on speed.
- complete the server-sent events streaming api or cursoring/pagination for use case of live data map dashboard.
- probably swap out chartjs for a d3-based solution to unify charting.
- proptypes
- interpolate the cubehelix color across each path for better path differentiation.

## Bonus
- quarter implemented cursoring api in `/server` - good for case when not all data is here
- quarter implemented server-sent events api in `/server` - could be good for live data events
