**not using react memo**

Commit Duration: 1.1s <br>
Render Duration: 9.7ms<br>
Interactions: using sort low <br>
Flame Graph: 
![Flame Graph](./rs-react-app//src/assets/to/flame.png)
Ranked Char: 
![Ranked Char](./rs-react-app//src/assets/to/ranked.png)

**using react memo**

Commit Duration: 0.7s (after optimization it takes less time) <br>
Render Duration: 1.7ms ( after optimization, it takes much less time to render a page  )<br>
Interactions: using sort low <br>
Flame Graph: 
![Flame Graph](./rs-react-app//src/assets/after_flame.png)
Ranked Char: 
![Ranked Char](./rs-react-app//src/assets/after_ranked.png)