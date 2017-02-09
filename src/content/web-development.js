let episodes = [

{
  title: "Podcast 1: Introduction",
  date: "Wed, 05 Dec 2007 21:44:01 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_1_Introduction.mp3",
    length: 7529053,
    type: "audio/mpeg",
    duration: "12:56"
  },
  teaser: "Web Development Tutorials, Web Design Tutorials, Content Management Systems, and more.",
  body: `- Client: Web design ( HTML, CSS, Images ), Interactivity / Browser Objects ( Flash, Flex, Laszlo, Silverlight, Java Applets / Webstart), Client-side scripting ( JavaScript, AJAX)
- Server: Server-side scripting( PHP, ASP, ASP.NET, J2EE, CGI, Python, Perl, Ruby), Database, Systems Administration
- Internet marketing: SEO, Accessibility, Marketing, Monitization
- Extras: WYSIWYG tools, Web Frameworks ( Django, Rails ), Blogging & CMS ( WordPress, Joomla!, Drupal)`
},

{
  title: "Podcast 2: Server",
  date: "Fri, 07 Dec 2007 22:13:27 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_2_Server.mp3",
    length: 24019634,
    type: "audio/mpeg",
    duration: "45:15"
  },
  teaser: "Server-side development: LAMP stack (linux, apache, mysql, php), scripting languages, etc.",
  body: `Systems (sys admin)
  - Linux, Windows Server 2003, BSD
  
Server Software (services)
  - web servers
  - database servers
  - mail servers
  - revision
  - control servers
  - *ports
  
Web Server Configuration
  - apache, IIS
  
Database (dba)
  - MySql, SQL Server, Oracle, Postgres
  
Server-side Scripting
  - Script runs on web server, generates dynamic web page
  - (vs client-side, which generates dynamic content in the browser)
  - CGI
  
Web server extension modules
  - CGI Languages: *Perl, Python, Ruby
  - Web server extension modules: *PHP, ASP, ASP.NET
  - Java servlets`
},

{
  title: "Podcast 3: Client",
  date: "Thu, 20 Dec 2007 04:15:06 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_3_Client.mp3",
    length: 16850861,
    type: "audio/mpeg",
    duration: "28:36"
  },
  teaser: "Client-side development, HTML, JavaScript, CSS, Flash, AJAX, and more.",
  body: `Client Side Technology includes
  - DHTML
  - Flash, Silverlight, Applets
  - RIA
  
Flash, Silverlight, Applets

Define DHTML

Code execution: Browser vs. Server

DHTML
  - css
  - javascript and VBScript
  - embedded vs external
  - toolkits: Dojo, Moshikit, Scriptaculous, YUI, Prototype, JQuery, GWT...
  
client-side vs server-side
  - speed: client way faster
  - Security: can view source (vs server-side scripting), ctrl+u
  - Compatibility: server-side produces same output no matter what, client-side has compatibility issues
  
RIA (Flex, OpenLaszlo)

AJAX!!!`
},

{
  title: "Podcast 4: Your First Site",
  date: "Thu, 24 Jan 2008 00:25:31 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_4_Server.mp3",
    length: 23215676,
    type: "audio/mpeg",
    duration: "44:25"
  },
  teaser: "Installing your first site on a WAMP server (windows, apache, mysql, php). Making your site publically accessible.",
  body: ""
},

{
  title: "Podcast 5: Tools",
  date: "Thu, 24 Jan 2008 21:49:34 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_5_Tools.mp3",
    length: 16540453,
    type: "audio/mpeg",
    duration: "30:46"
  },
  teaser: "Web design & development tools & IDE's, Eclipse, Firefox plugins, Firebug, etc.",
  body: ""
},

{
  title: "Podcast 6: CMS & Frameworks",
  date: "Fri, 25 Jan 2008 00:04:17 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_6_Frameworks.mp3",
    length: 14990967,
    type: "audio/mpeg",
    duration: "27:59"
  },
  teaser: "CMS (content management systems), Web frameworks, Ruby on Rails, Drupal, etc.",
  body: "",
},

{
  title: "Podcast 7: Internet Marketing",
  date: "Fri, 25 Jan 2008 22:18:37 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_7_Internet_Marketing.mp3",
    length: 21738323,
    type: "audio/mpeg",
    duration: "40:29"
  },
  teaser: "SEO (search engine optimization), Internet Marketing, Monetization, Accessibility.",
  body: ""
},

{
  title: "Podcast 8: Linux",
  date: "Wed, 27 Feb 2008 03:14:40 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_8_Linux.mp3",
    length: 28231497,
    type: "audio/mpeg",
    duration: "52:51"
  },
  teaser: "Linux, BSD, Solaris, Windows Server 2008, Server Operating Systems",
  body: ""
}

];

const podcast = {
  title: "OCDevel Web Development Podcast",
  link: "http://ocdevel.com/podcasts/web-development",
  feed: "http://ocdevel.com/podcast/feed",
  keywords: "web,development,design,content,management",
  image: "http://ocdevel.com/files/podcasts/web-development/art.png",
  date: "Wed, 05 Dec 2007 21:44:01 +0000",
  teaser: "Web development basics",
  body: "How To: Web Development, Web Design, Content Management Systems, and more.",
  episodes: episodes
};

module.exports = podcast;