let episodes = [

{
  title: "Podcast 1: Introduction",
  date: "Wed, 05 Dec 2007 21:44:01 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_1_Introduction.mp3",
    length: 7529053,
    duration: "12:56"
  },
  guid: "51ba2a8a-d0cc-4ead-8cb2-ba8e4fe0ecdd",
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
    duration: "45:15"
  },
  guid: "c9410e32-59c3-4292-9557-d6df2720647b",
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
    duration: "28:36"
  },
  guid: "161c6d75-a70b-4e0c-b1a9-c5c74ec9c588",
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
    duration: "44:25"
  },
  guid: "7d63b52b-0da4-4de4-b6bf-43cfe7ec025c",
  teaser: "Installing your first site on a WAMP server (windows, apache, mysql, php). Making your site publically accessible.",
  body: ""
},

{
  title: "Podcast 5: Tools",
  date: "Thu, 24 Jan 2008 21:49:34 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_5_Tools.mp3",
    length: 16540453,
    duration: "30:46"
  },
  guid: "b9494d40-7a44-4503-8d21-ad026fbff60b",
  teaser: "Web design & development tools & IDE's, Eclipse, Firefox plugins, Firebug, etc.",
  body: ""
},

{
  title: "Podcast 6: CMS & Frameworks",
  date: "Fri, 25 Jan 2008 00:04:17 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_6_Frameworks.mp3",
    length: 14990967,
    duration: "27:59"
  },
  guid: "bd5bb5f1-d54a-467a-b371-74fac60991dc",
  teaser: "CMS (content management systems), Web frameworks, Ruby on Rails, Drupal, etc.",
  body: "",
},

{
  title: "Podcast 7: Internet Marketing",
  date: "Fri, 25 Jan 2008 22:18:37 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_7_Internet_Marketing.mp3",
    length: 21738323,
    duration: "40:29"
  },
  guid: "e5fc6d42-a6be-4fd3-80a5-c9f35ee89785",
  teaser: "SEO (search engine optimization), Internet Marketing, Monetization, Accessibility.",
  body: ""
},

{
  title: "Podcast 8: Linux",
  date: "Wed, 27 Feb 2008 03:14:40 +0000",
  file: {
    url: "http://ocdevel.com/files/podcasts/web-development/Episode_8_Linux.mp3",
    length: 28231497,
    duration: "52:51"
  },
  guid: "6c6e80f9-a105-4adc-83ca-53e7ed46f402",
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