import React from 'react';
import moment from 'moment';
import _ from 'lodash';

export default [

{
  title: "Podcast 1: Introduction",
  date: "12/05/2007",
  file: "http://ocdevel.com/podcast/Episode_1_Introduction.mp3",
  teaser: "Web Development Tutorials, Web Design Tutorials, Content Management Systems, and more.",
  body: <div>
<p>Client: Web design ( HTML, CSS, Images ), Interactivity / Browser Objects ( Flash, Flex, Laszlo, Silverlight, Java Applets / Webstart), Client-side scripting ( JavaScript, AJAX)</p>
<p>Server: Server-side scripting( PHP, ASP, ASP.NET, J2EE, CGI, Python, Perl, Ruby), Database, Systems Administration</p>
<p>Internet marketing: SEO, Accessibility, Marketing, Monitization</p>
<p>Extras: WYSIWYG tools, Web Frameworks ( Django, Rails ), Blogging & CMS ( WordPress, Joomla!, Drupal)</p>
</div>
},

{
  title: "Podcast 2: Server",
  date: "12/07/2007",
  file: "http://ocdevel.com/podcast/Episode_2_Server.mp3",
  teaser: "Server-side development: LAMP stack (linux, apache, mysql, php), scripting languages, etc.",
  body: <div>
<p>Systems (sys admin)</p>
<ul>
  <li>Linux, Windows Server 2003, BSD</li>
</ul>
<p>Server Software (services)</p>
<ul>
  <li>web servers</li>
  <li>database servers</li>
  <li>mail servers</li>
  <li>revision</li>
  <li>control servers</li>
  <li>*ports</li>
</ul>
<p>Web Server Configuration</p>
<ul>
  <li>apache, IIS</li>
</ul>
<p>Database (dba)</p>
<ul>
  <li>MySql, SQL Server, Oracle, Postgres</li>
</ul>
<p>Server-side Scripting</p>
<ul>
  <li>Script runs on web server, generates dynamic web page</li>
  <li>(vs client-side, which generates dynamic content in the browser)</li>
  <li>CGI</li>
</ul>
<p>Web server extension modules</p>
<ul>
  <li>CGI Languages: *Perl, Python, Ruby</li>
  <li>Web server extension modules: *PHP, ASP, ASP.NET</li>
  <li>Java servlets</li>
</ul>
</div>
},

{
  title: "Podcast 3: Client",
  date: "12/19/2007",
  file: "http://ocdevel.com/podcast/Episode_3_Client.mp3",
  teaser: "Client-side development, HTML, JavaScript, CSS, Flash, AJAX, and more.",
  body: <div>
<p>Client Side Technology includes</p>
<ul>
  <li>DHTML</li>
  <li>Flash, Silverlight, Applets</li>
  <li>RIA</li>
</ul>
<p>Flash, Silverlight, Applets<br/>
Define DHTML<br/>
Code execution: Browser vs. Server</p>
<p>DHTML</p>
<ul>
  <li>css</li>
  <li>javascript and VBScript</li>
  <li>embedded vs external</li>
  <li>toolkits: Dojo, Moshikit, Scriptaculous, YUI, Prototype, JQuery, GWT...</li>
</ul>
<p>client-side vs server-side</p>
<ul>
  <li>speed: client way faster</li>
  <li>Security: can view source (vs server-side scripting), ctrl+u</li>
  <li>Compatibility: server-side produces same output no matter what, client-side has compatibility issues</li>
</ul>
<p>RIA (Flex, OpenLaszlo)<br/>
AJAX!!!</p>
</div>
},

{
  title: "Podcast 4: Your First Site",
  date: "01/12/2008",
  file: "http://ocdevel.com/podcast/Episode_4_Server.mp3",
  teaser: "Installing your first site on a WAMP server (windows, apache, mysql, php). Making your site publically accessible.",
  body: ""
},

{
  title: "Podcast 5: Tools",
  date: "01/24/2008",
  file: "http://ocdevel.com/podcast/Episode_5_Tools.mp3",
  teaser: "Web design & development tools & IDE's, Eclipse, Firefox plugins, Firebug, etc.",
  body: ""
},

{
  title: "Podcast 6: CMS & Frameworks",
  date: "01/24/2008",
  file: "http://ocdevel.com/podcast/Episode_6_Frameworks.mp3",
  teaser: "CMS (content management systems), Web frameworks, Ruby on Rails, Drupal, etc.",
  body: "",
},

{
  title: "Podcast 7: Internet Marketing",
  date: "01/25/2008",
  file: "http://ocdevel.com/podcast/Episode_7_Internet_Marketing.mp3",
  teaser: "SEO (search engine optimization), Internet Marketing, Monetization, Accessibility.",
  body: ""
},

{
  title: "Podcast 8: Linux",
  date: "02/26/2008",
  file: "http://ocdevel.com/podcast/Episode_8_Linux.mp3",
  teaser: "Linux, BSD, Solaris, Windows Server 2008, Server Operating Systems",
  body: ""
}

].map(e =>
  _.assign(e, {date: moment(e.date).format('MMM, MM/DD/YYYY')})
);