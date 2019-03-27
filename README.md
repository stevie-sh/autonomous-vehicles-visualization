## [Demo: https://funmapzzzwithcomma-735b8mx1a9.netlify.com] (https://funmapzzzwithcomma-735b8mx1a9.netlify.com)

folders are:
- map (main for visual map display, created with create-react-app)
- bash_tools (bash scripts i used to wrangle and explore data a little)
- server (half implemented api server i tested against for bonus fun)

## Synopsis
i wanted to make a dashboard that could be realistically useful for comma users, so i tried to incorporate some *live-like* features
so if data were to be streamed directly into a server we could read and see live graphs and track rides down.

## Some Features list
- fullscreen
- looks cute with the emojis on apple devices + chrome
- live distribution chart
- hover to see path
- click to see path expanded
- click to see path speed charted per second
- italian names per ride for better identification w downside that chrome tries to translate it.
- average speed using `distance / time`
- spinners while loading
- hover tooltips
- live dash
- throttle requests
- debounce resizing

## TODOS: Things I would've done with a couple more hours
- implement downsampling on the data (see `utils/downsample.js` file) for better time series chart performance.
- generators seem like a perfect tool for the `toggleThrottle` function i wanted to implement to allow users to alter speeds of data fetching, might've taken a bit of time though
- more robust throttling
- implement interpolation or future prediction on speed.
- complete the server-sent events streaming api or cursoring/pagination for use case of live data map dashboard.

### Other notes
- proptypes
- interpolate the cubehelix color *across* each path for better path differentiation.
- swap out chartjs for a d3-based solution to unify charting. its a shame this lib also is so tightly coupled to its styling.

## Bonus
- quarter implemented cursoring api in `/server` - good for case when not all data is here
- quarter implemented server-sent events api in `/server` - could be good for live data events
